/**
 * Gets a randomly chosen number
 * @returns {number} A number between 0 and 10
 */
export function getLuckyNumber() {
    return Math.round(Math.random() * 10);
}