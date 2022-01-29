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
// const API_URL = "http://hp-api.herokuapp.com/api/characters";
const API_URL = "https://api.thedogapi.com/v1/breeds";
const API_KEY = "43c1682c-e61e-421b-a975-5ba7e1b92d9c";
const grid = document.getElementById("grid");

async function getData() {
  try {
    const data = await axios({
      method: "GET",
      url: API_URL,
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const dogs = data.data;
    shuffleArray(dogs);
    renderDogs(dogs.slice(0, 50));
  } catch (err) {
    console.log(err);
  }
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

getData();

function renderDogs(dogs) {
  dogs.forEach((dog) => {
    console.log(dog);
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerHTML = `
    <img src="${dog.image.url}" alt="Dog Reference picture" />
        <h3> ${dog.name}</h3>
        <p>${dog.breed_group || "unknown"}</p>
        <p>Life-Span:  ${dog.life_span}</p>
        <div>
          <span class="id">${
            dog.temperament?.split(",", 2)[0] || "Loyal"
          }</span>
          <span class="id" style="background-color: #f46b45;">${
            dog.temperament?.split(",", 2)[1] || "Kind"
          }</span>
        </div>
    `;
    grid.appendChild(cell);
  });
}
