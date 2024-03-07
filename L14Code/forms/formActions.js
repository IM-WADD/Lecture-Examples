const regularBtn = document.getElementById("btn");
const submitBtn = document.getElementById("submit");

function submitClicked(event) {
    event.preventDefault();
    console.log(event.target.id + " clicked at ", event.timeStamp);
    window.scrollTo(0, 0); // scrolls the window to the top
}

submitBtn.addEventListener("click", submitClicked);

regularBtn.addEventListener("click", function (event) {
    console.log(event.target.id + " clicked!", event);
})