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

// ////////////////////////////////////////////////////////////////////////////
// Project 12: Very simple Tic Tac Toe

const playBtn = document.getElementById("play");
const board = document.querySelector(".board");
let play = false;
let playedCells = [];
let cells = [];

function createBoard() {
  playedCells = [];
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add("flex");
    cell.dataset.index = `${i}`;
    cell.dataset.col = `${i % 3}`;
    cell.dataset.row = `${Math.floor(i / 3)}`;
    playedCells.push(false);
    board.appendChild(cell);
  }
  playGame();
}

function playGame() {
  cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!playedCells[cell.dataset.index]) {
        cell.innerText = "X";
        playedCells[cell.dataset.index] = true;
        isWinner(cell, "Congrats You won!");
        if (play) playComputer();
      }
    });
  });
}

function playComputer() {
  const notPlayed = [];
  playedCells.forEach((cell, index) => {
    if (!cell) notPlayed.push(index);
  });
  const randomIndex = notPlayed[Math.floor(Math.random() * notPlayed.length)];
  cells[randomIndex].innerText = `0`;
  playedCells[randomIndex] = true;
  isWinner(cells[randomIndex], "Sorry, you lost!");
}

function isWinner(playedCell, message) {
  const cellrows = [...cells].filter(
    (cell) =>
      cell.dataset.row == playedCell.dataset.row &&
      cell.innerText == playedCell.innerText
  );
  const cellcols = [...cells].filter(
    (cell) =>
      cell.dataset.col == playedCell.dataset.col &&
      cell.innerText == playedCell.innerText
  );
  const celldiagonal1 = [...cells].filter(
    (cell) =>
      (cell.dataset.index == 0 && cell.innerText == playedCell.innerText) ||
      (cell.dataset.index == 4 && cell.innerText == playedCell.innerText) ||
      (cell.dataset.index == 8 && cell.innerText == playedCell.innerText)
  );
  const celldiagonal2 = [...cells].filter(
    (cell) =>
      (cell.dataset.index == 2 && cell.innerText == playedCell.innerText) ||
      (cell.dataset.index == 4 && cell.innerText == playedCell.innerText) ||
      (cell.dataset.index == 6 && cell.innerText == playedCell.innerText)
  );

  if (
    (cellrows.length == 3) |
    (cellcols.length == 3) |
    (celldiagonal1.length == 3) |
    (celldiagonal2.length == 3)
  ) {
    endGame(message);
    play = false;
  } else if (playedCells.reduce((partial_sum, a) => partial_sum + a, 0) === 9) {
    endGame("It's a tie");
    play = false;
  }
}

function endGame(message) {
  board.innerHTML = "";
  playBtn.innerText = `${message} Start Again`;
}

playBtn.addEventListener("click", () => {
  board.innerHTML = "";
  createBoard();
  play = true;
  playBtn.innerText = `Start Again`;
});
