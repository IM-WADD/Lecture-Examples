const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ball = {
    x: 25,
    y: 25,
    radius: 25,
    speedX: 2,
    speedY: 2,
    directionX: 1,
    directionY: 1,
    draw: function() {
        // Clears the previous drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath(); // without this, ctx.fill() will redraw all previous frames!
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

/**
 * Draws the ball at its current position and changes its direction if it hits a wall
 */
function draw() {
    // If the ball is out of bounds on the x axis, reverse x direction
    if (ball.x < ball.radius || ball.x > (canvas.width - ball.radius)) {
        ball.directionX *= -1;
    }
    // If the ball is out of bounds on the y axis, reverse y direction
    if (ball.y < ball.radius || ball.y > (canvas.height - ball.radius)) {
        ball.directionY *= -1;
    }
    ball.draw();
    ball.x += ball.speedX * ball.directionX;
    ball.y += ball.speedY * ball.directionY;
    window.requestAnimationFrame(draw); // Creates a loop by calling this function recursively
}

// Create the first frame
window.requestAnimationFrame(draw);