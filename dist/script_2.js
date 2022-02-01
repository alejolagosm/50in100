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

// Javascript for projects 11 to 20

// ////////////////////////////////////////////////////////////////////////////
// Project 11-a: Sounds
if (document.querySelector(".project-11-a") != null) {
  // The array for the sounds
  const sounds = ["applause", "boo", "gasp", "tada", "victory", "wrong"];
  // This function stops all the sounds playing at the moment
  function stopSounds() {
    sounds.forEach((sound) => {
      const audio_tm = document.getElementById(sound);
      audio_tm.pause();
      audio_tm.currentTime = 0;
    });
  }
  // This loop creates the buttons and adds all the functionality for the sound
  sounds.forEach((sound) => {
    const btn = document.createElement("button");
    btn.classList.add("btn-medium");
    btn.innerText = sound;
    btn.addEventListener("click", () => {
      stopSounds();
      document.getElementById(sound).play();
    });
    document.getElementById("buttons").appendChild(btn);
  });
}

// Project 11-b: Key Codes
if (document.querySelector(".project-11") != null) {
  const insert = document.getElementById("insert");
  window.addEventListener("keydown", (e) => {
    console.log(e);
    insert.innerHTML = `<div class="key">
    ${e.key == " " ? "Space" : e.key}
    <small>event.key</small>
  </div>
  <div class="key">
  ${e.keyCode}
    <small>event.keyCode</small>
  </div>
  <div class="key">
  ${e.code}
    <small>event.code</small>
  </div>`;
  });
}

// ////////////////////////////////////////////////////////////////////////////
// Project 13: Accordion
if (document.querySelector(".project-13") != null) {
  const btntoggle = document.querySelectorAll(".faq-toggle");
  const faq = document.querySelectorAll(".faq");

  btntoggle.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      current = false;
      if (e.target.closest(".faq").classList.contains("active")) {
        current = true;
      }
      faq.forEach((div) => div.classList.remove("active"));
      if (!current) {
        e.target.closest(".faq").classList.toggle("active");
      }
      console.log("hello");
    });
  });
}

// /////////////////////////////////////////////////////////////////////////////
// Project 14: Random chooUser
if (document.querySelector(".project-14") != null) {
  const inputs = document.getElementById("inputChoices");
  const choices = document.querySelector(".choices");
  const btn = document.getElementById("selector");

  let i = false;
  inputs.addEventListener("input", (value) => {
    const inputArray = inputs.value.split(",");
    createEl(inputArray);
  });

  function createEl(inputs = []) {
    const inpArr = [];
    inputs.forEach((choice) => {
      if (choice.length >= 1) {
        const div = document.createElement("div");
        div.innerText = choice;
        div.classList.add("choice");
        inpArr.push(div);
      }
    });
    choices.innerHTML = "";
    inpArr.forEach((div) => choices.appendChild(div));
  }

  btn.addEventListener("click", randSelection);

  function randSelection() {
    if (!choices.innerHTML) return;
    i = 0;
    var x = setInterval(() => {
      if (i == 0) {
        choices.lastElementChild.classList.remove("active");
      } else {
        choices.children[i - 1].classList.remove("active");
      }
      choices.children[i].classList.add("active");
      i++;
      if (i > choices.children.length - 1) i = 0;
    }, 50);

    setTimeout(() => {
      clearInterval(x);
      chooserandom();
    }, 2000);
  }

  function chooserandom() {
    [...choices.children].forEach((div) => div.classList.remove("active"));
    randomChoice =
      choices.children[Math.floor(Math.random() * choices.children.length)];
    randomChoice.classList.add("active");
  }
}

// ////////////////////////////////////////////////////////////////////////////
// Project 16: Increment Counters
if (document.querySelector(".project-16") != null) {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const limit = counter.dataset.countto;
    const increment = limit / 250;
    let count = 0;
    counter.innerText = 0;

    let int = setInterval(() => {
      count += increment;
      counter.innerText = count;
      if (count >= limit) {
        clearInterval(int);
      }
    }, 1);
  });
}

// ////////////////////////////////////////////////////////////////////////////
// Project 17: Animated beer measures transformation
if (document.querySelector(".project-17") != null) {
  const beerSizes = [140, 285, 425, 470, 570, 1140];
  const measure = document.getElementById("measure");
  const size = document.getElementById("size");
  const liquid = document.getElementById("liquid");
  function changeBeerContainer() {
    document.querySelector(".beer-content").classList.add("active");
    const w1 = Math.sqrt(beerSizes[size.value - 1] / 1.25) * 10;
    const h1 = Math.min(
      (100 * beerSizes[measure.value - 1]) / beerSizes[size.value - 1],
      100
    );
    const h2 =
      measure.value > size.value
        ? Math.sqrt(
            (beerSizes[measure.value - 1] - beerSizes[size.value - 1]) / 4.5
          ) * 10
        : 0;
    document.querySelector(".project-17").style.setProperty("--w1", `${w1}px`);
    document.querySelector(".project-17").style.setProperty("--h1", `${h1}%`);
    document.querySelector(".project-17").style.setProperty("--h2", `${h2}%`);
    liquid.innerText = (
      beerSizes[measure.value - 1] / beerSizes[size.value - 1]
    ).toFixed(2);
  }
}

// ////////////////////////////////////////////////////////////////////////////
// Project 19: Background Slider
if (document.querySelector(".project-19") != null) {
  const project = document.querySelector(".project-19");
  const slides = document.querySelectorAll(".slide");
  const leftBtn = document.querySelector(".arrow-left");
  const rightBtn = document.querySelector(".arrow-right");

  let activeSlide = 0;

  setBgtoPj();
  function setBgtoPj() {
    project.style.backgroundImage = slides[activeSlide].style.backgroundImage;
  }

  function setActiveSlide() {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    slides[activeSlide].classList.add("active");
  }

  leftBtn.addEventListener("click", () => {
    activeSlide--;
    if (activeSlide < 0) {
      activeSlide = slides.length;
    }
    setBgtoPj();
    setActiveSlide();
  });

  rightBtn.addEventListener("click", () => {
    activeSlide++;
    if (activeSlide > slides.length - 1) {
      activeSlide = 0;
    }
    setBgtoPj();
    setActiveSlide();
  });
}

// ////////////////////////////////////////////////////////////////////////////
// Project 20: SVG Clock
if (document.querySelector(".project-20") != null) {
  const hoursEl = document.querySelector(".hour");
  const minutesEl = document.querySelector(".minute");
  const secondsEl = document.querySelector(".second");
  const hoursNum = document.querySelector(".hour_num");
  const minutesNum = document.querySelector(".minutes_num");
  const secondsNum = document.querySelector(".seconds_num");
  const dayNum = document.querySelector(".day");
  const monthNum = document.querySelector(".month");
  const yearNum = document.querySelector(".year");

  function moveClock() {
    const date = new Date();

    const day = date.getUTCDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    hoursEl.setAttribute("transform", `rotate(${(360 / 12) * hour})`);
    minutesEl.setAttribute("transform", `rotate(${(360 / 60) * minute})`);
    secondsEl.setAttribute("transform", `rotate(${(360 / 60) * second})`);
    secondsNum.innerText = second;
    minutesNum.innerText = minute;
    hoursNum.innerText = hour;
    dayNum.innerText = day;
    monthNum.innerText = month < 10 ? "0" + month : month;
    yearNum.innerText = year;

    setTimeout(() => {
      requestAnimationFrame(moveClock);
    }, 1000);
  }

  requestAnimationFrame(moveClock);
}
