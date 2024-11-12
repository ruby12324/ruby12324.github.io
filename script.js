const randompets = [];
const quotes = [
    "Believe you can and you're halfway there.", "The only limit to our realization of tomorrow is our doubts of today.",
    "You are never too old to set another goal or to dream a new dream.", "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.", "Don't watch the clock; do what it does. Keep going.",
    "You are braver than you believe, stronger than you seem, and smarter than you think.",
    "You think life is bad? Wait till you see mine",
    "The law of attraction works the same way as 'you are what you eat'",
    "Those who can make you believe absurdities can make you commit atrocities. In order to attain the impossible, one must attempt the absurd",
    "Being scared doesn't make me weak. It just means I'm still alive."
];

async function fetchPetImage(petType) {
    const url = petType === 'dog' ? 'https://dog.ceo/api/breeds/image/random' : 'https://api.thecatapi.com/v1/images/search';
    const response = await fetch(url);
    const data = await response.json();
    return petType === 'dog' ? data.message : data[0].url;
}

async function displayImages(sectionId, petType) {
    const images = document.querySelectorAll(`#${sectionId} img`);
    const fetchedImages = await Promise.all(Array.from(images).map(() => fetchPetImage(petType)));

    fetchedImages.forEach((url, index) => {
        const img = images[index];
        img.style.opacity = '0';  // Start fade-out before src update
        img.src = url;
        img.onload = () => {
            setTimeout(() => {
                img.style.transition = 'opacity 0.5s ease-in-out';
                img.style.opacity = '1';
            }, 50);
        };
    });
}

async function displayRandomImages() {
    const randomImages = document.querySelectorAll('#randompets img');
    const promises = Array.from(randomImages).map(() =>
        fetchPetImage(Math.random() < 0.5 ? 'dog' : 'cat')
    );
    const fetchedImages = await Promise.all(promises);

    fetchedImages.forEach((image, index) => {
        const img = randomImages[index];
        img.style.opacity = '0';
        img.src = image;
        img.onload = () => {
            setTimeout(() => {
                img.style.transition = 'opacity 0.5s ease-in-out';
                img.style.opacity = '1'; // Fade-in 
            }, 50);
        };
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const dogButton = document.getElementById('dogbuttono');
    const catButton = document.getElementById('catbuttono');
    const quoteElement = document.getElementById('daily-quote');
    const menuIcon = document.getElementById("menu-icon");
    const sidebar = document.getElementById("sidebar");
    const petpic = [
        "https://www.hf.uio.no/imk/forskning/aktuelt/aktuelle-saker/2020/bilder/internettdyr_660.jpg",
        "https://c4.wallpaperflare.com/wallpaper/26/488/979/the-sun-music-the-city-stars-space-hd-wallpaper-preview.jpg",
        "https://i.pinimg.com/736x/4b/0d/53/4b0d535fb9d16d3b3182c6cb96a2b759.jpg",
        "https://i.pinimg.com/736x/8c/a7/38/8ca738dc9939ee141ff7792f963d4979.jpg",
        "https://i.pinimg.com/originals/f9/46/ec/f946ecfbd3bec03b6ffc650c176b6eb5.gif"
    ]

    function changebackground() {
        const randomImage = petpic[Math.floor(Math.random() * petpic.length)];
        document.body.style.backgroundImage = `url(${randomImage})`;
    }

    setInterval(changebackground, 15000);

    changebackground();
   

    if (quoteElement) {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        const quoteIndex = dayOfYear % quotes.length;
        quoteElement.textContent = quotes[quoteIndex];
    }

    menuIcon.addEventListener("click", () => {
        sidebar.classList.toggle("visible");
        menuIcon.src = sidebar.classList.contains("visible")
            ? "https://icon-library.com/images/close-icon-png/close-icon-png-29.jpg" 
            : "https://static-00.iconduck.com/assets.00/hamburger-menu-icon-512x464-8u2owc1t.png"; 
        menuIcon.style.position = sidebar.classList.contains("visible") ? "fixed" : "absolute";
    });

    displayImages('dogs', 'dog');
    displayImages('cats', 'cat');
    displayRandomImages();

    dogButton.addEventListener('click', () => displayImages('dogs', 'dog'));
    catButton.addEventListener('click', () => displayImages('cats', 'cat'));

    
});
