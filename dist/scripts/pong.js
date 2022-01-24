// Constants to define the game characteristics
const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000001;
const SPEED = 0.02;

// DOM elements: Game board and scores
const gameBoard = document.getElementById("game-container");
const gameBorder = document
  .getElementById("game-container")
  .getBoundingClientRect();
const gameBoardHeight = gameBorder.bottom - gameBorder.top;
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;

// Random number to start trajectory of the ball
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to see if to rectangles collided
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}

// Ball class
class Ball {
  constructor(ballEmen) {
    this.ballEmen = ballEmen;
    this.reset();
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballEmen).getPropertyValue("--x"));
  }
  set x(value) {
    this.ballEmen.style.setProperty("--x", value);
  }
  get y() {
    return parseFloat(getComputedStyle(this.ballEmen).getPropertyValue("--y"));
  }

  set y(value) {
    this.ballEmen.style.setProperty("--y", value);
  }

  rect() {
    return this.ballEmen.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += VELOCITY_INCREASE * delta;
    const rect = this.rect();

    if (rect.bottom >= gameBorder.bottom || rect.top <= gameBorder.top) {
      this.direction.y *= -1;
    }
    if (paddleRects.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

// Paddle class
class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }

  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }
  reset() {
    this.position = 50;
  }

  update(delta, ballHeight) {
    this.position = Math.min(
      Math.max(7, this.position + SPEED * delta * (ballHeight - this.position)),
      93
    );
  }
}

// Create game elements based on the classes
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("comp-paddle"));

// Update the ball and computer paddle position
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(gameBoard).getPropertyValue("--hue")
    );

    gameBoard.style.setProperty("--hue", hue + delta * 0.01);
    if (isLose()) {
      handleLose();
    }
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}

// Check if someone lost
function isLose() {
  const rect = ball.rect();
  return rect.right >= gameBorder.right || rect.left <= gameBorder.left;
}

// Update score and restart ball position
function handleLose() {
  const rect = ball.rect();
  if (rect.right >= gameBorder.right) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

// Interact with the mouse of the user
document.addEventListener("mousemove", (e) => {
  console.log(e.y, window.innerHeight);
  if (+e.y >= +gameBorder.top && +e.y <= +gameBorder.bottom) {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
  } else if (+e.y <= +gameBorder.top) {
    playerPaddle.position = 7;
  } else {
    playerPaddle.position = 93;
  }
});

window.requestAnimationFrame(update);
