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

// ///////////////////////////////////////////////////////////////////////////
// Project 2: Progress Steps
// DOM Elements
const scales = document.querySelectorAll(".scale");
const question = document.getElementById("question");
const submit = document.getElementById("submit");
const questArr = [
  "How satisfied are you with your current website?",
  "How satisfied are you with your current sales level?",
  "How happy are you with the evolution of your business?",
  "How excited are you to be working together?",
];
const progress_2 = document.getElementById("progress");
const prev_2 = document.getElementById("prev");
const next_2 = document.getElementById("next");
const circles_2 = document.querySelectorAll(".circle");

// Index to define current step
let currentActive = 1;

// Functionality to answer the poll
scales.forEach((scale) => {
  scale.addEventListener("click", () => {
    deactivateScales();
    scale.classList.add("rated");
  });
});

// Removing previous answers
function deactivateScales() {
  scales.forEach((scale) => {
    scale.classList.remove("rated");
  });
}

// Adding functionalities to the buttons
next_2.addEventListener("click", () => {
  currentActive++;
  if (currentActive > circles_2.length) {
    currentActive = circles_2.length;
  }
  question.innerText = questArr[currentActive - 1];
  update();
});
prev_2.addEventListener("click", () => {
  currentActive--;
  if (currentActive < 1) {
    currentActive = 1;
  }
  update();
});

// Function to update the loading bar and the circle border
function update() {
  deactivateScales();
  scales[scales.length - 1].classList.add("rated");
  circles_2.forEach((circle, index) => {
    if (index < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });
  const actives = document.querySelectorAll(".active");
  progress_2.style.width =
    ((actives.length - 1) / (circles_2.length - 1)) * 99 + "%";
  if (currentActive === 1) {
    prev_2.disabled = true;
    submit.disabled = true;
  } else if (currentActive === circles_2.length) {
    next_2.disabled = true;
    submit.disabled = false;
  } else {
    next_2.disabled = false;
    prev_2.disabled = false;
    submit.disabled = true;
  }
}

// Submit button functionality
submit.addEventListener("click", () => {
  const progress_cont = document.querySelector(".progress-container");
  const feeback_cont = document.querySelector(".feedback-container");
  progress_cont.style.display = "none";
  prev_2.style.display = "none";
  next_2.style.display = "none";
  submit.style.display = "none";
  feeback_cont.innerHTML = `
          <div class="scales">
            <div class="scale">
              <span>💖</span>
              <p>Thank you!</p>
            </div>
          </div>
          <p>Your feedback is very important to me</p>
      `;
});
