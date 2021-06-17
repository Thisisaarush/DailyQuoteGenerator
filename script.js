const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterbtn = document.getElementById('twitter');
const newbtn = document.getElementById('newquote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loadingQuote() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completeLoading () {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loadingQuote();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    completeLoading();
}

async function getQuotes() {
    loadingQuote();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {

    }
}

function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

twitterbtn.addEventListener('click', tweetQuote);
newbtn.addEventListener('click', newQuote);

getQuotes();