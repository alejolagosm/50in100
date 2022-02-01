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

// ///////////////////////////////////////////////////////////////////////
// Project 36: Welcome Animation
const playBtn = document.getElementById("playBtn");
const svgcontainer = document.querySelector(".container_2");
const paths = document.querySelectorAll(".path");
const numbers = document.querySelectorAll(".span");
const counter = document.querySelector(".counter");
const group = document.getElementById("group");
const colours = [
  chroma.scale([
    "#781d42",
    "#812341",
    "#8a2941",
    "#92303f",
    "#9a373e",
    "#a64741",
    "#b05645",
    "#ba6649",
    "#c98156",
    "#d79c66",
    "#e4b779",
    "#f0d290",
  ]),
];
let hasPlayed = false;
const tl = gsap.timeline({
  onComplete: () => {
    tl.timeScale(1.5);
    tl.play(0);
    tl.pause();
    showReplayButton();
  },
});

function showReplayButton() {
  if (hasPlayed) playBtn.innerText = "Replay";
  playBtn.classList.remove("hidden");
  svgcontainer.classList.add("hidden");
  numbers.forEach((number) => number.classList.remove("in"));
  counter.classList.remove("hide");
}
function generatePoints() {
  tl.clear();
  group.innerHTML = "";
  let delay = 0;
  paths.forEach((path) => {
    const length = path.getTotalLength();
    for (let i = 0; i < length; i += 1) {
      const pointLength = Math.random() * length;
      const point = path.getPointAtLength(pointLength);
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", point.x);
      circle.setAttribute("cy", point.y);
      circle.setAttribute("r", Math.random() * 3 + 1);
      group.appendChild(circle);
      const coloursX = point.x / 300;
      tl.to(
        circle,
        {
          autoRound: false,
          fill: colours[0](coloursX).hex(),
          cx: point.x + (Math.random() - 0.5) * 60,
          cy: point.y + (Math.random() - 0.5) * 60,
          duration: "random(0.5,2)",
          delay: (delay + pointLength) * 0.002,
          ease: "power2.out",
        },
        0
      );
    }
    delay += length;
  });
  tl.reversed(false).play(0);
}

async function runFirstAnimation() {
  numbers[0].classList.add("in");
  numbers.forEach((number) => {
    number.addEventListener("animationend", (e) => {
      number.nextElementSibling.classList.add("in");
    });
  });
}

playBtn.addEventListener("click", () => {
  playBtn.classList.add("hidden");
  runFirstAnimation();
  setTimeout(() => {
    counter.classList.add("hide");
    svgcontainer.classList.remove("hidden");
    generatePoints();
  }, 3100);
  hasPlayed = true;
});
