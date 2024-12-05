
(function () {
    const bookingForm = document.getElementById('bookingForm');
    const bookingContainer = document.getElementById('bookingContainer');

    function createBookingElement(booking) {
        const bookingDiv = document.createElement('div');
        bookingDiv.classList.add('booking');

        const name = document.createElement('p');
        name.innerHTML = `<strong>Имя:</strong> ${booking.name}`;
        bookingDiv.appendChild(name);

        const email = document.createElement('p');
        email.innerHTML = `<strong>Email:</strong> ${booking.email}`;
        bookingDiv.appendChild(email);

        const phone = document.createElement('p');
        phone.innerHTML = `<strong>Телефон:</strong> ${booking.phone}`;
        bookingDiv.appendChild(phone);

        const date = document.createElement('p');
        date.innerHTML = `<strong>Дата:</strong> ${booking.date}`;
        bookingDiv.appendChild(date);

        const time = document.createElement('p');
        time.innerHTML = `<strong>Время:</strong> ${booking.time}`;
        bookingDiv.appendChild(time);

        const people = document.createElement('p');
        people.innerHTML = `<strong>Количество человек:</strong> ${booking.people}`;
        bookingDiv.appendChild(people);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            deleteBooking(booking.id);
        });
        bookingDiv.appendChild(deleteBtn);

        return bookingDiv;
    }

    function saveBooking(booking) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    function deleteBooking(id) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings = bookings.filter(booking => booking.id !== id);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        displayBookings();
    }

    function loadBookings() {
        return JSON.parse(localStorage.getItem('bookings')) || [];
    }

    function displayBookings() {
        const bookings = loadBookings();
        bookingContainer.innerHTML = '';

        if (bookings.length === 0) {
            const noBookings = document.createElement('p');
            noBookings.textContent = 'Нет бронирований.';
            bookingContainer.appendChild(noBookings);
            return;
        }

        bookings.forEach(booking => {
            const bookingElement = createBookingElement(booking);
            bookingContainer.appendChild(bookingElement);
        });
    }


    bookingForm.addEventListener('submit', function (event) {
        // Предотвращаем перезагрузку страницы
        event.preventDefault();


        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const people = document.getElementById('people').value;


        if (!name || !email || !phone || !date || !time || !people) {
            alert('Заполните все поля.');
            return;
        }


        const booking = {
            id: Date.now(),
            name,
            email,
            phone,
            date,
            time,
            people
        };


        saveBooking(booking);


        const bookingElement = createBookingElement(booking);
        bookingContainer.appendChild(bookingElement);


        bookingForm.reset();

        alert('Ваше бронирование успешно оформлено!');
    });

    // При загрузке страницы отображаем все бронирования
    document.addEventListener('DOMContentLoaded', displayBookings);
})();