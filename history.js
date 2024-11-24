const historyContainer = document.getElementById('historyContainer');

const loadHistory = () => {
    const history = JSON.parse(localStorage.getItem('imageHistory')) || [];
    history.forEach(imageUrl => {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = "Viewed image";
        historyContainer.appendChild(imgElement);
    });
};

loadHistory();
