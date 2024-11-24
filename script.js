const catButton = document.getElementById('catButton');
const dogButton = document.getElementById('dogButton');
const imageContainer = document.getElementById('imageContainer');
const viewHistoryButton = document.getElementById('viewHistoryButton');

function addToHistory(imageUrl) {
    let viewedImages = JSON.parse(localStorage.getItem('viewedImages')) || [];
    if (!viewedImages.includes(imageUrl)) {
        viewedImages.push(imageUrl);
        localStorage.setItem('viewedImages', JSON.stringify(viewedImages));
    }
}

function displayImage(imageUrl) {
    imageContainer.innerHTML = '';
    const imgElement = document.createElement('img');
    imgElement.id = 'animalImage';
    imgElement.src = imageUrl;
    imgElement.alt = 'Animal';
    imgElement.onload = () => imgElement.classList.add('loaded');
    imageContainer.appendChild(imgElement);
}

async function fetchImage(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const imageUrl = Array.isArray(data) ? data[0]?.url : data.message;
        displayImage(imageUrl);
        addToHistory(imageUrl);
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        alert('Hubo un problema al cargar la imagen. Inténtalo de nuevo.');
    }
}

catButton.addEventListener('click', () => {
    fetchImage('https://api.thecatapi.com/v1/images/search');
});

dogButton.addEventListener('click', () => {
    fetchImage('https://dog.ceo/api/breeds/image/random');
});

viewHistoryButton.addEventListener('click', () => {
    window.location.href = 'history.html';
});
