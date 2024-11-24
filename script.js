function getImage(type) {
    let url = '';
    
    if (type === 'cat') {
        url = 'https://api.thecatapi.com/v1/images/search';
    } else if (type === 'dog') {
        url = 'https://dog.ceo/api/breeds/image/random';
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let imageUrl;
            if (type === 'cat') {
                imageUrl = data[0].url;
            } else if (type === 'dog') {
                imageUrl = data.message;
            }
            displayImage(imageUrl);
        })
        .catch(error => console.error('Error al obtener la imagen:', error));
}


function displayImage(imageUrl) {
    const container = document.getElementById('image-container');
    container.innerHTML = `<img src="${imageUrl}" alt="Imagen de ${type}">`;
}
