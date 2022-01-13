// Javascript for projects 1 to 5

// Project 1: Slider Cards
// Selecting Elements
const panels_1 = document.querySelectorAll(".panel");
// Adding the event listener functionality to each panel
panels_1.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClass();
    panel.classList.add("active");
  });
});

// Function to remove the classes
function removeActiveClass() {
  panels_1.forEach((panel) => {
    panel.classList.remove("active");
  });
}

// Project 2: Progress Steps
if (document.querySelector(".project-2") != null) {
  // Selecting Elements
  const progress_2 = document.getElementById("progress");
  const prev_2 = document.getElementById("prev");
  const next_2 = document.getElementById("next");
  const circles_2 = document.querySelectorAll(".circle");
  // Index to define current step
  let currentActive = 1;
  // Adding functionalities to the buttons
  next_2.addEventListener("click", () => {
    currentActive++;
    if (currentActive > circles_2.length) {
      currentActive = circles_2.length;
    }
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
}

// Project 3: Rotating Navigation
if (document.querySelector(".project-3") != null) {
  // Selecting DOM elements
  const open_3 = document.getElementById("open-3");
  const close_3 = document.getElementById("close-3");
  const container_3 = document.querySelector(".container-3");
  // Adding the functionality to the buttons, to add and remove CSS Classes
  open_3.addEventListener("click", () => {
    container_3.classList.add("show-nav");
    console.log("Hello");
  });
  close_3.addEventListener("click", () =>
    container_3.classList.remove("show-nav")
  );
}
