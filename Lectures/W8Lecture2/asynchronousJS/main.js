function operation1() {
    console.log("operation 1 complete");
}

function operation2Broken() {
    console.log("operation 2 broken start")
    const output = document.getElementById("output");
    const response = fetch("https://random.dog/woof.json");
    const url = response.json(); 
    output.innerHTML = `<img src="${url.url}" alt="A random dog"/>`;
    console.log("operation 2 broken complete");
}

/**
 * Uses async / await syntax to carry out the asynchronous 
 * operations of fetching the API data. The outcome is 
 * exactly the same as operation2Alternative()!
 */
async function operation2() {
    console.log("operation 2 start");
    const output = document.getElementById("output");
    try {
        const response = await fetch("https://random.dog/woof.json");
        const url = await response.json(); 
        output.innerHTML = `<img src="${url.url}" alt="A random dog"/>`;
        console.log("operation 2 complete");
    }
    catch (error) {
        console.log("operation 2 failed:", error);
    }
}

/**
 * Uses promise chaining to carry out the asynchronous
 * operations of fetching the API data. The outcome is 
 * exactly the same as operation2()!
 */
function operation2Alternative() {
    console.log("operation 2 alternative start");
    // fetch() is asyncronous
    fetch("https://random.dog/woof.json")
        .then(function (response) {
            // response is the value returned by fetch()
            // .json() is also asynchronous
            return response.json();
        })
        .then(function (url) {
            // urls is the value returned by the previous then()
            const output = document.getElementById("output");
            output.innerHTML = `<img src="${url.url}" alt="A random dog"/>`;
            console.log("operation 2 alternative complete");
        })
        .catch(function (error) {
            console.log("operation 2 alternative failed:", error)
        })
}

function operation3() {
    console.log("operation 3 complete")
}

operation1();
operation2(); // Try replacing this with operation2Broken() or operation2Alternative()
operation3();