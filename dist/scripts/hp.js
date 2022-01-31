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
// Random User API could be used for this project as well
// const API_URL = "http://randomuser.me/api?results=100";
const API_URL = "http://hp-api.herokuapp.com/api/characters";

// DOM elements
const characters_cont = document.querySelector(".character_cont");
const filter = document.querySelector(".filter");

let characters = [];
let listItems = [];
async function getData() {
  try {
    const data = await axios({
      method: "GET",
      url: API_URL,
    });
    // This would filter only the characters with images, but the list would be too small
    // characters = data.data.filter((char) => char.image);
    characters = data.data.slice(0, 100);
    inputcharacters();
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getData();
});

function inputcharacters() {
  characters_cont.innerHTML = "";
  characters.forEach((character) => {
    const item = document.createElement("li");
    listItems.push(item);
    item.classList.add("character");
    item.innerHTML = `
        <img
            src="${
              character.image ||
              "https://images.unsplash.com/photo-1534294668821-28a3054f4256?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dW5rbm93bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            } "
            alt="Profile Picture"
        />
        <div class="char_id">
            <h4>${character.name}</h4>
            <p>${character.house || "Unknown"}</p>
        </div>
    `;

    characters_cont.appendChild(item);
  });
}

filter.addEventListener("input", (e) => {
  filterData(e.target.value);
});

function filterData(term) {
  console.log(term);
  listItems.forEach((character) => {
    console.log(character.innerText.toLowerCase().includes(term.toLowerCase()));
    if (character.innerText.toLowerCase().includes(term.toLowerCase())) {
      character.classList.remove("hide");
    } else {
      character.classList.add("hide");
    }
  });
}
