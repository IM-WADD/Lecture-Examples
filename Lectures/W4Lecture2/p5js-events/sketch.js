let bg;
let circleFill;
let btn;

function setup() {
    createCanvas(600, 400);
    bg = color(random(255), random(255), random(255));
    circleFill = color(random(255), random(255), random(255));
    btn = createButton("Click Me!");
    const body = select("body");
    btn.parent(body);
    btn.size(600, 40);
    btn.position(0, 0, 'relative');
    btn.mouseClicked(eventHandler);
}

function draw() {
    background(bg);
    fill(circleFill);
    circle(width / 2, height / 2, 300);
}

function mouseClicked() {
    bg = color(random(255), random(255), random(255));
}

function eventHandler() {
    circleFill = color(random(255), random(255), random(255));
}

