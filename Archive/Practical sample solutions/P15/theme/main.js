/**
 * Creates a new Theme object
 * @param {string} backgroundColour 
 * @param {string} textColour 
 * @param {string} fontFamily 
 */
function Theme(backgroundColour, textColour, fontFamily) {
    this.backgroundColour = backgroundColour;
    this.textColour = textColour;
    this.fontFamily = fontFamily;
}

// All colours generated using coolors.co
const theme1 = new Theme("#95D9DA", "#817F82", "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif");
const theme2 = new Theme("#87B37A", "#4B296B", "'Courier New', Courier, monospace");
const theme3 = new Theme("#152614", "#31CB00", "Georgia, 'Times New Roman', Times, serif");

/**
 * Applies the theme colours to the selected HTML element
 * @param {Theme} theme 
 * @param {HTMLElement} element 
 */
function applyTheme(theme, element) {
    element.style.backgroundColor = theme.backgroundColour;
    element.style.color = theme.textColour;
    element.style.fontFamily = theme.fontFamily;
}

// Apply theme styles to labels
applyTheme(theme1, document.getElementById("theme1-label"));
applyTheme(theme2, document.getElementById("theme2-label"));
applyTheme(theme3, document.getElementById("theme3-label"));

for (let btn of document.getElementsByName("theme")) {
    btn.addEventListener("change", function (event) {
        const selected = event.target.value;
        // A nested ternary. Not practical for more than three options!
        const theme = selected === "theme1" ? theme1 : selected === "theme2" ? theme2 : theme3;
        // Apply the theme to the document body. The theme will cascade down through all child elements.
        applyTheme(theme, document.body);
    })
}