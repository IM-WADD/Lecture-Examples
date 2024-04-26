const wordsTextarea = document.getElementById("text");
let currentWords = 0;
const WORDS_PER_DOG = 100;


/**
 * Gets a random dog image and displays it on the page.
 */
async function getMeADog() {
    const response = await fetch("https://random.dog/woof.json");
    const data = await response.json();
    if (!isAcceptedFileType(data.url)) {
        getMeADog();
    } else {
        const dogArea = document.getElementById("dog-area");
        dogArea.innerHTML = `<img src="${data.url}" alt="A random dog">`;
    }
}

/**
 * Checks if an image source is a file type the image element can display.
 * @param {string} src An image URL
 * @returns {boolean}
 */
function isAcceptedFileType(src) {
    return src.endsWith(".jpg") || src.endsWith(".jpeg") || src.endsWith(".gif") || src.endsWith(".png")
}

/**
 * Gets the number of words left to type until the next dog picture
 * @param {string[]} words An array of words
 * @returns {number}
 */
function getWordsRemaining(words) {
    const wordsRemaining = WORDS_PER_DOG - words.length % WORDS_PER_DOG;
    return wordsRemaining;
}

/**
 * Checks whether it is time for a new dog and updates the page display 
 * and local storage.
 */
function checkNumberOfWords() {
    // Get the contents of the textarea, trim any trailing whitespace, then split by spaces
    const words = wordsTextarea.value.trim().split(" ");
    const wordsRemaining = getWordsRemaining(words);
    /*
    The approach below works whether the user is typing one word at a time 
    or has pasted in a chunk of text. Instead of checking if the number of words is 
    exactly divisible by 100 (which only works if the user is typing one word at a time), 
    it compares the number of hundreds of words in the text area now to the number of 
    hundreds of words in the text area prior to the event. If this number has increased, there 
    should be a new dog.
    */
    if (Math.floor(words.length / WORDS_PER_DOG) > Math.floor(currentWords / WORDS_PER_DOG)) {
        getMeADog();
    }
    currentWords = words.length;
    document.getElementById("status").innerText = `${wordsRemaining} words until your next dog.`
    localStorage.setItem("written-dog", wordsTextarea.value);
}

wordsTextarea.addEventListener("keyup", checkNumberOfWords);

if (localStorage.getItem("written-dog") !== null) {
    document.getElementById("text").value = localStorage.getItem("written-dog");
    checkNumberOfWords();
}