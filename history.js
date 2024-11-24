const historyContainer = document.getElementById('historyContainer');
const backButton = document.getElementById('backButton');


const storedImages = JSON.parse(localStorage.getItem('imageHistory')) || [];


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
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteImage(index);

        
        const downloadButton = document.createElement('button');
        downloadButton.className = 'download-btn';
        downloadButton.textContent = 'Descargar';
        downloadButton.onclick = () => downloadImage(image);

        imageCard.appendChild(imgElement);
        imageCard.appendChild(deleteButton);
        imageCard.appendChild(downloadButton);

        historyContainer.appendChild(imageCard);
    });
}


function deleteImage(index) {
    storedImages.splice(index, 1);
    localStorage.setItem('imageHistory', JSON.stringify(storedImages));
    renderHistory();
}


function downloadImage(imageUrl) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'imagen-favorita.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


backButton.onclick = () => {
    window.location.href = 'index.html';
};


renderHistory();

