(function () {
    const asideToggle = document.getElementById('asideToggle');
    const aside = document.getElementById('aside');
    const asideClose = document.getElementById('asideClose');
    const footerAddress = document.querySelector('.footer__address');

    function openAside() {
        aside.classList.add('active');
        asideToggle.innerHTML = '&times;';
        asideToggle.setAttribute('aria-expanded', 'true');
    }

    function closeAside() {
        aside.classList.remove('active');
        asideToggle.innerHTML = '&lt;';
        asideToggle.setAttribute('aria-expanded', 'false');
    }

    if (asideToggle && aside) {
        asideToggle.addEventListener('click', function (event) {
            event.stopPropagation();
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

    document.addEventListener('click', function (event) {
        if (aside && !aside.contains(event.target) && !asideToggle.contains(event.target)) {
            closeAside();
        }
    });

    window.addEventListener('load', function () {
        const [time] = performance.getEntriesByType('navigation');

        const pageloadtime = time.loadEventStart - time.startTime;

        if (footerAddress) {
            const loadInfo = document.createElement('p');
            loadInfo.textContent = `Время загрузки страницы: ${pageloadtime.toFixed(2)} мс`;
            footerAddress.appendChild(loadInfo);
        } else {
            console.log(`Время загрузки страницы: ${pageloadtime.toFixed(2)} мс`);
        }
    });

    const navLinks = document.querySelectorAll('.nav__link');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
        if ((link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '') && (currentPage === 'index.html' || currentPage === '')) {
            link.classList.add('active');
        }
    });

    // Подключение Swiper
    document.addEventListener('DOMContentLoaded', () => {
        const swiperContainer = document.querySelector('.swiper-container');
        if (swiperContainer) {
            const gallerySwiper = new Swiper('.swiper-container', {
                // Количество видимых и расстояние между слайдами
                slidesPerView: 1,
                spaceBetween: 10,

                // Авто проигрывание, задержка, прерывание при взаимодейтсвии
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },

                // Пагинация
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                // Временно выключенные из-за нарушения эстетики стрелочки
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // Адаптивное изменение количества видимых слайдов
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                },

                // Эффект перехода, еще есть fade и flip, но лучше этот
                effect: 'slide',
            });
        }
    });
})();