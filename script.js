const  quoteContainer = document.getElementById('quote-container');
const  quoteText = document.getElementById('quote');
const  authorText = document.getElementById('author');
const  twitterBtn = document.getElementById('twitter');
const  newQuoteBtn = document.getElementById('new-quote');
const  loader = document.getElementById('loader');


//Show Loading 
function showLoadingٍSpin(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading 
function hideLoadingSpin(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote from API
async function getQuote(){
    showLoadingٍSpin();
    const proxyURL = 'https://whispering-tor-04671.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();

        // Check  the name of Author is blank Unkown
        if(data.quoteAuthor === ''){
        authorText.innerText = 'Unkown';
        }else{
        authorText.innerText = data.quoteAuthor;
        }
            //Check the length of text and reduce font-size
            if(data.quoteText.length > 120){
                quoteText.classList.add('long-quote');
            }else{
                quoteText.classList.remove('long-quote');
            }
            //Calling the text to insert in DOM
        quoteText.innerText = data.quoteText;
        //stop loading
        hideLoadingSpin();

    }catch(error){
        getQuote();
    }

}

//Tweet quote 
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twittwrUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twittwrUrl,'_blank');
}

//Event Listeners 
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuote();
