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
