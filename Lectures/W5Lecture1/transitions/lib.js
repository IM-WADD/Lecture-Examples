const btn = document.getElementsByTagName("button")[0];
const imgHolder = document.getElementById("button-holder");

btn.addEventListener("click", function () {
    const classes = imgHolder.classList;
    if (classes.contains("open")) {
        // Hide the image
        imgHolder.classList.remove("open");
    }
    else {
        // Show the image
        imgHolder.classList.add("open");
    }
});