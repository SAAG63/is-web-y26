// Получаем элементы
const asideToggle = document.getElementById('asideToggle');
const aside = document.getElementById('aside');
const asideClose = document.getElementById('asideClose');

// Функция для открытия aside
function openAside() {
    aside.classList.add('active');
}

// Функция для закрытия aside
function closeAside() {
    aside.classList.remove('active');
}

// Обработчики событий
asideToggle.addEventListener('click', openAside);
asideClose.addEventListener('click', closeAside);

// Закрытие aside при клике вне его области (опционально)
document.addEventListener('click', function(event) {
    if (!aside.contains(event.target) && !asideToggle.contains(event.target)) {
        aside.classList.remove('active');
    }
});
