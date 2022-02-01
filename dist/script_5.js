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
// Project 45: Sunrise Slider
if (document.querySelector(".project-45") != null) {
  const pj_cont = document.querySelector(".project-45");
  const range = document.getElementById("range");
  range.addEventListener("input", (e) => {
    const value = e.target.value;
    const label = e.target.nextElementSibling;
    const rangeWidth = +getComputedStyle(e.target)
      .getPropertyValue("width")
      .slice(0, -2);
    const labelWidth = +getComputedStyle(label)
      .getPropertyValue("width")
      .slice(0, -2);

    const max = +e.target.max;
    const min = +e.target.min;

    const left =
      value * (rangeWidth / max) -
      labelWidth / 2 +
      scaleRange(value, min, max, 10, -10);
    label.innerHTML = `5:${
      Math.round(scaleRange(value, min, max, 0, 59), 0) < 10
        ? "0" + Math.round(scaleRange(value, min, max, 0, 59), 0)
        : Math.round(scaleRange(value, min, max, 0, 59), 0)
    } AM`;
    label.style.left = `${left}px`;
    pj_cont.style.backgroundImage = `linear-gradient(
      to top,
      #58151a ,
      #bc2909,
      #ba6d09,
      #71a8ee ${value}%,
      #3072eb,
      #1552c6,
      #0542a8 100%
    )`;
  });

  // This is to map an interval of numbers to a different set of values
  function scaleRange(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
}

// ///////////////////////////////////////////////////////////////////////
// Project 46:
if (document.querySelector(".project-46") != null) {
}
