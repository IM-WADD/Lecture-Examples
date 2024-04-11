document.body.addEventListener("click", function () {
    console.log("Hello from a traditional function");
});

document.body.addEventListener("click", event => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    if (event.clientX < width / 2 && event.clientY < height / 2) {
        document.body.style.backgroundColor = "#FF00FF";
    }
    else if (event.clientX >= width / 2 && event.clientY >= height / 2) {
        document.body.style.backgroundColor = "#00FFFF";
    }
    else {
        document.body.style.backgroundColor = "#000000";
    }
});

/**
 * This arrow function needs brackets around the parameters because there is more than one.
 * It also needs curly braces because it contains more than one line. 
 * An explicit return keyword is required because it contains more than one line.
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
const arrowWithParameters = (a, b) => {
    const total = a + b;
    return total / 2;
}

/**
 * This arrow function does not need brackets around the parameter because there is only one.
 * It does not need curly braces because it only contains one line. The 
 * value of that line is implicitly returned.
 * @param {number} a 
 * @returns {number}
 */
const arrowWithOneParam = a => a * 2;

/**
 * This arrow function needs brackets because it has no parameters.
 * It also needs curly braces because it contains more than one line. 
 * An explicit return keyword is required because it contains more than one line.
 * @returns {number}
 */
const arrowWithNoParameters = () => {
    console.log("This function always returns 10");
    return 10;
};