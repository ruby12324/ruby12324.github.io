const randompets = [];
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

// Fetch a random dog image and add it to the randompets array
async function fetchRandomDog() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    randompets.push(data.message); // Adds the dog image URL to the array
}

// Fetch a random cat image and add it to the randompets array
async function fetchRandomCat() {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    randompets.push(data[0].url); // Adds the cat image URL to the array
}

// Fetch multiple pet images and update the HTML elements
async function fetchAndDisplayRandomPets() {
    // Clear the array in case it has data from previous fetches
    randompets.length = 0;
  
    // Fetch one dog and two cat images for variety
    await fetchRandomDog();
    await fetchRandomCat();
    await fetchRandomDog();

    // Assign fetched URLs to the specific image elements
    document.getElementById('randompet1').src = randompets[0];
    document.getElementById('randompet2').src = randompets[1];
    document.getElementById('randompet3').src = randompets[2];
}

document.addEventListener("DOMContentLoaded", () => {
    // Call the function to fetch and display images on page load
    fetchAndDisplayRandomPets();

    // Calculate today's index based on the day of the year
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;

    // Display the daily quote in the #daily-quote element
    const quoteElement = document.getElementById('daily-quote');
    if (quoteElement) {
        quoteElement.textContent = quotes[quoteIndex];
    } else {
        console.error("Element with id 'daily-quote' not found.");
    }
});
