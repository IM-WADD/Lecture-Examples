
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#FFFF00"; 
ctx.fillStyle = "#00FFFF";
ctx.lineWidth = 3;

ctx.moveTo(200, 50);
ctx.lineTo(50, 250);
ctx.lineTo(350, 250);
ctx.lineTo(200, 50);

ctx.stroke();
ctx.fill();
