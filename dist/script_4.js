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

// Javascript for projects 32 to 40

// ///////////////////////////////////////////////////////////////////////
// Project 32: Auto Typing random advice
if (document.querySelector(".project-32") != null) {
  const project = document.getElementById("project_32");
  const textEl = document.getElementById("text");
  const speedEl = document.getElementById("speed");

  let text = "Happiness is only real when shared";

  let idx = 1;
  let speed = 300 / speedEl.value;
  let reverse = false;
  let nextmessage = "";

  function writeText() {
    const hue = parseFloat(getComputedStyle(project).getPropertyValue("--hue"));

    if (idx == 1) {
      getAdvice();
      speed = 300 / speedEl.value;
    }
    textEl.innerText = text.slice(0, idx);
    idx++;
    project.style.setProperty("--hue", hue + idx);
    if (idx > text.length) {
      reverse = true;
      text = nextmessage;
      idx = 1;
      speed = 2000;
    }

    setTimeout(writeText, speed);
  }

  writeText();
  speedEl.addEventListener("input", (e) => (speed = 300 / e.target.value));

  async function getAdvice() {
    try {
      const data = await fetch("https://api.adviceslip.com/advice");
      const res = await data.json();
      nextmessage = res.slip.advice;
      console.log(nextmessage);
    } catch (err) {
      return "Sorry, something is wrong";
    }
  }
}

// ///////////////////////////////////////////////////////////////////////
// Project 33:
if (document.querySelector(".project-33") != null) {
}

// ///////////////////////////////////////////////////////////////////////
// Project 3:
if (document.querySelector(".project-3") != null) {
}
