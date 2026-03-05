// Step 1. Select the elements you want to respond to events
// Step 2. Write event handlers - functions that will run when the event happens
// Step 3. Attach the event handlers to the elements

// Step 1.
const button = document.getElementById("myButton");

// Step 2.
function changeCircleColour() {
    console.log("change me");
    const circle = document.getElementById("circle");
    circle.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

function changeBackgroundColour(event) {
    console.log(event.target);
    document.body.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

// Step 3.
button.addEventListener("click", changeCircleColour);
document.addEventListener("click", changeBackgroundColour);