let numSquares = 50;
const moreContent = document.getElementById("more-content");
for (let i = 0; i < numSquares; i++) {
    //document.getElementById("more-content").innerHTML += '<div class="more-item"></div>';
    const newSquare = document.createElement("div");
    newSquare.classList.add("more-item");
    moreContent.appendChild(newSquare);
}