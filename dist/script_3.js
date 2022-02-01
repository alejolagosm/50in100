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
// Project 27: Double Vertical Slider
if (document.querySelector(".project-27") != null) {
  const btnUp = document.getElementById("btnUp");
  const btnDown = document.getElementById("btnDown");
  const images = document.querySelectorAll(".image");
  const images_desc = document.querySelectorAll(".img_desc");
  currentImg = 0;
  btnUp.addEventListener("click", (e) => {
    const next = currentImg == images.length - 1 ? 0 : currentImg + 1;
    console.log(currentImg, next);
    images_desc[currentImg].style.top = "-200%";
    images[currentImg].style.top = "200%";
    images_desc[next].style.top = "50%";
    images[next].style.top = "50%";
    currentImg = currentImg >= images.length - 1 ? 0 : currentImg + 1;
    console.log();
  });
  btnDown.addEventListener("click", (e) => {
    const prev = currentImg == images.length - 1 ? 0 : currentImg + 1;
    console.log(currentImg, prev);
    images_desc[currentImg].style.top = "200%";
    images[currentImg].style.top = "-200%";
    images_desc[prev].style.top = "50%";
    images[prev].style.top = "50%";
    currentImg = currentImg >= images.length - 1 ? 0 : currentImg + 1;
  });
}

// ////////////////////////////////////////////////////////////////////////////
// Project 28: Rest Stop
if (document.querySelector(".project-28") != null) {
  const notifBtn = document.getElementById("btnNotif");
  const notifications = document.getElementById("notifications");
  const pikachu = document.getElementById("pikachu");

  notifBtn.addEventListener("click", () => {
    createNotif();
  });

  messages = [
    "Hello!",
    "嗨!",
    "Salut!",
    "Hola!",
    "Privet!",
    "Ciao!",
    "こんにちは!",
  ];

  function createNotif() {
    const notif = document.createElement("div");
    notif.classList.add("not_popup-child");
    notif.innerText = getRandomElement(messages);
    notif.style.top = `${Math.floor(Math.random() * 70) + 20}%`;
    notif.style.right = `${Math.floor(Math.random() * 20) + 15}%`;
    pikachu.style.bottom = `${Math.floor(Math.random() * 70) + 20}%`;
    pikachu.style.left = `${Math.floor(Math.random() * 30) + 15}%`;
    notifications.appendChild(notif);
    pikachu.classList.remove("hidden");

    setTimeout(() => {
      notif.remove();
      pikachu.classList.add("hidden");
    }, 500);
  }

  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

// ////////////////////////////////////////////////////////////////////////////
// Project 30: Marvel Characters
if (document.querySelector(".project-30") != null) {
  const API_KEY = "9406ae321660315cb639b4d5a0827260";
  const search = document.getElementById("search");
  const form = document.getElementById("form");
  const project = document.getElementById("project");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    removeCards();
    const searchQuery = search.value;
    getInfo(searchQuery);
  });

  function removeCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.remove());
  }

  async function getInfo(character) {
    try {
      const res = await fetch(
        `http://gateway.marvel.com/v1/public/characters?&nameStartsWith=${character}&apikey=${API_KEY}`
      );
      const json = await res.json();
      if (json.data.results.length == 0) {
        throw error;
      }
      updateCharacters(json.data.results);
    } catch (err) {
      showerror();
    }
  }

  function updateCharacters(characters) {
    for (const character of characters) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          <div class="picture">
            <img src="${character.thumbnail.path}.${
        character.thumbnail.extension
      }" alt="Character Picture" />
          </div>
          <div class="info">
            <h2>${character.name}</h2>
            <p>
            ${character.description.slice(0, 100)}
            </p>
            <div class="statistics">
            ${character.comics?.items[0]?.name || "No comics found"}
            </div>
            <div class="specials">
              <div>${
                character.stories?.items[0]?.name || "No stories found"
              }</div>
            </div>
          </div>
      `;
      project.appendChild(card);
    }
  }

  function showerror() {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
          <h2>Sorry</h2>
          <p>Couldn´t find a character with that name</p>
          <h3>Try again!</h3> 
      `;
    card.style.flexDirection = "column";
    project.appendChild(card);
  }
}

// get disney Characters
// async function getMonster() {
//   try {
//     const res = await fetch("https://api.disneyapi.dev/characters?page=2");
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }
