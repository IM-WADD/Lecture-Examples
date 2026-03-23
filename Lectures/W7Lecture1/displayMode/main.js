const displayMode = document.getElementById("displayMode");

/**
 * Updates the display mode of the page based on the user's selection. If "auto" is selected, 
 * the page will use the user's system preference for light or dark mode.
 */
function updateDisplay() {
    const selectedMode = displayMode.value;
    switch (selectedMode) {
        case "auto":
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                setMode("#000000", "#FFF");
            } else {
                setMode("#FFFFFF", "#000000");
            }
            break;
        case "light":
            setMode("#FFFFFF", "#000000");
            break;
        case "dark":
            setMode("#000000", "#FFF");
            break;
        default:
            break;
    }
}

/**
 * Sets the background color and text color of the page to the given values.
 * @param {string} bgVar The background color to be set (e.g., "#000" for black).
 * @param {string} textVar The text color to be set (e.g., "#fff" for white).
 */
function setMode(bgVar, textVar) {
    document.documentElement.style.setProperty("background-color", bgVar);
    document.documentElement.style.setProperty("color", textVar);
}


updateDisplay(); // Set the initial display mode based on the user's system preference.
displayMode.addEventListener("change", updateDisplay);