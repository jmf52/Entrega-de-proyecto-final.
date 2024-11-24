const historyContainer = document.getElementById('historyContainer');
const backButton = document.getElementById('backButton');

const storedImages = JSON.parse(localStorage.getItem('viewedImages')) || [];

function renderHistory() {
    historyContainer.innerHTML = '';
    storedImages.forEach((image, index) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';

        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = `Imagen ${index + 1}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar';
        deleteButton.onclick = () => deleteImage(index);

        imageCard.appendChild(imgElement);
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

