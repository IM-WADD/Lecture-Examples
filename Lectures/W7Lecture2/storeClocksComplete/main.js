let clocks = []; // An array to store clock objects

/**
 * Event handler for the add clock form. Creates a new clock object and adds it to the UI.
 * @param {Event} event 
 */
function createClock(event) {
    event.preventDefault(); // This line is necessary because the form has a submit button rather than a generic button.
    const placeName = document.getElementById("place-name").value;
    const newClock = {
        placeName: placeName === "" ? "Here" : placeName, // Makes sure the place name isn't empty
        timeDiff: Number(document.getElementById("hours-diff").value) // Converts the time difference from a string to a number
    }
    addNewClock(newClock.placeName);
    clocks.push(newClock);

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    saveClocks(); // Saves the clocks to local storage whenever a new clock is created
}

/**
 * Adds a new clock face to the page
 * @param {string} place The clock's place name
 */
function addNewClock(place) {
    // The following line uses the template literal method of creating a string with variables - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    const cleanedPlace = place.replace(" ", ""); // Removes spaces from the place name e.g. New York becomes NewYork
    document.getElementById("clocks").innerHTML += 
        `<div class="column">
            <div id="${cleanedPlace}" class="clock">
                <div class="am-pm" id="${cleanedPlace}-am-pm">...</div>
                <div class="tick"><div class="line"></div></div>
                <div class="tick one"><div class="line"></div></div>
                <div class="tick two"><div class="line"></div></div>
                <div class="tick three"><div class="line"></div></div>
                <div class="tick four"><div class="line"></div></div>
                <div class="tick five"><div class="line"></div></div>
                <div class="tick six"><div class="line"></div></div>
                <div class="tick seven"><div class="line"></div></div>
                <div class="tick eight"><div class="line"></div></div>
                <div class="tick nine"><div class="line"></div></div>
                <div class="tick ten"><div class="line"></div></div>
                <div class="tick eleven"><div class="line"></div></div>
                <div class="hand second"></div>
                <div class="hand hour"></div>
                <div class="hand minute"></div>
            </div>
            <p>${place}</p>
        </div>`
}

/**
 * Updates all saved clocks to show the current time in each place.
 */
function updateClocks() {
    for (const clock of clocks) {
        // Calculates the clock's current time in its timezone
        const time = new Date(); // Gets the date and time in the user's timezone
        const hour = (time.getHours() + clock.timeDiff) % 24; // Adds the time difference to the current time then converts to the 0-24 hour range
        const convertedHour = hour % 12; // Converts the hour from a 24-hour clock to a 12-hour clock.
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        // Put the clock's hands in the right place
        const clockId = clock.placeName.replace(" ", ""); // removes spaces from the place name
        const clockElem = document.getElementById(clockId); // When the clock was created, the place name was used as its id
        // Update the hands
        clockElem.getElementsByClassName("hour")[0].style.transform = "translate(100px) rotate(" + getRotation(convertedHour, 12) + "deg)";
        clockElem.getElementsByClassName("minute")[0].style.transform = "translate(100px) rotate(" + getRotation(minutes, 60) + "deg)";
        clockElem.getElementsByClassName("second")[0].style.transform = "translate(100px) rotate(" + getRotation(seconds, 60) + "deg)";
        // Show AM/PM
        document.getElementById(clockId + "-am-pm").innerHTML = hour < 12 ? "AM" : "PM";
    }
}


/**
 * Calculates the rotation of a hand
 * @param {number} value The number a hand should point to
 * @param {number} maxValue The maximum value of that hand e.g. total number of hours, total number of minutes
 * @returns {number} The rotation of the hand in degrees
 */
function getRotation(value, maxValue)  {
    return value / maxValue * 360;
}

/** NEW STORAGE FUNCTIONALITY */

/**
 * Loads the saved clocks from local storage and adds them to the page. If there are no saved clocks, smoothly scrolls to the add clock form.
 */
function loadSavedClocks() {
    const existingClocks = localStorage.getItem("places"); // Loads any saved clocks in local storage
    if (existingClocks === null) {
        // Smoothly scrolls to the add clock form if there are no clocks to show
        window.scrollTo({
            top: document.getElementById("add-place").offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        clocks = JSON.parse(existingClocks); // Converts the clocks back into an array of objects
        for (const clock of clocks) {
            addNewClock(clock.placeName); // Adds a clock face for each saved clock
        }
    }
}

/**
 * Saves the clocks array to local storage as a string. This should be called whenever the clocks array is updated.
 */
function saveClocks() {
    localStorage.setItem("places", JSON.stringify(clocks)); // Saves the clocks array to local storage as a string
}

/** END STORAGE FUNCTIONALITY */


// Add event listener to handle form submission
document.getElementById("submit").addEventListener("click", e => createClock(e));

loadSavedClocks(); // Loads any saved clocks when the page first loads

// Once a second, go through all clocks and update the time
setInterval(updateClocks, 1000);


