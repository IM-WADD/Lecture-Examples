import { getLuckyNumber } from "./lib.js";
function showLuckyNumber() {
    const p = document.createElement("p");
    p.innerText = `Your lucky number is ${getLuckyNumber()}`;
    document.body.appendChild(p);
}

showLuckyNumber();