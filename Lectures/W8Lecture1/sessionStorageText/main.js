const KEY = "message";
const message = document.getElementById("message");

message.addEventListener("keyup", function () {
    // Will update the saved text every time a key is pressed 
    // while the textarea is in focus
    sessionStorage.setItem(KEY, message.value);
})

/**
 * Gets the user-entered text saved in sessionStorage
 * @returns {string} The user's text or an empty string
 */
function getSavedText() {
    const savedMessage = sessionStorage.getItem(KEY);
    if (savedMessage !== null) {
        return savedMessage;
    }
    return "";
}

// On page load, add any saved text to the text area
message.value = getSavedText();