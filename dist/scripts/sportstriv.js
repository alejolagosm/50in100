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

// /////////////////////////////////////////////////////////////////////////
// Project 46: Trivia App

// DOM elements
const projectBody = document.querySelector(".project-46");
const form = document.getElementById("play");
const card = document.querySelector(".card");

// Question Card form
const questionCard = document.createElement("form");
questionCard.classList.add("card", "question");

// Variables to store data of each try
let questions = [];
let currentQuestion = 0;
let totalCorrectAnswers = 0;

// Calling the API to get the questions
async function getQuestions(level, category) {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${level}&type=multiple`
    );
    const data = await res.json();
    getInfo(data);
  } catch (err) {
    console.log(err);
  }
}

// Event to start the trivia with the user choices
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = form.category.value;
  const level = form.level.value;
  getQuestions(level, category);
});

// Organizing the info fetched from the API and start the trivia with the first question
function getInfo(data) {
  data.results.forEach((question) => {
    const answers = [question.correct_answer, ...question.incorrect_answers];
    shuffleArray(answers);
    const trivia = {
      question: question.question,
      answers: answers,
      correct: question.correct_answer,
    };
    questions.push(trivia);
  });
  setQuestion(currentQuestion);
}

// Randomize Answers
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Changing the question from the form element
function setQuestion(i) {
  form.classList.add("hidden");
  questionCard.innerHTML = `
    <h3>${questions[i].question}</h3>
    <label>
        <input type="radio" name="answer" value="0" selected/>
        ${questions[i].answers[0]}
    </label>
    <label>
        <input type="radio" name="answer" value="1" />
        ${questions[i].answers[1]}
    </label>
    <label>
        <input type="radio" name="answer" value="2" />
        ${questions[i].answers[2]}
    </label>
    <label>
        <input type="radio" name="answer" value="3" />
        ${questions[i].answers[3]}
    </label>
    <input class="response" type="submit" value="Submit" />
  `;
  projectBody.appendChild(questionCard);
  currentQuestion++;
}

// Ending the round
function endTrivia() {
  questionCard.innerHTML = `
      <h3>You answered ${totalCorrectAnswers} questions correctly</h3>
      <input class="response" type="submit" value="Reload" />
    `;
  projectBody.appendChild(questionCard);
  currentQuestion++;
}

// Adding the event listener to the question form, according to the order of the question
questionCard.addEventListener("submit", (e) => {
  e.preventDefault();
  if (currentQuestion == questions.length) {
    checkAnswer(currentQuestion);
    endTrivia();
  } else if (currentQuestion >= questions.length) {
    form.classList.remove("hidden");
    questionCard.innerHTML = ``;
    questions = [];
    currentQuestion = 0;
  } else {
    checkAnswer(currentQuestion);
    setQuestion(currentQuestion);
  }
});

// Check the correct answer in each try (i-1) since the index incremented before answering the question
function checkAnswer(i) {
  if (
    questions[i - 1].answers[questionCard.answer.value] ==
    questions[i - 1].correct
  ) {
    totalCorrectAnswers++;
  }
}
