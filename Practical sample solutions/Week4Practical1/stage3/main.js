/**
 * Updates a clock face
 * @param {string} clockId The HTML id of the clock
 * @param {number} hoursDiff The number of hours difference from the current timezone
 */
function updateClock(clockId, hoursDiff) {
    const time = new Date();
    
    const hours = (time.getHours() + hoursDiff) % 24;
    const convertedHours = hours % 12
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const clock = document.getElementById(clockId);
    const hoursRotation = getRotation(convertedHours, 12);
    clock.getElementsByClassName("hour")[0].style.transform = "translateX(100px) rotate(" + hoursRotation + "deg)";
    clock.getElementsByClassName("minute")[0].style.transform = "translateX(100px) rotate(" + getRotation(minutes, 60) + "deg)";
    clock.getElementsByClassName("second")[0].style.transform = "translateX(100px) rotate(" + getRotation(seconds, 60) + "deg)";

    const ampm = document.getElementById(clockId + "-am-pm");
    ampm.innerText = hours < 12 ? "AM" : "PM";
    // The statement above is equivalent to this conditional:
    /*if (hours < 12) {
        ampm.innerText = "AM";
    } else {
        ampm.innerText = "PM";
    }*/
}

/**
 * Calculates the rotation of a clock hand
 * @param {number} amount The amount the hand represents 
 * @param {number} maxValue The maximum value of the hand (e.g. 12 for hours, 60 for minutes and seconds)
 * @returns {number} The rotation in degrees
 */
function getRotation(amount, maxValue) {
    return amount / maxValue * 360;
}

updateClock("york", 0);
updateClock("sydney", 11);

setInterval(function() {
    updateClock("york", 0);
    updateClock("sydney", 11);
}, 1000);