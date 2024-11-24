const catButton = document.getElementById('catButton');
const dogButton = document.getElementById('dogButton');
const viewHistoryButton = document.getElementById('viewHistoryButton');
const animalImage = document.getElementById('animalImage');


const fetchAnimalImage = async (url) => {
    try {
        const response = await fetch(url);
        
        
        if (!response.ok) {
            throw new Error('Error al conectar con la API');
        }

       
        const data = await response.json();
        let imageUrl;

        if (url.includes('cat')) {
     
            imageUrl = data[0]?.url;
     
            imageUrl = data?.message; 

     
        if (imageUrl) {
            animalImage.src = imageUrl;
            animalImage.style.display = 'block'; 
            saveToLocalStorage(imageUrl); 
        } else {
            console.error('No se pudo obtener la URL de la imagen');
        }
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        alert('Hubo un problema al cargar la imagen. Intenta de nuevo.');
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
