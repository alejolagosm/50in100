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

// Project Specific JS
const API_KEY = "9406ae321660315cb639b4d5a0827260";
const search = document.getElementById("search");
const form = document.getElementById("form");
const project = document.getElementById("project");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeCards();
  const searchQuery = search.value;
  getInfo(searchQuery);
});

function removeCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.remove());
}

async function getInfo(character) {
  try {
    const res = await fetch(
      `http://gateway.marvel.com/v1/public/characters?&nameStartsWith=${character}&apikey=${API_KEY}`
    );
    const json = await res.json();
    if (json.data.results.length == 0) {
      throw error;
    }
    updateCharacters(json.data.results);
  } catch (err) {
    showerror();
  }
}

function updateCharacters(characters) {
  for (const character of characters) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="picture">
          <img src="${character.thumbnail.path}.${
      character.thumbnail.extension
    }" alt="Character Picture" />
        </div>
        <div class="info">
          <h2>${character.name}</h2>
          <p>
          ${character.description.slice(0, 100)}
          </p>
          <div class="statistics">
          ${character.comics?.items[0]?.name || "No comics found"}
          </div>
          <div class="specials">
            <div>${
              character.stories?.items[0]?.name || "No stories found"
            }</div>
          </div>
        </div>
    `;
    project.appendChild(card);
  }
}

function showerror() {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <h2>Sorry</h2>
        <p>Couldn´t find a character with that name</p>
        <h3>Try again!</h3> 
    `;
  card.style.flexDirection = "column";
  project.appendChild(card);
}
