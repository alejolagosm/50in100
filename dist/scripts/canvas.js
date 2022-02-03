// Navigation Hamburger Menu Functionality
const burger = document.querySelector("#burger");
const menu = document.querySelector("#menu");

burger.addEventListener("click", () => {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
  }
});

const sizes = [5, 10, 20, 30, 40, 50];

const erase = document.getElementById("erase");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const sizeTxt = document.getElementById("size");
const colorBtn = document.getElementById("color");
// Using the canvas API
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

let isPressed = false;

let color = colorBtn.value;
let size = +sizeTxt.innerText;
let x, y;

function updateValues() {
  color = colorBtn.value;
  size = +sizeTxt.innerText;
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.stroke();
}

canvas.addEventListener("mousedown", (e) => {
  updateValues();
  isPressed = true;
  x = e.clientX;
  y = e.offsetY;
  drawCircle(x, y);
  console.log(ctx);
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    updateValues();
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

increase.addEventListener("click", () => {
  if (+sizeTxt.innerText < +Math.max(...sizes)) {
    sizeTxt.innerText = sizes.filter((s) => s > +sizeTxt.innerText)[0];
  }
});

decrease.addEventListener("click", () => {
  if (+sizeTxt.innerText > +Math.min(...sizes)) {
    sizeTxt.innerText = sizes.filter((s) => s < +sizeTxt.innerText).slice(-1);
  }
});

erase.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
