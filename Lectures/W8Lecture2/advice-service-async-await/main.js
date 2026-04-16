const main = document.getElementsByTagName("main")[0];
const advice = document.getElementById("advice");

/**
 * Get a new piece of advice from the AdviceSlip API.
 */
async function getRandomAdvice() {
    main.style.top = 0;

    // Calling the API
    const apiURL = "https://api.adviceslip.com/advice";
    try {
        // Step 1 - request data from the API
        const result = await fetch(apiURL);
        // Step 2 - get the JSON data out of the API response
        const data = await result.json();
        // Display the results
        display(data.slip.advice);
    } catch (error) {
        // Display the results
        display("Check your internet connection")
    }
}

/**
 * Display a message
 * @param {string} message 
 */
function display(message) {
    // Display the results
    advice.innerText = message;
    main.style.top = `-100vh`;
}


getRandomAdvice();

document.getElementById("request").addEventListener("click", getRandomAdvice)