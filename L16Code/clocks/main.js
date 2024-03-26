
/**
 * Gets the current time and updates the clock face.
 * @param {string} clockId The HTML id of the clock to update
 * @param {number} hoursDiff The number of hours time difference
 */
function updateClock(clockId, hoursDiff) {
    clockId = clockId.replace(" ", "");
    const time = new Date();
    const hour = (time.getHours() + hoursDiff) % 24;
    const convertedHour = hour % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const clock = document.getElementById(clockId);
    // Update the hands
    clock.getElementsByClassName("hour")[0].style.transform = "translate(100px) rotate(" + getRotation(convertedHour, 12) + "deg)";
    clock.getElementsByClassName("minute")[0].style.transform = "translate(100px) rotate(" + getRotation(minutes, 60) + "deg)";
    clock.getElementsByClassName("second")[0].style.transform = "translate(100px) rotate(" + getRotation(seconds, 60) + "deg)";
    // Show AM/PM
    document.getElementById(clockId + "-am-pm").innerHTML = hour < 12 ? "AM" : "PM";
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


/**
 * Converts a string to title case
 * @param {string} str The string to convert to title case
 * @returns {number} The string in title case
 */
function toTitleCase(str) {
    const words = str.split(" ");
    // Some handy JS methods are used here... look up anything you don't know!
    const capitalized = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }).join(" ");
    return capitalized;
}

/**
 * Adds a new clock face to the document
 * @param {string} place The name of the place
 */
function addNewClock(place) {
    const cleanedPlace = place.replace(" ", "")
    // The following line uses the template literal method of creating a string with variables - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
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

/** Local Storage-related code */
document.getElementById("submit").addEventListener("click", function() {
    const existingPlaces = localStorage.getItem("places");
    const placeName = document.getElementById("place-name").value.length === 0 ? "Here" : toTitleCase(document.getElementById("place-name").value);
    const timeDiff = document.getElementById("hours-diff").value;
    // If there is no places entry in local storage, create an object. Otherwise, parse the places JSON
    const parsedPlaces = existingPlaces === null ? {} : JSON.parse(existingPlaces);
    parsedPlaces[placeName] = timeDiff; // if the place already exists, it will be overwritten
    // Save
    localStorage.setItem("places", JSON.stringify(parsedPlaces));
    // Note: the default refresh is not prevented... once the place is added, the page will refresh and the new clock will be drawn alongside the others
    
})

// Check if the user has any places stored. If not, prompt them to add at least one.
if (localStorage.getItem("places") !== null) {
    const places = JSON.parse(localStorage.getItem("places"));
    // Add a clock face and set the start time for each place
    for (let place of Object.keys(places)) {
        addNewClock(place);
        updateClock(place, parseInt(places[place]));
    }
    // Update all clocks each second
    setInterval(function () {
        for (let place of Object.keys(places)) {
            updateClock(place, parseInt(places[place]));
        }
    }, 1000);     
} else {
    // scroll to add form
    window.scrollTo({
        top: document.getElementById("add-place").offsetTop,
        left: 0,
        behavior: 'smooth'
    }); 
}
