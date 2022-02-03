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
