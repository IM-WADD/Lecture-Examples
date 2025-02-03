
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/**
 * Draws a person on the canvas
 * @param {number} x The centre of the head on the x axis
 * @param {number} y The centre of the head on the y axis
 * @param {CanvasRenderingContext2D} context The 2D canvas context[[]]
 */
function drawPerson(x, y, context) {
    context.beginPath();
    context.arc(x, y, 20, 0, 2 * Math.PI);
    context.fill(); // Will fill any shapes drawn so far, or since the last beginPath()
    // Body
    context.beginPath(); // The following shapes should all have the same colours
    context.moveTo(x, y + 20);
    context.lineTo(x, y + 70);
    // Left leg
    context.lineTo(x - 20, y + 120);
    // Right leg
    context.moveTo(x, y + 70);
    context.lineTo(x + 20, y + 120);
    // Left arm
    context.moveTo(x, y + 40);
    context.lineTo(x - 50, y + 30);
    // Right arm
    context.moveTo(x, y + 40);
    context.lineTo(x + 50, y + 30);

    // The following stroke styles will apply to subsequent calls to stroke();
    context.strokeStyle = "#0000FF";
    context.lineWidth = 3;
    // Draw the stroke on any shapes created after the last beginPath()
    context.stroke();

    context.beginPath(); // The following shapes will be different colours
    // Left hand
    context.arc(x - 50, y + 30, 5, 0, 2 * Math.PI);
    // Right hand
    context.arc(x + 50, y + 30, 5, 0, 2 * Math.PI);
    // Left foot
    context.rect(x - 40, y + 115, 20, 5);
    // Right foot
    context.rect(x + 20, y + 115, 20, 5);
    context.fillStyle = "#ff4500";
    context.fill();
}

drawPerson(150, 30, ctx);
drawPerson(300, 30, ctx);

// ADVANCED: Making the canvas responsive
// Listen for a resize event on the window
/*window.addEventListener("resize", function () {
    // Get the width and height of the canvas' parent
    const newWidth = canvas.parentElement.clientWidth;
    const newHeight = canvas.parentElement.clientHeight;

    // All drawings will clear when the width and height are changed
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Redraw the person in the new canvas centre
    drawPerson(newWidth / 2, newHeight - 120, ctx);
})*/