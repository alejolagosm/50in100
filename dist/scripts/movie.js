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

const API_KEY = "a58a6857952f8b895d1fe37677522eca";
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
// const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

const grid = document.querySelector(".grid");
const form = document.getElementById("form");
const year = document.getElementById("date1");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const sort_option = document.querySelector("#options").value;
  console.log(sort_option);
  let searchYear = 2008;
  if (+year.value >= 1950 && +year.value <= 2022) {
    searchYear = +year.value;
  }
  const url = get_url(searchYear, sort_option);
  getMovies(url);
});

function get_url(year, sort = popularity) {
  return `https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&sort_by=${sort}.desc&api_key=${API_KEY}`;
}

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  grid.innerHTML = "";
  showMovies(data.results);
}

function showMovies(movies) {
  const top10 = movies.slice(0, 12);
  top10.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const poster = poster_path
      ? IMG_URL + poster_path
      : "https://images.unsplash.com/photo-1487260211189-670c54da558d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2hpdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
    const overviewText = overview
      ? overview.slice(0, 200) + "..."
      : "There is no overview. Go watch it!";
    const movieEl = `<div class="card">
        <img src=${poster} alt="Movie Poster" />
        <div class="info">
          <h3>${title}</h3>
          <span class=${
            +vote_average > 5.0 ? "green" : "red"
          }>${vote_average}</span>
        </div>
        <div class="overview">
          <div class="overlay">
            <h3>Overview</h3>
            <p>
              ${overviewText}
            </p>
          </div>
        </div>
      </div>`;
    grid.innerHTML += movieEl;
  });
}
