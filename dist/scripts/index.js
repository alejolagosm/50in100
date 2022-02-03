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

// Page specific code
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text_anim", { y: "0%", duration: 1, stagger: 0.5 });
tl.to(".logo_anim", { x: "0%", duration: 1 });
tl.to(".index-slider", { y: "-100%", duration: 1, delay: 1.5 });
tl.to(".index-intro", { y: "-100%", duration: 1 }, "-=1");
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".grid_content", { x: "-100vw" }, { x: "0", duration: 1 }, "-=1");

const btnRand = document.querySelector(".btn_random");

btnRand.href = `pj_${Math.floor(Math.random() * 50) + 1}.html`;
