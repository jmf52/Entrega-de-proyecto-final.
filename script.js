const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';
const DOG_API_URL = 'https://api.thedogapi.com/v1/images/search';
const DOG_BREED_SEARCH_URL = 'https://api.thedogapi.com/v1/breeds/search';

const randomCatBtn = document.getElementById('random-cat');
const randomDogBtn = document.getElementById('random-dog');
const searchBreedBtn = document.getElementById('search-breed');
const breedInput = document.getElementById('breed-input');
const imageContainer = document.getElementById('image-container');

async function fetchImage(url, params = '') {
  try {
    const response = await fetch(`${url}${params}`);
    const data = await response.json();
    return data[0]?.url || 'Image not found.';
  } catch (error) {
    console.error('Error fetching image:', error);
    return 'Error fetching image.';
  }
}

async function displayRandomCat() {
  const imageUrl = await fetchImage(CAT_API_URL);
  updateImage(imageUrl);
}

async function displayRandomDog() {
  const imageUrl = await fetchImage(DOG_API_URL);
  updateImage(imageUrl);
}

async function searchDogBreed() {
  const breed = breedInput.value.trim().toLowerCase();
  if (!breed) return alert('Please enter a breed.');
  
  try {
    const response = await fetch(`${DOG_BREED_SEARCH_URL}?q=${breed}`);
    const data = await response.json();
    if (data.length === 0) {
      return updateImage('No breed found.');
    }
    const breedImage = data[0]?.reference_image_id;
    if (breedImage) {
      const imageUrl = `https://cdn2.thedogapi.com/images/${breedImage}.jpg`;
      updateImage(imageUrl);
    } else {
      updateImage('No image available for this breed.');
    }
  } catch (error) {
    console.error('Error searching breed:', error);
    updateImage('Error searching breed.');
  }
}

function updateImage(imageUrl) {
  imageContainer.innerHTML = `<img src="${imageUrl}" alt="Animal Image">`;
}

randomCatBtn.addEventListener('click', displayRandomCat);
randomDogBtn.addEventListener('click', displayRandomDog);
searchBreedBtn.addEventListener('click', searchDogBreed);
