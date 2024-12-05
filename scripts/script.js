(function () {
    // Получаем элементы
    const asideToggle = document.getElementById('asideToggle');
    const aside = document.getElementById('aside');
    const asideClose = document.getElementById('asideClose');
    const footerAddress = document.querySelector('.footer__address');

    // Функция для открытия aside
    function openAside() {
        aside.classList.add('active');
        asideToggle.innerHTML = '&times;'; // Меняем символ на крестик
        asideToggle.setAttribute('aria-expanded', 'true');
    }

    // Функция для закрытия aside
    function closeAside() {
        aside.classList.remove('active');
        asideToggle.innerHTML = '&lt;'; // Возвращаем символ стрелки
        asideToggle.setAttribute('aria-expanded', 'false');
    }

    // Обработчики событий для aside
    if (asideToggle && aside) {
        asideToggle.addEventListener('click', function (event) {
            event.stopPropagation(); // Предотвращаем распространение события
            if (aside.classList.contains('active')) {
                closeAside();
            } else {
                openAside();
            }
        });
    }

    if (asideClose && aside) {
        asideClose.addEventListener('click', function (event) {
            event.stopPropagation();
            closeAside();
        });
    }

    // Закрытие aside при клике вне его области
    document.addEventListener('click', function (event) {
        if (aside && !aside.contains(event.target) && !asideToggle.contains(event.target)) {
            closeAside();
        }
    });

    // Подписка на событие загрузки страницы для вывода статистики
    window.addEventListener('load', function () {
        // Получаем данные о производительности
        const [time] = performance.getEntriesByType('navigation');

        // Вычисляем время загрузки страницы
        const pageloadtime = time.loadEventStart - time.startTime;

        // Отображаем результат в футере (или в консоли)
        if (footerAddress) {
            const loadInfo = document.createElement('p');
            loadInfo.textContent = `Время загрузки страницы: ${pageloadtime.toFixed(2)} мс`;
            footerAddress.appendChild(loadInfo);
        } else {
            console.log(`Время загрузки страницы: ${pageloadtime.toFixed(2)} мс`);
        }
    });

    // Установка активного класса для текущего пункта меню
    const navLinks = document.querySelectorAll('.nav__link');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        // Если href совпадает с текущей страницей
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
        // Для главной страницы, если href указывает на index.html или просто на '/'
        if ((link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '') && (currentPage === 'index.html' || currentPage === '')) {
            link.classList.add('active');
        }
    });
})();