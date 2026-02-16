const USER_KEY = "account_user";
const confirmation = document.getElementById("confirmation");

const storedUser = sessionStorage.getItem(USER_KEY);
if (storedUser !== null) {
    confirmation.innerText = `Welcome to our awesome website, ${storedUser}!`;
} else {

    confirmation.innerHTML = "Something has gone wrong! <a href='step1.html'>Please try again</a>.";
}