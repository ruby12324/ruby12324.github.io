// Array of quotes
const quotes = [
    "Believe you can and you're halfway there.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "You are never too old to set another goal or to dream a new dream.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "You are braver than you believe, stronger than you seem, and smarter than you think."
];

// Calculate today's index based on the day of the year
const today = new Date();
const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
const quoteIndex = dayOfYear % quotes.length;

// Display the daily quote
document.getElementById('daily-quote').textContent = quotes[quoteIndex];