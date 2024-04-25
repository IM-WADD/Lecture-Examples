const nameInput = document.getElementById("name");
const saveButton = document.getElementById("save");
const countButton = document.getElementById("count");
const valueOut = document.getElementById("currentValue");

saveButton.addEventListener("click", saveCounter);
countButton.addEventListener("click", increment);

/**
 * Gets an object containing counter properties - either a saved counter 
 * or a default.
 * @returns {Object}
 */
function getCounter() {
    const storedCounter = sessionStorage.getItem("counter");
    if (storedCounter !== null) {
        return JSON.parse(storedCounter);
    } else {
        return {
            "name": "default timer",
            "value": "0"
        }
    }
}

/**
 * Save the current counter value in storage
 */
function saveCounter() {
    sessionStorage.setItem("counter", JSON.stringify({
        "name": nameInput.value,
        "value": valueOut.innerText
    }));
}

function increment() {
    valueOut.innerText = parseInt(valueOut.innerText) + 1;
    saveCounter();
}

const savedCounter = getCounter();
nameInput.value = savedCounter.name;
valueOut.innerText = savedCounter.value;