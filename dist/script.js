// Project 1: Slider Cards

const panels_1 = document.querySelectorAll(".panel");

panels_1.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClass();
    panel.classList.add("active");
  });
});

function removeActiveClass() {
  panels_1.forEach((panel) => {
    panel.classList.remove("active");
  });
}

// Project 2: Progress Steps
const progress_2 = document.getElementById("progress");
const prev_2 = document.getElementById("prev");
const next_2 = document.getElementById("next");
const circles_2 = document.querySelectorAll(".circle");

let currentActive = 1;

next_2.addEventListener("click", () => {
  currentActive++;

  if (currentActive > circles_2.length) {
    currentActive = circles_2.length;
  }
  update();
  console.log(currentActive);
});

prev_2.addEventListener("click", () => {
  currentActive--;

  if (currentActive < 1) {
    currentActive = 1;
  }
  update();
  console.log(currentActive);
});

function update() {
  circles_2.forEach((circle, index) => {
    if (index < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const actives = document.querySelectorAll(".active");
  progress_2.style.width =
    ((actives.length - 1) / (circles_2.length - 1)) * 100 + "%";

  if (currentActive === 1) {
    prev_2.disabled = true;
  } else if (currentActive === circles_2.length) {
    next_2.disabled = true;
  } else {
    next_2.disabled = false;
    prev_2.disabled = false;
  }
}
