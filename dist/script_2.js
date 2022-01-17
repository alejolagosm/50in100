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
    } else if (
      playedCells.reduce((partial_sum, a) => partial_sum + a, 0) === 9
    ) {
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
}

// Project 13: Accordion
if (document.querySelector(".project-13") != null) {
  const btntoggle = document.querySelectorAll(".faq-toggle");
  const faq = document.querySelectorAll(".faq");

  btntoggle.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      current = false;
      if (e.target.closest(".faq").classList.contains("active")) {
        current = true;
      }
      faq.forEach((div) => div.classList.remove("active"));
      if (!current) {
        e.target.closest(".faq").classList.toggle("active");
      }
      console.log("hello");
    });
  });
}

// Project 14: Random chooUser
if (document.querySelector(".project-14") != null) {
}
if (document.querySelector(".project-15") != null) {
}
if (document.querySelector(".project-16") != null) {
}
if (document.querySelector(".project-17") != null) {
}
if (document.querySelector(".project-18") != null) {
}
if (document.querySelector(".project-19") != null) {
}
if (document.querySelector(".project-20") != null) {
}
