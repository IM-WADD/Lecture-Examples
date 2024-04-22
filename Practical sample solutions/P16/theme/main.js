/**
 * Creates an object to store theme preferences
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
 * Apply the theme to the element
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
        applyTheme(theme, document.body);
        // Save the user's preferred theme
        localStorage.setItem("P16-theme", selected);
    })
}

// This switch statement gets the saved theme (if any) and applies it
switch(localStorage.getItem("P16-theme")) {
    case "theme1":
        applyTheme(theme1, document.body);
        document.getElementById("theme1").checked = true;
        break;
    case "theme2":
        applyTheme(theme2, document.body);
        document.getElementById("theme2").checked = true;
        break;
    case "theme3":
        applyTheme(theme3, document.body);
        document.getElementById("theme3").checked = true;
        break;
    // The default case will apply if there is no stored theme
    default:
        break;
}

/**
 * I opted to save the user's preference by only saving the "name" of the
 * theme. This makes working with localStorage very simple. However, if I 
 * later decided to change the themes, the user's preference may be 
 * broken. 
 */