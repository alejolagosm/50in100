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

// Javascript for projects 32 to 40

// ///////////////////////////////////////////////////////////////////////
// Project 32: Auto Typing random advice
if (document.querySelector(".project-32") != null) {
  const project = document.getElementById("project_32");
  const textEl = document.getElementById("text");
  const speedEl = document.getElementById("speed");

  let text = "Happiness is only real when shared";

  let idx = 1;
  let speed = 300 / speedEl.value;
  let reverse = false;
  let nextmessage = "";

  function writeText() {
    const hue = parseFloat(getComputedStyle(project).getPropertyValue("--hue"));

    if (idx == 1) {
      getAdvice();
      speed = 300 / speedEl.value;
    }
    textEl.innerText = text.slice(0, idx);
    idx++;
    project.style.setProperty("--hue", hue + idx);
    if (idx > text.length) {
      reverse = true;
      text = nextmessage;
      idx = 1;
      speed = 2000;
    }

    setTimeout(writeText, speed);
  }

  writeText();
  speedEl.addEventListener("input", (e) => (speed = 300 / e.target.value));

  async function getAdvice() {
    try {
      const data = await fetch("https://api.adviceslip.com/advice");
      const res = await data.json();
      nextmessage = res.slip.advice;
      console.log(nextmessage);
    } catch (err) {
      return "Sorry, something is wrong";
    }
  }
}

// ///////////////////////////////////////////////////////////////////////
// Project 33:Random Password Generator
if (document.querySelector(".project-33") != null) {
  // form input fields
  const passLength = document.querySelector(".input_1");
  const passSpecialWord = document.querySelector(".input_2");
  const passUpper = document.querySelector(".input_3");
  const passNumber = document.querySelector(".input_4");
  const passSymbol = document.querySelector(".input_5");
  //Submit form
  const inputBtn = document.querySelector(".input_submit");
  // Show and copy results
  const passwordResult = document.querySelector(".password_text");
  const passwordCopy = document.querySelector(".copyclip");

  const randomFunc = {
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  inputBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const length = +passLength.value;
    const SpecialWord = passSpecialWord.value;
    const hasUpper = passUpper.checked;
    const hasNumber = passNumber.checked;
    const hasSymbol = passSymbol.checked;

    passwordResult.innerText = generatePassword(
      length,
      SpecialWord,
      hasUpper,
      hasNumber,
      hasSymbol
    );
  });

  // Copy to clipboard functionality
  passwordCopy.addEventListener("click", (e) => {
    navigator.clipboard.writeText(passwordResult.innerText);
    // alert("Copied the password:" + passwordResult.innerText);
  });

  // Generate the password looping through each required special character and adding the special word as necessary
  function generatePassword(length, specialWord, upper, number, symbol) {
    let genPassword =
      specialWord.charAt(0).toUpperCase() + specialWord.slice(1);
    const charCount = upper + number + symbol;
    const typesArr = [{ upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );
    if (charCount === 0) {
      return genPassword;
    }
    for (let i = 0; i < length; i += charCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        genPassword += randomFunc[funcName]();
      });
    }
    const finalPassword = genPassword.slice(0, length);
    return finalPassword;
  }

  // Random Uppercase letter
  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
  }
  // Random number
  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
  }
  // Random symbol
  function getRandomSymbol() {
    const symbols = "#@_&*-<>.";
    return symbols[Math.floor(Math.random() * 9)];
  }
}

// ///////////////////////////////////////////////////////////////////////
// Project 34: Checkboxes
if (document.querySelector(".project-34") != null) {
  const toggles = document.querySelectorAll(".toggle");
  const great = document.getElementById("great");
  const fast = document.getElementById("fast");
  const cheap = document.getElementById("cheap");

  toggles.forEach((toggle) =>
    toggle.addEventListener("change", (e) => {
      checkTrick(e.target);
    })
  );

  function checkTrick(target) {
    if (great.checked && fast.checked && cheap.checked) {
      if (great === target) {
        fast.checked = false;
      } else if (cheap === target) {
        great.checked = false;
      } else {
        cheap.checked = false;
      }
    }
  }
}

// ///////////////////////////////////////////////////////////////////////
// Project 35: NotePad with local storage
if (document.querySelector(".project-35") != null) {
  // Button to add notes
  const addBtn = document.getElementById("addBtn");
  // Button to delete notes
  const clearBtn = document.getElementById("clearBtn");
  // Grid where the notes will go
  const grid = document.querySelector(".grid");
  // Getting the notes stored in local storage
  const notes = JSON.parse(localStorage.getItem("notes"));
  // If there are notes in local storage, add them to the DOM
  if (notes) {
    notes.forEach((note) => addNewNote(note));
  }

  // Event to add a note
  addBtn.addEventListener("click", () => addNewNote());
  // Function to add notes
  function addNewNote(text = "") {
    // Creating the DOM element with the markdown
    const note = document.createElement("div");
    note.classList.add("card");
    note.innerHTML = `
    <div class="header">
            <button class="editBtn">
              <i class="fas fa-edit"></i>
            </button>
            <button class="deleteBtn">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div class="main ${text ? "" : "hidden"}"></div>
          <textarea class="content ${
            !text ? "" : "hidden"
          }" name="content" id="content" rows="15"></textarea>
    `;
    // Getting all the buttons and text markdown
    const editBtn = note.querySelector(".editBtn");
    const deleteBtn = note.querySelector(".deleteBtn");
    const main = note.querySelector(".main");
    const textArea = note.querySelector(".content");
    // Assign the text to the text areas and the div
    textArea.value = text;
    main.innerHTML = marked.parse(text);
    // Delete btn functionality
    deleteBtn.addEventListener("click", () => {
      note.remove();
      updateLS();
    });
    // Edit button functionality: Alternate between div and text area for the content of the note
    editBtn.addEventListener("click", () => {
      main.classList.toggle("hidden");
      textArea.classList.toggle("hidden");
    });
    // Updating the text content of the div according to the changes in the text area
    textArea.addEventListener("input", (e) => {
      const { value } = e.target;
      main.innerHTML = marked.parse(value);
      updateLS();
    });
    // Adding the note to the DOM
    grid.appendChild(note);
  }

  // Updating local storage
  function updateLS() {
    const notesText = document.querySelectorAll("textarea");
    const notes = [];
    notesText.forEach((note) => {
      notes.push(note.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Delete all the notes btn
  clearBtn.addEventListener("click", () => {
    grid.innerHTML = ``;
    localStorage.clear();
  });
}

// ///////////////////////////////////////////////////////////////////////
// Project 36:
if (document.querySelector(".project-36") != null) {
}
