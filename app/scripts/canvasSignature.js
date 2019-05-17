const canvas = document.querySelector("#zoneSignature");
const ctx = canvas.getContext("2d");

canvas.width = canvas.parentNode.clientWidth;
canvas.height = 100;

ctx.strockStyle = "#000";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 2;
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(x, y) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y]
}

function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}