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
})();