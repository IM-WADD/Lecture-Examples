const PWD_KEY = "account_pwd";
const userInput = document.getElementById("password");

document.getElementById("continue").addEventListener("click", function () {
    if (userInput.value.trim().length > 3) {
        window.location.href = "complete.html";
    } else {
        document.getElementById("pwd-info").innerText = "Password must be at least three characters long"
    }
});

userInput.addEventListener("keyup", function () {
    // Will update the saved username every time a key is pressed 
    // while the text input is in focus
    sessionStorage.setItem(PWD_KEY, userInput.value.trim());
});

/**
 * Checks if the user has saved a password and returns it if so.
 * @returns {string} The saved password, if it exists. Otherwise an empty string is returned
 */
function getSavedPassword() {
    const pwd = sessionStorage.getItem(PWD_KEY);
    if (pwd !== null) {
        return pwd;
    }
    return "";
}

userInput.value = getSavedPassword();