const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const GRID_SIZE = 20;

class Coord {
    #x;
    #y;

    /**
     * Create a new x, y coordinate
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    /**
     * Get the x coordinate
     * @returns {number}
     */
    x() {
        return this.#x;
    }

    /**
     * Get the y coordinate
     * @returns {number}
     */
    y() {
        return this.#y;
    }
}

class Snake {
    #segments = [];
    #directionX = 1;
    #directionY = 0;

    /**
     * Creates a new snake with single segment at 0, 0
     */
    constructor() {
        this.#segments.push(new Coord(0, 0));
    }

    /**
     * Grow the snake by one segment
     */
    eat() {
        const lastSegment = this.#segments[this.#segments.length - 1];
        const newSegment = new Coord(lastSegment.x() - GRID_SIZE * this.#directionX, lastSegment.y() - GRID_SIZE * this.#directionX);
        this.#segments.push(newSegment);
    }

    /**
     * Check if the snake head is over the food
     * @param {Food} food 
     * @returns {boolean}
     */
    isOverFood(food) {
        return this.#segments[0].x() === food.x() && this.#segments[0].y() === food.y();
    }

    /**
     * Set the direction of the snake based on the key that was pressed
     * @param {string} key The key character
     */
    setDirection(key) {
        // This is implemented so the snake can't reverse on itself
        if (key === "ArrowRight" && this.#directionX !== -1) {
            this.#directionX = 1;
            this.#directionY = 0;
        } else if (key === "ArrowLeft" && this.#directionX !== 1) {
            this.#directionX = -1;
            this.#directionY = 0;
        } else if (key === "ArrowUp" && this.#directionY !== 1) {
            this.#directionX = 0;
            this.#directionY = -1;
        } else if (key === "ArrowDown" && this.#directionY !== -1) {
            this.#directionX = 0;
            this.#directionY = 1;
        }
    }

    /**
     * Calculates the coordinate of the new head of the snake on one axis (x or y), taking into 
     * account collision with the edges of the canvas.
     * @param {number} headCoord The coordinate of the current head of the snake on one axis
     * @param {number} maxVal The largest value on the axis (either the width or height of the canvas)
     * @param {number} direction The direction along the axis
     * @returns The coordinate of the new head of the snake
     */
    #calculateCoordinate(headCoord, maxVal, direction) {
        // If the head has gone off the right / bottom of the canvas, put it back 
        if (direction === 1 && headCoord >= maxVal + GRID_SIZE * (this.#segments.length - 1)) {
            return -GRID_SIZE;
        } else if (direction === -1 && headCoord < -GRID_SIZE * this.#segments.length) {
            return maxVal;
        }
        return headCoord + GRID_SIZE * direction;
    }

    /**
     * Move the snake to the next grid cell
     */
    move() {
        // Create a new head, remove the last segment...nothing else needs to move
        const headX = this.#calculateCoordinate(this.#segments[0].x(), canvas.width, this.#directionX);
        const headY = this.#calculateCoordinate(this.#segments[0].y(), canvas.height, this.#directionY);
        const head = new Coord(headX, headY);
        this.#segments.pop();
        this.#segments.unshift(head);
    }

    /**
     * Draw the snake
     */
    draw() {
        ctx.fillStyle = "deepskyblue";
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        for (let seg of this.#segments) {
            ctx.rect(seg.x(), seg.y(), GRID_SIZE, GRID_SIZE);
        }
        ctx.fill();
        ctx.stroke();
    }
}

class Food extends Coord {
    /**
     * Creates a new food at a random location
     */
    constructor() {
        const randomCoord = max => Math.floor(Math.random() * max / 20) * 20;
        super(randomCoord(canvas.width), randomCoord(canvas.height));
    }
    
    /**
     * Draw the food
     */
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "#ff8c00";
        ctx.arc(this.x() + GRID_SIZE / 2, this.y() + GRID_SIZE / 2, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const snake = new Snake();
let food = new Food();
snake.draw();

setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food.draw();
    snake.move();
    snake.draw();
    if (snake.isOverFood(food)) {
        snake.eat();
        food = new Food();
    }
}, 300);

document.addEventListener("keydown", function (event) {
    snake.setDirection(event.key);
})