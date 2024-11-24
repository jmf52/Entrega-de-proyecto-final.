const catButton = document.getElementById('catButton');
const dogButton = document.getElementById('dogButton');
const animalImage = document.getElementById('animalImage');
const historyContainer = document.getElementById('historyContainer');

const fetchAnimalImage = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        let imageUrl;
        if (url.includes('cat')) {
            imageUrl = data[0].url;
        } else {
            imageUrl = data.message;
        }
        animalImage.src = imageUrl;
        animalImage.style.display = 'block';
        addToHistory(imageUrl);
    } catch (error) {
        console.error('Error fetching animal image:', error);
    }
};

const addToHistory = (imageUrl) => {
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    historyContainer.appendChild(imgElement);
};

catButton.addEventListener('click', () => {
    fetchAnimalImage('https://api.thecatapi.com/v1/images/search');
});

dogButton.addEventListener('click', () => {
    fetchAnimalImage('https://dog.ceo/api/breeds/image/random');
});

