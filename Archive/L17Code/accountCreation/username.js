const USER_KEY = "account_user";
const userInput = document.getElementById("username");

document.getElementById("continue").addEventListener("click", function () {
    if (userInput.value.trim().length > 3) {
        window.location.href = "step2.html";
    } else {
        document.getElementById("username-info").innerText = "Username must be at least three characters long"
    }
});

userInput.addEventListener("keyup", function () {
    // Will update the saved username every time a key is pressed 
    // while the text input is in focus
    sessionStorage.setItem(USER_KEY, userInput.value.trim());
});

/**
 * Checks if the user has saved a username and returns it if so.
 * @returns {string} The saved username, if it exists. Otherwise an empty string is returned
 */
function getSavedUsername() {
    const user = sessionStorage.getItem(USER_KEY);
    if (user !== null) {
        return user;
    }
    return "";
}

userInput.value = getSavedUsername();