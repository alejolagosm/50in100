// Javascript for projects 11 to 20

// Project 11: Slider Cards
if (document.querySelector(".project-11") != null) {
  const insert = document.getElementById("insert");
  window.addEventListener("keydown", (e) => {
    console.log(e);
    insert.innerHTML = `<div class="key">
    ${e.key == " " ? "Space" : e.key}
    <small>event.key</small>
  </div>
  <div class="key">
  ${e.keyCode}
    <small>event.keyCode</small>
  </div>
  <div class="key">
  ${e.code}
    <small>event.code</small>
  </div>`;
  });
}

// Project 12: Tic Tac Toe
if (document.querySelector(".project-12") != null) {
  const playBtn = document.getElementById("play");
  const board = document.querySelector(".board");
  let play = false;
  const playedCells = [];
  let cells;

  function playGame() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add("flex");
      cell.dataset.index = `${i}`;
      playedCells.push(false);
      board.appendChild(cell);
    }
    cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (!playedCells[cell.dataset.index]) {
          cell.innerText = "X";
          playedCells[cell.dataset.index] = true;
          isWinner();
          playComputer(cell.dataset.index);
        }
      });
    });
  }

  function playComputer(index) {
    cells[parseFloat(index) + 1].innerText = `0`;
  }

  function isWinner() {}

  // class Board {
  //   constructor(board) {
  //     this.length = 9;
  //     this.cellsPlayed = [];
  //   }
  // }

  playBtn.addEventListener("click", (e) => {
    if (!play) {
      playGame();
      playBtn.innerText = `Start Again`;
    }
  });
}
