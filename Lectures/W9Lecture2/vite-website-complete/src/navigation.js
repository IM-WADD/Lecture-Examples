/**
 * Creates the website navigation
 * @returns {HTMLElement}
 */
export function createNavigation() {
    const nav = document.createElement("nav");
    nav.innerHTML = `<ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="other.html">Other</a></li>
    </ul>`;
    return nav;
}