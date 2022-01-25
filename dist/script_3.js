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

// Javascript for projects 22 to 30 (Except 25)

// ////////////////////////////////////////////////////////////////////////////
// Project 22: Fun with buttons
if (document.querySelector(".project-22") != null) {
  const btn_1 = document.querySelector(".btn_1");

  btn_1.addEventListener("click", (e) => {
    document.querySelector(".circle").classList.remove("animate");
    const x = e.clientX;
    const y = e.clientY;
    const btntop = e.target.closest(".btn_1").getBoundingClientRect().top;
    const btnleft = e.target.closest(".btn_1").getBoundingClientRect().left;
    const btnwidth = e.target.closest(".btn_1").getBoundingClientRect().width;
    const btnheight = e.target.closest(".btn_1").getBoundingClientRect().height;
    console.log(btnwidth, btnheight);
    btn_1.style.setProperty("--top", `${(100 * (y - btntop)) / btnheight}%`);
    btn_1.style.setProperty("--left", `${(100 * (x - btnleft)) / btnwidth}%`);
    document.querySelector(".circle").classList.add("animate");
  });

  const btn_6 = document.querySelector(".btn_6");
  const circle_6 = document.getElementById("circle_6");
  const text_6 = document.querySelector(".text_6");

  btn_6.addEventListener(
    "click",
    (e) => {
      btn_6.classList.toggle("active");
      text_6.classList.toggle("hidden");
      circle_6.classList.toggle("active");
    },
    { once: true }
  );
}

// ////////////////////////////////////////////////////////////////////////////
// Project 23: Canvas Drawing App
if (document.querySelector(".project-23") != null) {
  const sizes = [5, 10, 20, 30, 40, 50];

  const erase = document.getElementById("erase");
  const increase = document.getElementById("increase");
  const decrease = document.getElementById("decrease");
  const sizeTxt = document.getElementById("size");
  const colorBtn = document.getElementById("color");
  // Using the canvas API
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  console.log(sizeTxt.innerText, colorBtn.value);

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
    x = e.offsetX;
    y = e.offsetY;
    drawCircle(x, y);
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

  increase.addEventListener("click", (e) => {
    if (+sizeTxt.innerText < +Math.max(...sizes)) {
      sizeTxt.innerText = sizes.filter((s) => s > +sizeTxt.innerText)[0];
    }
  });

  decrease.addEventListener("click", (e) => {
    if (+sizeTxt.innerText > +Math.min(...sizes)) {
      sizeTxt.innerText = sizes.filter((s) => s < +sizeTxt.innerText).slice(-1);
    }
  });

  erase.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}

// ////////////////////////////////////////////////////////////////////////////
// Project 26: Placeholder Content Animation
