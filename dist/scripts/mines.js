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

// DOM elements
const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const bombsLeft = document.getElementById("bombs");
const restartBtn = document.getElementById("restart");
const overlay = document.getElementById("overlay");
const display_res = document.getElementById("display_res");

// Game variables
let width = 10;
let bombAmount = 10;
let flagsAmount = 0;
let squares = [];
let isGameOver = false;

startBtn.addEventListener("click", (e) => {
  grid.innerHTML = "";
  grid.classList.remove("hidden");
  squares = [];
  createBoard();
  isGameOver = false;
  restartBtn.classList.remove("hidden");
  startBtn.classList.add("hidden");
});

restartBtn.addEventListener("click", (e) => {
  showSolution("💣");
  startBtn.innerText = "Re start";
  startBtn.classList.remove("hidden");
  setTimeout(() => {
    restartBtn.classList.add("hidden");
  }, 2000);
});

function createBoard() {
  const bombsArray = Array(bombAmount).fill(`bomb`);
  const emptyArray = Array(width ** 2 - bombAmount).fill("valid");
  const gameArray = emptyArray.concat(bombsArray);
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
  for (let i = 0; i < width ** 2; i++) {
    const square = document.createElement("div");
    square.classList.add("cell");
    square.classList.add(shuffledArray[i]);
    square.setAttribute("id", i);
    grid.appendChild(square);
    squares.push(square);
    square.addEventListener("click", (e) => {
      clickedSquare(square);
    });
    square.oncontextmenu = function (e) {
      e.preventDefault();
      addFlag(square);
      isWinner();
    };
  }
  assingNumberofBombs();
}

function assingNumberofBombs() {
  //   Add number of bombs of each square as a data attribute
  for (let i = 0; i < width ** 2; i++) {
    let total = 0;
    const isLeftEdge = i % width === 0;
    const isRightEdge = i % width === width - 1;
    if (squares[i].classList.contains("valid")) {
      // Square to the left
      if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
        total++;
      // Square to the right
      if (!isRightEdge && squares[i + 1].classList.contains("bomb")) total++;
      //   Square down
      if (
        i < squares.length - width &&
        squares[i + width].classList.contains("bomb")
      )
        total++;
      // Square up
      if (i > width - 1 && squares[i - width].classList.contains("bomb"))
        total++;
      // Square up right
      if (
        i > width - 1 &&
        !isRightEdge &&
        squares[i + 1 - width].classList.contains("bomb")
      )
        total++;
      // Square down right
      if (
        i < squares.length - width &&
        !isRightEdge &&
        squares[i + 1 + width].classList.contains("bomb")
      )
        total++;
      // Square down left
      if (
        i < squares.length - width &&
        !isLeftEdge &&
        squares[i - 1 + width].classList.contains("bomb")
      )
        total++;
      // Square up left
      if (
        i > width - 1 &&
        !isLeftEdge &&
        squares[i - 1 - width].classList.contains("bomb")
      )
        total++;
      squares[i].setAttribute("data-bombs", total);
    }
  }
}

function clickedSquare(square) {
  if (isGameOver) return;
  if (square.classList.contains("checked") || square.classList.contains("flag"))
    return;
  if (square.classList.contains("bomb")) {
    gameOver();
  } else {
    let total = +square.dataset.bombs;
    if (total != 0) {
      square.classList.add("checked");
      square.innerText = square.dataset.bombs;
      return;
    }
    checkSquare(square);
  }
  square.classList.add("checked");
}

function checkSquare(square) {
  const isLeftEdge = square.id % width === 0;
  const isRightEdge = square.id % width === width - 1;

  setTimeout(() => {
    if (square.id > 0 && !isLeftEdge) {
      const newId = squares[parseInt(square.id) - 1].id;
      const newSquare = document.getElementById(newId);
      clickedSquare(newSquare);
    }
    if (square.id > width - 1 && !isRightEdge) {
      const newId = squares[parseInt(square.id) + 1 - width].id;
      const newSquare = document.getElementById(newId);
      clickedSquare(newSquare);
    }
    if (square.id > width) {
      const newId = squares[parseInt(square.id) - width].id;
      const newSquare = document.getElementById(newId);
      clickedSquare(newSquare);
    }
    if (square.id > width + 1 && !isLeftEdge) {
      const newId = squares[parseInt(square.id) - 1 - width].id;
      const newSquare = document.getElementById(newId);
      clickedSquare(newSquare);
    }
    if (square.id > width + 1 && !isRightEdge) {
      const newId = squares[parseInt(square.id) + 1].id;
      const newSquare = document.getElementById(newId);
      clickedSquare(newSquare);
    }
    if (square.id < squares.length - width && !isLeftEdge) {
      const newId = squares[parseInt(square.id) - 1 + width].id;
      const newSquare = document.getElementById(newId);
      clickedSquare(newSquare);
    }
    if (square.id < squares.length - width - 1 && !isRightEdge) {
      const newId = squares[parseInt(square.id) + 1 + width].id;
      const newSquare = document.getElementById(newId);
      clickedSquare(newSquare);
    }
    if (square.id < squares.length - width - 1) {
      const newId = squares[parseInt(square.id) + width].id;
      const newSquare = document.getElementById(newId);
      clickedSquare(newSquare);
    }
  }, 10);
}

function addFlag(square) {
  if (isGameOver) return;
  if (square.classList.contains("valid")) {
    square.innerText = "🚫";
    gameOver("💣");
  } else if (
    !square.classList.contains("checked") &&
    flagsAmount < bombAmount
  ) {
    if (!square.classList.contains("flag")) {
      square.classList.add("flag");
      square.innerText = "🚩";
      flagsAmount++;
    } else {
      square.classList.remove("flag");
      square.innerText = "";
      flagsAmount--;
    }
  }
}

function gameOver() {
  isGameOver = true;
  showSolution("💣");
  showResult("loser", "Sorry! You lost");
}

function isWinner() {
  let matches = 0;
  for (let i = 0; i < squares.length; i++) {
    if (
      squares[i].classList.contains("flag") &&
      squares[i].classList.contains("bomb")
    ) {
      matches++;
    }
    if (matches == bombAmount) {
      showSolution("🚩");
      showResult("winner", "Congrats! You won");
    }
  }
}

function showSolution(emoji) {
  for (let i = 0; i < width ** 2; i++) {
    const square = document.getElementById(`${i}`);
    if (square.dataset.bombs > 0 || square.classList.contains("bomb")) {
      square.innerText = square.dataset.bombs || emoji;
    }
    square.classList.add("checked");
  }
}

function showResult(className, message) {
  overlay.classList.remove("hidden");
  display_res.classList.remove("hidden");
  display_res.classList.add(className);
  display_res.innerHTML = `<h2>${message}</h2>`;
  setTimeout(() => {
    overlay.classList.add("hidden");
    display_res.classList.add("hidden");
    restartBtn.classList.add("hidden");
    startBtn.innerText = "Re start";
    startBtn.classList.remove("hidden");
  }, 2000);
}
