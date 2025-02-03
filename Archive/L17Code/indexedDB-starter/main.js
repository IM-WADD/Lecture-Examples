const submitBtn = document.getElementById("add_user");
const userText = document.getElementById("new_user");
const users = document.getElementById("users");

const DB_NAME = "WADD_DB";
const STORE_NAME = "Users";

submitBtn.addEventListener("click", function () {
    addUser(userText.value);
})

/**
 * Add a new name to the database if it doesn't exist already.
 * @param {string} name 
 */
function addUser(name) {
    
}
