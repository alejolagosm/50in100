// Navigation Media Query hidden
const burger = document.querySelector("#burger");
const menu = document.querySelector("#menu");

burger.addEventListener("click", () => {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
  }
});

// Javascript for projects 41 to 50
// ///////////////////////////////////////////////////////////////////////
// Project 41: Password Strength
if (document.querySelector(".project-41") != null) {
  const video = document.getElementById("video");
  const form_container = document.getElementById("form_cont");
  const form = document.getElementById("form");
  const password = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  password.addEventListener("input", () => {
    console.log(password.value.length);
    let length = +password.value.length;
    if (length > 8) {
      form_container.style.backgroundColor = `rgba(24, 135, 43,${scaleRange(
        length,
        8,
        15,
        0.5,
        1.0
      )})`;
    } else {
      form_container.style.backgroundColor = `rgba(255, 34, 34,${scaleRange(
        length,
        0,
        8,
        1,
        0.5
      )})`;
    }
    video.style.opacity = `${scaleRange(length, 0, 15, 0, 1.0)}`;
  });

  // This is to map an interval of numbers to a different set of values
  function scaleRange(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
}

// ///////////////////////////////////////////////////////////////////////
// Project 42:Fun with 3D
if (document.querySelector(".project-42") != null) {
  const grid = document.querySelector(".grid");
  const btnTrick = document.querySelector("#trick");
  const pokeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 27, 35, 37, 39, 52, 54];
  const pokemon = pokeArray[Math.floor(Math.random() * pokeArray.length)];
  const cellsQt = 16;

  for (let i = 0; i < cellsQt; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.backgroundImage = `url("img/${pokemon}.svg")`;
    cell.style.backgroundPosition = `${(i % 4) * -100}px ${
      ((i - (i % 4)) / 4) * -100
    }px`;
    grid.appendChild(cell);
  }

  btnTrick.addEventListener("click", () => {
    grid.classList.toggle("small");
    if (grid.classList.contains("small")) btnTrick.innerText = "Split them";
    if (!grid.classList.contains("small")) btnTrick.innerText = "Join them";
  });
}

// ///////////////////////////////////////////////////////////////////////
// Project 45:
if (document.querySelector(".project-45") != null) {
}
