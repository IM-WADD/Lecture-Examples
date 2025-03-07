const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
let count1 = 0;
let count2 = 0;


function addClick(event) {
    console.log(event.target.id, "button clicked at", event.timeStamp);
    if (event.target.id === "btn1") {
        count1++;
        document.getElementById("count1").innerText = count1;
    } else {
        count2++;
        document.getElementById("count2").innerText = count2;
    }
}

btn1.addEventListener("click", addClick);
btn2.addEventListener("click", addClick);