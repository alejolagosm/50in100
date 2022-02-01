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

// /////////////////////////////////////////////////////////////////////////
// Project 18: PokeApp

const searchBtn = document.querySelector(".btn");
const searchInput = document.querySelector(".input");
const grid = document.querySelector(".grid");
let pokemons = [];
async function getPokemon(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function savePokemons(randomIds) {
  try {
    await Promise.all(
      [...randomIds].map(async (id) => {
        const pokemon = await getPokemon(id);
        pokemons.push(pokemon);
      })
    );
    displaypokemons(pokemons);
    return pokemons;
  } catch (err) {
    const cardHtml = `<div>${err}</div>`;
    grid.innerHTML += cardHtml;
  }
}

searchBtn.addEventListener("click", () => {
  grid.innerHTML = "";
  pokemons = [];
  let randomIds = [];
  const limit = +searchInput.value;
  for (i = 1; i <= limit; i++) {
    randomIds.push(Math.floor(Math.random() * 250 + 1));
  }
  randomIds = [...new Set(randomIds)];
  savePokemons(randomIds);
});

function displaypokemons(pokemons) {
  pokemons.forEach((pokemon) => {
    const color = pokemon.base_experience <= 150 ? "#B05645" : "#547B32";
    const imgsrc =
      pokemon.sprites.other.dream_world.front_default ||
      pokemon.sprites.front_default;
    const cardHtml = `<div class="card" data-description="Pokemon">
        <img src=${imgsrc} alt="The pokemon picture" />
        <div class="caption">
          <div class="name">${pokemon.species.name}</div>
          <div class="strength">
            <span style="color:${color}">${pokemon.base_experience}</span>
          </div>
        </div>
      </div>`;
    grid.innerHTML += cardHtml;
  });
}
