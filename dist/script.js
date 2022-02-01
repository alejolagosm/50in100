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

// Javascript for projects 1 to 10
// Project 1: Slider Cards
if (document.querySelector(".project-1") != null) {
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
}

// ///////////////////////////////////////////////////////////////////////////
// Project 3: Rotating Navigation
if (document.querySelector(".project-3") != null) {
  // Selecting DOM elements
  const open_3 = document.getElementById("open-3");
  const close_3 = document.getElementById("close-3");
  const container_3 = document.querySelector(".container-3");
  // Adding the functionality to the buttons, to add and remove CSS Classes
  open_3.addEventListener("click", () => {
    container_3.classList.add("show-nav");
  });
  close_3.addEventListener("click", () =>
    container_3.classList.remove("show-nav")
  );
}

// ////////////////////////////////////////////////////////////////////////////
// Project 4a: Animated Navigation
if (document.querySelector(".project-4a") != null) {
  const btn = document.querySelector(".closer");
  const nav = document.querySelector(".nav");
  btn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// Project 4b: Hidden Search
if (document.querySelector(".project-4") != null) {
  // Selecting DOM elements
  const search = document.querySelector(".search");
  const btn = document.querySelector(".btn");
  const input = document.querySelector(".input");
  // Adding the functionality to the button, to add and remove CSS Classes
  btn.addEventListener("click", () => {
    search.classList.toggle("active");
    input.focus();
  });
}

// ///////////////////////////////////////////////////////////////////////////
// Project 5: Blurring efect
if (document.querySelector(".project-5") != null) {
  // Selecting DOM elements
  const loadText = document.querySelector(".loading-text");
  const bg = document.querySelector(".bg");
  const btn = document.querySelector("#loader");
  let bg_image = "";
  let load;
  let int = setInterval(0);
  // Adding the functionality to the button, to add and remove CSS Classes
  btn.addEventListener("click", () => {
    load = 0;
    loadText.innerText = "0%";
    btn.style.visibility = `hidden`;
    getDogPic();
    int = setInterval(blurring, 30);
    bg.style.background = `${bg_image}`;
  });

  // This is to map an interval of numbers to a different set of values
  function scalerange(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }

  async function getDogPic() {
    const data = await fetch("https://dog.ceo/api/breeds/image/random");
    const res = await data.json();
    bg_image = `url("${res.message}") no-repeat center center`;
  }
  // This functions blurs the text and unblurs the image
  function blurring() {
    load++;
    if (load === 100) {
      setTimeout(function () {
        clearInterval(int);
        btn.innerText = "Click again for more cuteness";
        btn.style.visibility = `visible`;
        bg.style.filter = `blur(70px)`;
      }, 2000);
    }
    if ((load % 10 === 0) & (load <= 100)) loadText.innerText = `${load}%`;
    loadText.style.opacity = scalerange(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scalerange(load, 0, 100, 70, 0)}px`;
  }
}

// ///////////////////////////////////////////////////////////////////////////
// Project 6: Scroll Animation
if (document.querySelector(".project-6") != null) {
  // Selecting DOM elements
  const boxes = document.querySelectorAll(".box");

  function checkBoxes() {
    const trigger = (window.innerHeight / 5) * 4;

    boxes.forEach((box) => {
      const boxtop = box.getBoundingClientRect().top;
      if (boxtop < trigger) {
        box.classList.add("show");
      } else {
        box.classList.remove("show");
      }
    });
  }
  //This is called initially to show that should appear right away
  checkBoxes();
  // Adding the functionality to the button, to add and remove CSS Classes
  window.addEventListener("scroll", checkBoxes);
}

// ///////////////////////////////////////////////////////////////////////////
// Project 7: Split landing
if (document.querySelector(".project-7") != null) {
  // Selecting DOM elements
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const container = document.querySelector(".project-7");
  // Adding the functionality to the buttons, to add and remove CSS Classes
  events(left, "hover-left");
  events(right, "hover-right");

  function events(btn, hover_pos) {
    btn.addEventListener("mouseenter", () => {
      container.classList.add(`${hover_pos}`);
    });
    btn.addEventListener("mouseleave", () => {
      container.classList.remove(`${hover_pos}`);
    });
  }
}

// ///////////////////////////////////////////////////////////////////////////
// Project 10: DadJokes
if (document.querySelector(".project-10") != null) {
  const jokeEl = document.getElementById("joke");
  const jokeBtn = document.getElementById("jokeBtn");

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  // async await option
  async function generateJoke() {
    const res = await fetch("https://icanhazdadjoke.com/", config);
    const data = await res.json();
    jokeEl.innerText = data.joke;
  }

  jokeBtn.addEventListener("click", () => {
    generateJoke();
  });
}
