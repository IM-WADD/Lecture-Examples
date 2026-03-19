/**
 * Creates the main page content
 * @param {string} contents The page contents as a string
 * @returns {HTMLElement} The main element with the given contents
 */
export function createPageContent(contents) {
    const main = document.createElement("main");
    main.innerHTML = contents;
    return main;
}