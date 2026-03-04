const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
let count1 = 0;
let count2 = 0;

function addClick(event) {
    const textID = event.target.id.replace("btn", "count");
    if (event.target.id === "btn1") {
        count1++;
        document.getElementById(textID).innerText = count1;
    } else {
        count2++;
        document.getElementById(textID).innerText = count2;
    }

}

btn1.addEventListener("click", addClick);
btn2.addEventListener("click", addClick);