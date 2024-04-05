let bgColour;

function setup() {
    bgColour = color(220, 220, 0);
    createCanvas(400, 400);
    noStroke();
}

function draw() {
    background(bgColour);
    if (mouseIsPressed) {
        fill(0, 255, 255);
    } else {
        fill(255);
    }
    circle(mouseX, mouseY, 80);
}

document.getElementById("colour-change").addEventListener("click", function () {
    bgColour = color(Math.random() * 255, Math.random() * 255, Math.random() * 255)
})