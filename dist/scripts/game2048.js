// Navigation Media Query hidden
const burger = document.querySelector("#burger");
const menu = document.querySelector("#menu");

burger.addEventListener("click", () => {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
  }
});

// Project Javascript

// Getting all DOM elements
const grid = document.querySelector(".grid");
const btnPlay = document.querySelector("#replay");
const resultD = document.querySelector(".result");
const score = document.querySelector(".score");

// Defining cells
const cellsQt = 16;
const width = Math.sqrt(cellsQt);
let cells = [];
let currentScore = 0;

btnPlay.addEventListener("click", () => {
  grid.innerHTML = "";
  cells = [];
  currentScore = 0;
  createBoard();
});

// Creating the board
function createBoard() {
  for (let i = 0; i < cellsQt; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerText = 0;
    grid.appendChild(cell);
    cells.push(cell);
    score.innerText = currentScore;
    resultD.innerText = "Let's goooo";
  }
  randNum();
  randNum();
}

createBoard();

// Generate random cell to add the next Number 2
function randNum() {
  // The try catch block also serves to check loser
  try {
    let randomNum = Math.floor(Math.random() * cells.length);
    if (cells[randomNum].innerText == 0) {
      cells[randomNum].innerText = 2;
      cells[randomNum].style.backgroundColor = "#ede0c8";
    } else randNum();
  } catch {
    resultD.innerText = "Sorry, you lost!";
    resultD.color = "red";
    document.removeEventListener("keyup", control);
  }
}

// Swipe right and left
function moveRight() {
  for (let i = 0; i < cellsQt; i++) {
    if (i % width === 0) {
      let totalOne = +cells[i].innerText;
      let totalTwo = +cells[i + 1].innerText;
      let totalThree = +cells[i + 2].innerText;
      let totalFour = +cells[i + 3].innerText;

      let row = [totalOne, totalTwo, totalThree, totalFour];

      let filteredRow = row.filter((num) => num);
      let missing = width - filteredRow.length;
      let zeros = Array(missing).fill(0);
      let newRow = zeros.concat(filteredRow);

      cells[i].innerText = newRow[0];
      cells[i + 1].innerText = newRow[1];
      cells[i + 2].innerText = newRow[2];
      cells[i + 3].innerText = newRow[3];
    }
  }
}

function moveLeft() {
  for (let i = 0; i < cellsQt; i++) {
    if (i % width === 0) {
      let totalOne = +cells[i].innerText;
      let totalTwo = +cells[i + 1].innerText;
      let totalThree = +cells[i + 2].innerText;
      let totalFour = +cells[i + 3].innerText;
      let row = [totalOne, totalTwo, totalThree, totalFour];
      let filteredRow = row.filter((num) => num);
      let missing = width - filteredRow.length;
      let zeros = Array(missing).fill(0);
      let newRow = filteredRow.concat(zeros);

      cells[i].innerText = newRow[0];
      cells[i + 1].innerText = newRow[1];
      cells[i + 2].innerText = newRow[2];
      cells[i + 3].innerText = newRow[3];
    }
  }
}

// Swipe down and up
function moveDown() {
  for (let i = 0; i < width; i++) {
    let totalOne = +cells[i].innerText;
    let totalTwo = +cells[i + width].innerText;
    let totalThree = +cells[i + 2 * width].innerText;
    let totalFour = +cells[i + 3 * width].innerText;

    let column = [totalOne, totalTwo, totalThree, totalFour];

    let filteredColumn = column.filter((num) => num);
    let missing = Math.sqrt(cellsQt) - filteredColumn.length;
    let zeros = Array(missing).fill(0);
    let newColumn = zeros.concat(filteredColumn);

    cells[i].innerText = newColumn[0];
    cells[i + 1 * width].innerText = newColumn[1];
    cells[i + 2 * width].innerText = newColumn[2];
    cells[i + 3 * width].innerText = newColumn[3];
  }
}

function moveUp() {
  for (let i = 0; i < width; i++) {
    let totalOne = +cells[i].innerText;
    let totalTwo = +cells[i + width].innerText;
    let totalThree = +cells[i + 2 * width].innerText;
    let totalFour = +cells[i + 3 * width].innerText;

    let column = [totalOne, totalTwo, totalThree, totalFour];

    let filteredColumn = column.filter((num) => num);
    let missing = Math.sqrt(cellsQt) - filteredColumn.length;
    let zeros = Array(missing).fill(0);
    let newColumn = filteredColumn.concat(zeros);

    cells[i].innerText = newColumn[0];
    cells[i + 1 * width].innerText = newColumn[1];
    cells[i + 2 * width].innerText = newColumn[2];
    cells[i + 3 * width].innerText = newColumn[3];
  }
}

// Combine equal numbers by row
function combineRow() {
  for (let i = 0; i < cellsQt - 1; i++) {
    if (cells[i].innerText === cells[i + 1].innerText) {
      let combined = +cells[i].innerText + +cells[i + 1].innerText;
      currentScore += +cells[i].innerText;
      cells[i].innerText = combined;
      cells[i + 1].innerText = 0;
    }
  }
  isWinner();
}

// Combine equal numbers by column
function combineColumn() {
  for (let i = 0; i < cellsQt - width; i++) {
    if (cells[i].innerText === cells[i + width].innerText) {
      let combined = +cells[i].innerText + +cells[i + width].innerText;
      currentScore += +cells[i].innerText;
      cells[i].innerText = combined;
      cells[i + width].innerText = 0;
    }
  }
  isWinner();
}

// Function to change background Color of cells
function changeColors() {
  for (let i = 0; i < cellsQt; i++) {
    if (+cells[i].innerText == 0) {
      cells[i].style.backgroundColor = "#bbada0";
    } else if (+cells[i].innerText > 0 && +cells[i].innerText < 8) {
      cells[i].style.backgroundColor = "#ede0c8";
    } else if (+cells[i].innerText < 16) {
      cells[i].style.backgroundColor = "#f2b179";
    } else if (+cells[i].innerText < 64) {
      cells[i].style.backgroundColor = "#f59563";
    } else if (+cells[i].innerText < 64) {
      cells[i].style.backgroundColor = "#f67c5f";
    } else {
      cells[i].style.backgroundColor = "#f65e3b";
    }
  }
  isWinner();
}

// Functions to concatenate moves at each move
function keyRight() {
  moveRight();
  combineRow();
  moveRight();
  randNum();
  changeColors();
}
function keyLeft() {
  moveLeft();
  combineRow();
  moveLeft();
  randNum();
  changeColors();
}
function keyUp() {
  moveUp();
  combineColumn();
  moveUp();
  randNum();
  changeColors();
}
function keyDown() {
  moveDown();
  combineColumn();
  moveDown();
  randNum();
  changeColors();
}

// Assign keycodes
function control(e) {
  if (e.keyCode === 39) {
    keyRight();
  } else if (e.keyCode === 37) {
    keyLeft();
  } else if (e.keyCode === 38) {
    keyUp();
  } else if (e.keyCode === 40) {
    keyDown();
  }
}

// Check for winner
function isWinner() {
  score.innerText = currentScore;
  for (let i = 0; i < cellsQt; i++) {
    if (+cells[i].innerText == 2048) {
      resultD.innerText = "You win!";
      document.removeEventListener("keyup", control);
    } else if (+cells[i].innerText == 8) {
      resultD.innerText = "You've got this";
    } else if (+cells[i].innerText == 512) {
      resultD.innerText = "Great progress";
    } else if (+cells[i].innerText == 1024) {
      resultD.innerText = "Almost There";
    }
  }
}

document.addEventListener("keyup", control);
