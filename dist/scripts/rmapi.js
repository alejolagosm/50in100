// API constants
const API_URL = "https://rickandmortyapi.com/api/character/";
const character_cards = [];
const grid = document.querySelector(".grid");
const searchBtn = document.getElementById("search");
const inputSearch = document.getElementById("inputSearch");

searchBtn.addEventListener("click", (e) => {
  grid.innerHTML = "";
  addCharacters(inputSearch.value || 9);
  console.log(inputSearch.value || 9);
});

async function getCharacters(char_array) {
  try {
    const res = await fetch(`${API_URL}${char_array}`);
    const data = await res.json();
    setTimeout(() => {
      if (data.length) {
        data.forEach((character, index) => {
          addCharacter(index, character);
        });
      } else {
        addCharacter(0, data);
      }
    }, 2000);
  } catch (err) {
    grid.innerHTML = `<div class="flex">
    <h1>Oops, something went wrong. Try again</h1>
    <p>${err}</p>
  </div>`;
  }
}

function addCharacters(amount) {
  createcard(amount);
  let characters = [];
  for (i = 1; i <= amount; i++) {
    characters.push(Math.floor(Math.random() * 100 + 1));
  }
  getCharacters(characters);
}

function addCharacter(index, character) {
  const animated_bgs = document.querySelectorAll(".animated-bg");
  const animated_bg_texts = document.querySelectorAll(".animated-bg-text");
  animated_bgs.forEach((bg) => bg.classList.remove("animated-bg"));
  animated_bg_texts.forEach((bg) => bg.classList.remove("animated-bg-text"));

  const char_img = document.getElementById(`char_img-${index}`);
  const char_name = document.getElementById(`char_name-${index}`);
  const char_short = document.getElementById(`char_short-${index}`);
  const char_gender = document.getElementById(`char_gender-${index}`);
  const char_species = document.getElementById(`char_species-${index}`);
  const char_location = document.getElementById(`char_location-${index}`);

  char_img.innerHTML = `<img src="${character.image}" alt="Character Picture" />`;
  char_name.innerText = `${character.name}`;
  char_short.innerText = `Status: ${character.status}`;
  setGender(char_gender, character.gender);
  char_species.innerText = `Species: ${character.species}`;
  char_location.innerText = `Location: ${character.location.name}`;
}

function setGender(element, gender) {
  const icon =
    gender == "Male"
      ? "male"
      : gender == "Female"
      ? "female"
      : gender == "Genderless"
      ? "genderless"
      : "question";
  element.innerHTML = `<i class="fas fa-${icon} fa-2x"></i>`;
  element.classList.add(`${icon}`);
}

function createcard(amount) {
  for (let i = 0; i < amount; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `card-${i}`);
    card.innerHTML = `<div class="picture animated-bg" id="char_img-${i}">&nbsp;</div>
    <div class="caption">
      <h3 class="title animated-bg animated-bg-text" id="char_name-${i}">
        &nbsp;
      </h3>
      <p class="description" id="char_short-${i}">
        &nbsp;
        <span class="animated-bg animated-bg-text">&nbsp;</span>
        <span class="animated-bg animated-bg-text">&nbsp;</span>
      </p>
      <div class="profile">
        <div
          class="char_status animated-bg animated-bg-text"
          id="char_gender-${i}"
        ></div>
        <h4
          class="char_species animated-bg animated-bg-text"
          id="char_species-${i}"
        >
          &nbsp;
        </h4>
        <p
          class="char_location animated-bg animated-bg-text"
          id="char_location-${i}"
        >
          &nbsp;
        </p>
      </div>`;
    character_cards.push(card);
    grid.appendChild(card);
  }
}
