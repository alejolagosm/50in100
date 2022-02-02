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
// Project 47: Testimonials
if (document.querySelector(".project-47") != null) {
  const testimonial_container = document.querySelector(
    ".testimonials_container"
  );

  // API URLs
  const API_URL = "https://randomuser.me/api?results=5";
  // const TEST_API_URL = "https://litipsum.com/api/5/json";
  const TEST_API_URL = "http://loremricksum.com/api/?paragraphs=4&words=4";

  let users,
    tests = [];
  let currentUser = 0;
  async function getData() {
    try {
      const res = await fetch(API_URL);
      const res_2 = await fetch(TEST_API_URL);
      const data = await res.json();
      const data_2 = await res_2.json();
      users = data.results;
      tests = data_2.data;
      createTestimonial();
    } catch (err) {
      console.log(err);
    }
  }

  getData();

  function createTestimonial() {
    testimonial_container.innerHTML = `
    <div class="progress_bar"></div>
        <div class="testimony">
    <i class="fas fa-quote-left"></i>
    <p class="testimony_text">
      ${tests[currentUser]?.slice(0, 150)}
    </p>
    <i class="fas fa-quote-right"></i>
  </div>
  <div class="profile">
    <img
      class="profile_img"
      src="${users[currentUser].picture.medium}"
      alt="Profile picture"
    />
    <div>
      <h3 class="profile_name">${
        users[currentUser].name.first + " " + users[currentUser].name.last
      }</h3>
      <h4 class="profile_location">${
        users[currentUser].location.state +
        ", " +
        users[currentUser].location.country
      }</h4>
    </div>
    `;
    currentUser++;
    setInterval(changes, 10000);
  }

  function changes() {
    const profile_testimony = document.querySelector(".testimony_text");
    const profile_img = document.querySelector(".profile_img");
    const profile_name = document.querySelector(".profile_name");
    const profile_location = document.querySelector(".profile_location");

    profile_testimony.innerText = tests[currentUser];
    profile_img.src = users[currentUser].picture.medium;
    profile_name.innerText =
      users[currentUser].name.first + " " + users[currentUser].name.last;
    profile_location.innerText =
      users[currentUser].location.state +
      ", " +
      users[currentUser].location.country;
    currentUser++;
    if (currentUser >= users.length) currentUser = 0;
  }
}

// ///////////////////////////////////////////////////////////////////////
// Project 48: Image Grid with Side Menu
if (document.querySelector(".project-48") != null) {
  const URL = "https://source.unsplash.com/random/";
  const grid = document.querySelector(".photo_grid");
  const imgQt = 9;

  function fillgrid() {
    grid.innerHTML = ``;
    for (let i = 0; i < imgQt; i++) {
      const img = document.createElement("img");
      img.src = `${URL}${getRandSize()}`;
      grid.appendChild(img);
    }
  }
  fillgrid();

  function getRandSize() {
    return `${getRandomNr()}x${getRandomNr()}`;
  }
  function getRandomNr() {
    return Math.floor(Math.random() * 30) + 300;
  }

  const openBtn = document.querySelector(".open-btn");
  const closeBtn = document.querySelector(".close-btn");
  const toolsNav = document.querySelectorAll(".tools_nav");

  openBtn.addEventListener("click", () => {
    toolsNav.forEach((nav) => nav.classList.add("visible"));
  });
  closeBtn.addEventListener("click", () => {
    toolsNav.forEach((nav) => nav.classList.remove("visible"));
  });

  // Functionality pending to implement, make the other list options available with the picsum API
  // Alternate API to get other images
  // let images = [];
  // const API_URL = "https://picsum.photos/v2/list?page=1&limit=9&blur=2";
  // async function getData(url) {
  //   try {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     images = data;
  //     console.log(images);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // getData();
}

// ///////////////////////////////////////////////////////////////////////
// Project 49: To do list
if (document.querySelector(".project-49") != null) {
  const form = document.getElementById("form");
  const task_pending = document.querySelector(".task_pending");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task_name = e.target.task_name.value;
    if (task_name) {
      addTask(task_name, e.target.level.value);
    }
  });

  function addTask(name, level = "Easy") {
    const task = document.createElement("div");
    task.classList.add("task");
    task.classList.add("pending");
    const level_text = level.charAt(0).toUpperCase() + level.slice(1);
    task.innerHTML = `
    <div class="task_info">
    <h4>${name}</h4>
    <p class="level ${level.toLowerCase()}">${level_text}</p>
    </div>
    <button class="toDo">
      <i class="far fa-check-circle"></i>
    </button>
    `;
    task_pending.appendChild(task);
  }

  const pendingTasks = document.querySelector(".task_pending");
  const doneTasks = document.querySelector(".task_made");

  pendingTasks.addEventListener("click", (e) => {
    let btn = e.target.closest(".toDo");
    console.log(btn);
    if (btn) {
      btn.classList.remove("toDo");
      btn.classList.add("done");
      btn.innerHTML = `<i class="fas fa-undo"></i>`;
      const task = btn.closest(".task");
      task.classList.remove("pending");
      doneTasks.appendChild(task);
    }
  });

  doneTasks.addEventListener("click", (e) => {
    let btn = e.target.closest(".done");
    console.log(btn);
    if (btn) {
      btn.classList.add("toDo");
      btn.classList.remove("done");
      btn.innerHTML = `<i class="far fa-check-circle"></i>`;
      const task = btn.closest(".task");
      task.classList.add("pending");
      pendingTasks.appendChild(task);
    }
  });
}
