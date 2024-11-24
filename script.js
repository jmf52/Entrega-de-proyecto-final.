const catButton = document.getElementById('catButton');
const dogButton = document.getElementById('dogButton');
const viewHistoryButton = document.getElementById('viewHistoryButton');
const animalImage = document.getElementById('animalImage');

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
        saveToLocalStorage(imageUrl);
    } catch (error) {
        console.error('Error fetching animal image:', error);
    }
};

const saveToLocalStorage = (imageUrl) => {
    let history = JSON.parse(localStorage.getItem('imageHistory')) || [];
    history.push(imageUrl);
    localStorage.setItem('imageHistory', JSON.stringify(history));
};

catButton.addEventListener('click', () => {
    fetchAnimalImage('https://api.thecatapi.com/v1/images/search');
});

dogButton.addEventListener('click', () => {
    fetchAnimalImage('https://dog.ceo/api/breeds/image/random');
});

viewHistoryButton.addEventListener('click', () => {
    window.location.href = 'history.html';
});
