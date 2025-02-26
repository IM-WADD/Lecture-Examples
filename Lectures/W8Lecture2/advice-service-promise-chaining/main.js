const main = document.getElementsByTagName("main")[0];
const advice = document.getElementById("advice");

function getRandomAdvice() {
    main.style.top = 0;

    // Calling the API
    const apiURL = "https://api.adviceslip.com/advice";
    fetch(apiURL)
        .then(function (result) { // Step 1 - request data from the API
            return result.json(); // Step 2 - get the JSON data out of the API response
        })
        .then(function (data) {
            // Display the results
            display(data.slip.advice);
        })
        .catch(function (error) {
            console.log(error);
            // Display default data
            display("Check your internet connection");
        });
    
}

function display(adviceText) {
    const message = adviceText;
    advice.innerText = message;
    main.style.top = `-100vh`;
}

getRandomAdvice();

document.getElementById("request").addEventListener("click", getRandomAdvice)