document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const commentsContainer = document.getElementById('commentsContainer');

    function showPreloader() {
        preloader.style.display = 'block';
    }

    function hidePreloader() {
        preloader.style.display = 'none';
    }

    async function fetchComments() {
        showPreloader();

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');

            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }

            const comments = await response.json();

            const filteredComments = Math.random() > 0.5
                ? comments.filter(comment => comment.id >= 100)
                : comments.filter(comment => comment.id <= 200);

            renderComments(filteredComments);
        } catch (error) {
            const errorElement = document.createElement('p');
            errorElement.style.color = 'red';
            errorElement.textContent = `Что-то пошло не так: ${error.message}`;
            commentsContainer.appendChild(errorElement);
        } finally {
            hidePreloader();
        }
    }

    function renderComments(comments) {
        commentsContainer.innerHTML = '';

        if (comments.length === 0) {
            const commentElement = document.createElement('p');
            commentElement.textContent = `Нет отзывов :(`;
            commentsContainer.appendChild(commentElement);
            return;
        }

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <p><strong>${comment.name}</strong> (${comment.email})</p>
                <p>${comment.body}</p>
            `;
            commentsContainer.appendChild(commentDiv);
        });
    }

    fetchComments();
});
