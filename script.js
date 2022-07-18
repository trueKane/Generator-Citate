const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// arata ca se incarca
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// nu arata ca se incarca
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Arata citat nou
function newQuote() {
  loading();
  // Alege un citat aleatoriu din apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Daca nu are autor va fi inlocuit
  if (!quote.author) {
    authorText.textContent = "Necunoscut";
  } else {
    authorText.textContent = quote.author;
  }
  // Verifica marimea textului pentru styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

//  citate din API
async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Eroare aici
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// evenimente
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// cand se incarca
getQuotes();
