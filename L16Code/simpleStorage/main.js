// The key for the user name in storage
const WADD_USER = "WADD_user";
const greeting = document.getElementById("greeting");
const username = document.getElementById("edit-user");
const edit = document.getElementById("edit");

greeting.addEventListener("click", function () {
    edit.style.display = "block";
    greeting.style.display = "none";
    username.focus();
});

username.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        saveNameInStorage(event.target.value);
    }
})

/**
 * Checks localStorage for a saved username
 * @returns {string} The saved username, if it exists, or a default name
 */
function getNameFromStorage() {
    const userName = localStorage.getItem(WADD_USER);
    if (userName !== null) {
        // There is a username saved in storage
        return userName;
    } else {
        // There is no username saved in storage, return a default value
        return "User";
    }
}

/**
 * Saves the given username to localStorage
 * @param {string} username The username to save
 */
function saveNameInStorage(username) {
    localStorage.setItem(WADD_USER, username);
    greetUser();
}

/**
 * Display a greeting for the user
 */
function greetUser() {
    // Hide the input field and display the greeting
    edit.style.display = "none";
    greeting.style.display = "block";
    
    const userName = getNameFromStorage();
    greeting.replaceChildren(`Hello, ${userName}`);
}

// When the page loads, get the name from storage
greetUser();