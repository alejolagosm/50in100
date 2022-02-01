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
// Project 29: Rock, Paper, Scissors
const playerChoices = document.getElementById("playerChoices");
const computerChoices = document.getElementById("computerChoices");
const playerScEl = document.getElementById("playerSc");
const compScEl = document.getElementById("compSc");
const popUp = document.getElementById("popUp");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restart");

let playerMove,
  compMove,
  playerScore = 0,
  compScore = 0;

playerChoices.addEventListener("click", (e) => {
  removeChoices();
  playerMove = +e.target.closest(".move").dataset.move;
  e.target.closest(".move").classList.add("chosen");
  randSelection();
  showrestartbtn();
});

function showrestartbtn() {
  setTimeout(() => {
    restartBtn.classList.remove("hidden");
  }, 2500);
}

restartBtn.addEventListener("click", (e) => {
  playerScore = 0;
  compScore = 0;
  updateScores();
  restartBtn.classList.add("hidden");
});

function removeChoices() {
  [...computerChoices.children].forEach((div) =>
    div.classList.remove("chosen")
  );
  [...playerChoices.children].forEach((div) => div.classList.remove("chosen"));
}
function randSelection() {
  i = 0;
  var x = setInterval(() => {
    if (i == 0) {
      computerChoices.lastElementChild.classList.remove("chosen");
    } else {
      computerChoices.children[i - 1].classList.remove("chosen");
    }
    computerChoices.children[i].classList.add("chosen");
    i++;
    if (i > computerChoices.children.length - 1) i = 0;
  }, 50);

  setTimeout(() => {
    clearInterval(x);
    chooserandom();
  }, 1500);
}

function chooserandom() {
  [...computerChoices.children].forEach((div) =>
    div.classList.remove("chosen")
  );
  const randIndex = Math.floor(Math.random() * computerChoices.children.length);
  randomChoice = computerChoices.children[randIndex];
  randomChoice.classList.add("chosen");
  compMove = randIndex + 1;
  checkWinner();
}

function checkWinner() {
  let message = "";
  if (compMove - playerMove === 1 || compMove - playerMove == -2) {
    compScore++;
    message = "Computer wins!";
  } else if (compMove - playerMove === -1 || compMove - playerMove == 2) {
    playerScore++;
    message = "You win!";
  } else if (compMove - playerMove === 0) {
    message = "It's a tie";
  }
  updateScores();
  popupMessage(message);
}

function updateScores() {
  compScEl.innerText = `${compScore}`;
  playerScEl.innerText = `${playerScore}`;
}

function popupMessage(message) {
  console.log(message);
  popUp.innerHTML = `<h3>${message}</h3>`;
  popUp.classList.remove("hidden");
  overlay.classList.remove("hidden");
  setTimeout(() => {
    popUp.classList.add("hidden");
    overlay.classList.add("hidden");
  }, 1000);
}
