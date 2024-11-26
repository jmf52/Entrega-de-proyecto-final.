const historyContainer = document.getElementById('historyContainer');
const backButton = document.getElementById('backButton');

const storedImages = JSON.parse(localStorage.getItem('viewedImages')) || [];

function renderHistory() {
    historyContainer.innerHTML = '';

    if (storedImages.length === 0) {
        historyContainer.innerHTML = '<p>No hay imágenes en el historial.</p>';
        return;
    }

    storedImages.forEach((image, index) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';

        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = `Imagen ${index + 1}`;
        imgElement.onerror = () => {
            imgElement.src = 'images/error-placeholder.png'; // Imagen alternativa en caso de error
        };

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar';
        deleteButton.onclick = () => {
            if (confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
                deleteImage(index);
            }
        };

        const downloadButton = document.createElement('a');
        downloadButton.href = image;
        downloadButton.download = `imagen_${index + 1}.jpg`; // Nombre sugerido para la descarga
        downloadButton.className = 'download-btn';
        downloadButton.innerHTML = '<i class="fas fa-download"></i> Descargar';

        imageCard.appendChild(imgElement);
        imageCard.appendChild(downloadButton);
        imageCard.appendChild(deleteButton);

        historyContainer.appendChild(imageCard);
    });
}

function deleteImage(index) {
    storedImages.splice(index, 1);
    localStorage.setItem('viewedImages', JSON.stringify(storedImages));
    renderHistory();
}

backButton.onclick = () => {
    window.location.href = 'index.html';
};

renderHistory();
