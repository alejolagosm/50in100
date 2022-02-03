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

// Project 18: PokeApp

const grid = document.querySelector(".project-6");
// let pokemons = [];
let boxes = [];

async function getPokemon(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await res.json();
    displaypokemon(pokemon);
    if (id > 10) checkBoxes();
  } catch (err) {
    console.log(err);
  }
}

savePokemons();
function savePokemons() {
  try {
    for (let i = 1; i < 100; i++) {
      getPokemon(i);
    }
  } catch (err) {
    const cardHtml = `<div>${err}</div>`;
    grid.innerHTML == cardHtml;
  }
}

function displaypokemon(pokemon) {
  const imgsrc =
    pokemon.sprites.other.dream_world.front_default ||
    pokemon.sprites.front_default;
  const card = document.createElement("div");
  card.classList.add("box");
  card.classList.add("flex");
  card.innerHTML = `
      <img src="${imgsrc}" alt="" />
    `;
  boxes.push(card);
  grid.appendChild(card);
}

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

// Adding the functionality to the window object
window.addEventListener("scroll", checkBoxes);
