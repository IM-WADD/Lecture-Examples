const THEME_PREF = "theme_pref";
const darkTheme = {
    "--bg": "#212738",
    "--header-colour": "#F97068",
    "--text-colour": "#EDF2EF",
    "--highlight-colour": "#57C4E5"
}
const lightTheme = {
    "--bg": "#EDF2EF",
    "--header-colour": "#212738",
    "--text-colour": "#212738",
    "--highlight-colour": "#F97068"
}
const themeSwitcher = document.getElementById("theme-switch");

themeSwitcher.addEventListener("click", function () {
    // Get the current theme
    const root = document.querySelector(":root");
    const currentBg = getComputedStyle(root).getPropertyValue("--bg");
    if (currentBg === lightTheme["--bg"]) {
        setTheme("dark");
        saveTheme("dark");
    } else {
        setTheme("light");
        saveTheme("light");
    }
    // Make the button lose focus (to make it look visually like a link)
    themeSwitcher.blur();
});

/**
 * Gets the user's saved theme preference, if it exists
 */
function getThemePreference() {
    const savedPref = localStorage.getItem(THEME_PREF)
    if (savedPref !== null) {
        setTheme(savedPref);
    }
}

/**
 * Sets the colour theme
 * @param {string} mode The preferred mode, either "dark" or "light"
 */
function setTheme(mode) {
    const root = document.querySelector(":root");
    const selectedTheme = mode === "dark" ? darkTheme : lightTheme;
    for (const prop in selectedTheme) {
        root.style.setProperty(prop, selectedTheme[prop]);
    }
}

/**
 * Stores the theme preference in localStorage
 * @param {string} mode The preferred mode, either "dark" or "light"
 */
function saveTheme(mode) {
    localStorage.setItem(THEME_PREF, mode);
}

// Check for a saved theme preference on load
getThemePreference();