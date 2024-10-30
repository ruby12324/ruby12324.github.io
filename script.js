const randompets = [];
var dogbutton = document.getElementById('dogbuttono')
var catbutton = document.getElementById('catbuttono')
const quotes = [
    "Believe you can and you're halfway there.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "You are never too old to set another goal or to dream a new dream.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "You are braver than you believe, stronger than you seem, and smarter than you think.",
    "Those who can make you believe absurdities can make you commit atrocities. In order to attain the impossible, one must attempt the absurd"
];
async function fetchPetImage(petType) {
    const url = petType === 'dog' ? 'https://dog.ceo/api/breeds/image/random' : 'https://api.thecatapi.com/v1/images/search';
    const response = await fetch(url);
    const data = await response.json();
    return petType === 'dog' ? data.message : data[0].url;
}

async function displayDogImages() {
    const dogImages = await Promise.all([fetchPetImage('dog'), fetchPetImage('dog'), fetchPetImage('dog')]);
    document.getElementById('dog1').src = dogImages[0];
    document.getElementById('dog2').src = dogImages[1];
    document.getElementById('dog3').src = dogImages[2];
}

// Fetch and display 3 images of cats
async function displayCatImages() {
    const catImages = await Promise.all([fetchPetImage('cat'), fetchPetImage('cat'), fetchPetImage('cat')]);
    document.getElementById('cat1').src = catImages[0];
    document.getElementById('cat2').src = catImages[1];
    document.getElementById('cat3').src = catImages[2];
}

// Fetch and display 3 random pet images (either dog or cat)
async function displayRandomPetImages() {
    const randomPetImages = await Promise.all([
        fetchPetImage(Math.random() < 0.5 ? 'dog' : 'cat'),
        fetchPetImage(Math.random() < 0.5 ? 'dog' : 'cat'),
        fetchPetImage(Math.random() < 0.5 ? 'dog' : 'cat')
    ]);
    document.getElementById('randompet1').src = randomPetImages[0];
    document.getElementById('randompet2').src = randomPetImages[1];
    document.getElementById('randompet3').src = randomPetImages[2];
}

window.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;

    // Display the daily quote
    const quoteElement = document.getElementById('daily-quote');
    if (quoteElement) {
        quoteElement.textContent = quotes[quoteIndex];
    } else {
        console.error("Element with id 'daily-quote' not found.");
    }

    // Initialize images
    displayDogImages();
    displayCatImages();
    displayRandomPetImages();
});

dogbutton.addEventListener('click', async () => {
    await displayDogImages();
});

catbutton.addEventListener('click', async () => {
    await displayCatImages();
});

