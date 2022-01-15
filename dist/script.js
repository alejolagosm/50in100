// Javascript for projects 1 to 5

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
  });
  close_3.addEventListener("click", () =>
    container_3.classList.remove("show-nav")
  );
}

// Project 4: Hidden Search
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

// Project 5: Blurring efect
if (document.querySelector(".project-5") != null) {
  // Selecting DOM elements
  const loadText = document.querySelector(".loading-text");
  const bg = document.querySelector(".bg");
  const btn = document.querySelector("#loader");
  let load;
  let int = setInterval(0);
  // Adding the functionality to the button, to add and remove CSS Classes
  btn.addEventListener("click", () => {
    load = 0;
    btn.style.visibility = `hidden`;
    int = setInterval(blurring, 30);
  });

  // This is to map an interval of numbers to a different set of values
  function scalerange(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }

  // This functions blurs the text and unblurs the image
  function blurring() {
    load++;
    if (load === 100) {
      setTimeout(function () {
        clearInterval(int);
        btn.style.visibility = `visible`;
        bg.style.filter = `blur(70px)`;
      }, 2000);
    }
    if ((load % 10 === 0) & (load < 100)) loadText.innerText = `${load}%`;
    loadText.style.opacity = scalerange(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scalerange(load, 0, 100, 70, 0)}px`;
  }
}

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

// Project 9: Sounds
if (document.querySelector(".project-9") != null) {
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

if (document.querySelector(".project-10") != null) {
  const jokeEl = document.getElementById("joke");
  const jokeBtn = document.getElementById("jokeBtn");

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  // fetch.then option
  // function generateJoke() {
  //   fetch("https://icanhazdadjoke.com/", config)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       jokeEl.innerText = data.joke;
  //     });
  // }

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
