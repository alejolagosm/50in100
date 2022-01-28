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

// Project specific JS
const API_URL = "http://hp-api.herokuapp.com/api/characters";

async function getData() {
  try {
    const data = await axios(API_URL);
    console.log(data.data);
  } catch (err) {
    console.log(err);
  }
}

getData();
