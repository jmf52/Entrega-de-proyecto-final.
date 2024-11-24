const historyContainer = document.getElementById('historyContainer');
const backButton = document.getElementById('backButton');

const loadHistory = () => {
    const history = JSON.parse(localStorage.getItem('imageHistory')) || [];
    if (history.length === 0) {
        const message = document.createElement('p');
        message.textContent = "No hay imágenes en el historial.";
        historyContainer.appendChild(message);
    } else {
        history.forEach(imageUrl => {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = "Imagen vista";
            imgElement.classList.add('history-image');
            historyContainer.appendChild(imgElement);
        });
    }
};

// Redirige a la página principal
backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

loadHistory();

