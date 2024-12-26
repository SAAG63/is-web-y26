(function () {
    const bookingForm = document.getElementById('bookingForm');
    const bookingContainer = document.getElementById('bookingContainer');

    function createBookingElement(booking) {
        const bookingDiv = document.createElement('div');
        bookingDiv.classList.add('booking');

        function createParagraph(labelText, valueText) {
            const p = document.createElement('p');

            const strong = document.createElement('strong');
            strong.textContent = labelText + ': ';
            p.appendChild(strong);

            const text = document.createTextNode(valueText);
            p.appendChild(text);

            return p;
        }

        bookingDiv.appendChild(createParagraph('Имя', booking.name));
        bookingDiv.appendChild(createParagraph('Email', booking.email));
        bookingDiv.appendChild(createParagraph('Телефон', booking.phone));
        bookingDiv.appendChild(createParagraph('Дата', booking.date));
        bookingDiv.appendChild(createParagraph('Время', booking.time));
        bookingDiv.appendChild(createParagraph('Количество человек', booking.people));

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
            noBookings.textContent = 'Нет бронирований';
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
            alert('Заполни все поля.');
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

        alert('Бронирование успешно оформлено!');
    });

    // При загрузке страницы отображаем все бронирования
    document.addEventListener('DOMContentLoaded', displayBookings);
})();
