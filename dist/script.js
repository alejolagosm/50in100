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

// Javascript for projects 1 to 5

// Project 1: Slider Cards
if (document.querySelector(".project-1") != null) {
  // Selecting Elements
  const panels_1 = document.querySelectorAll(".panel");
  // Adding the event listener functionality to each panel
  panels_1.forEach((panel) => {
    panel.addEventListener("click", () => {
      removeActiveClass();
      panel.classList.add("active");
    });
  });

  // Function to remove the classes
  function removeActiveClass() {
    panels_1.forEach((panel) => {
      panel.classList.remove("active");
    });
  }
}
// Project 2: Progress Steps
if (document.querySelector(".project-2") != null) {
  // Selecting Elements
  const progress_2 = document.getElementById("progress");
  const prev_2 = document.getElementById("prev");
  const next_2 = document.getElementById("next");
  const circles_2 = document.querySelectorAll(".circle");
  // Index to define current step
  let currentActive = 1;
  // Adding functionalities to the buttons
  next_2.addEventListener("click", () => {
    currentActive++;
    if (currentActive > circles_2.length) {
      currentActive = circles_2.length;
    }

    update();
  });
  prev_2.addEventListener("click", () => {
    currentActive--;
    if (currentActive < 1) {
      currentActive = 1;
    }
    update();
  });
  // Function to update the loading bar and the circle border
  function update() {
    circles_2.forEach((circle, index) => {
      if (index < currentActive) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    });
    const actives = document.querySelectorAll(".active");
    console.log(actives);
    progress_2.style.width =
      ((actives.length - 1) / (circles_2.length - 1)) * 100 + "%";

    if (currentActive === 1) {
      prev_2.disabled = true;
    } else if (currentActive === circles_2.length) {
      next_2.disabled = true;
    } else {
      next_2.disabled = false;
      prev_2.disabled = false;
    }
  }
}

// Project 3: Rotating Navigation
if (document.querySelector(".project-3") != null) {
  // Selecting DOM elements
  const open_3 = document.getElementById("open-3");
  const close_3 = document.getElementById("close-3");
  const container_3 = document.querySelector(".container-3");
  // Adding the functionality to the buttons, to add and remove CSS Classes
  open_3.addEventListener("click", () => {
    container_3.classList.add("show-nav");
  });
  close_3.addEventListener("click", () =>
    container_3.classList.remove("show-nav")
  );
}

// Project 4: Hidden Search
if (document.querySelector(".project-4") != null) {
  // Selecting DOM elements
  const search = document.querySelector(".search");
  const btn = document.querySelector(".btn");
  const input = document.querySelector(".input");
  // Adding the functionality to the button, to add and remove CSS Classes
  btn.addEventListener("click", () => {
    search.classList.toggle("active");
    input.focus();
  });
}

// Project 5: Blurring efect
if (document.querySelector(".project-5") != null) {
  // Selecting DOM elements
  const loadText = document.querySelector(".loading-text");
  const bg = document.querySelector(".bg");
  const btn = document.querySelector("#loader");
  let load;
  let int = setInterval(0);
  // Adding the functionality to the button, to add and remove CSS Classes
  btn.addEventListener("click", () => {
    load = 0;
    btn.style.visibility = `hidden`;
    int = setInterval(blurring, 30);
  });

  // This is to map an interval of numbers to a different set of values
  function scalerange(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }

  // This functions blurs the text and unblurs the image
  function blurring() {
    load++;
    if (load === 100) {
      setTimeout(function () {
        clearInterval(int);
        btn.style.visibility = `visible`;
        bg.style.filter = `blur(70px)`;
      }, 2000);
    }
    if ((load % 10 === 0) & (load < 100)) loadText.innerText = `${load}%`;
    loadText.style.opacity = scalerange(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scalerange(load, 0, 100, 70, 0)}px`;
  }
}

// Project 6: Scroll Animation
if (document.querySelector(".project-6") != null) {
  // Selecting DOM elements
  const boxes = document.querySelectorAll(".box");

  function checkBoxes() {
    const trigger = (window.innerHeight / 5) * 4;

    boxes.forEach((box) => {
      const boxtop = box.getBoundingClientRect().top;
      if (boxtop < trigger) {
        box.classList.add("show");
      } else {
        box.classList.remove("show");
      }
    });
  }
  //This is called initially to show that should appear right away
  checkBoxes();
  // Adding the functionality to the button, to add and remove CSS Classes
  window.addEventListener("scroll", checkBoxes);
}

// Project 7: Split landing
if (document.querySelector(".project-7") != null) {
  // Selecting DOM elements
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const container = document.querySelector(".project-7");
  // Adding the functionality to the buttons, to add and remove CSS Classes
  events(left, "hover-left");
  events(right, "hover-right");

  function events(btn, hover_pos) {
    btn.addEventListener("mouseenter", () => {
      container.classList.add(`${hover_pos}`);
    });
    btn.addEventListener("mouseleave", () => {
      container.classList.remove(`${hover_pos}`);
    });
  }
}

// Project 9: Drag&Drop Match Animals
if (document.querySelector(".project-9") != null) {
  // Initializing the DOM variables
  const get_animals = document.getElementById("get-animals");
  const drag_li = document.getElementById("drag-li");
  const picture_li = document.getElementById("picture-li");
  const check = document.getElementById("check");
  const qt_animals = 10;

  // Initialize arrays for the animal name and picture
  let animals = [],
    animalpics = [];

  // Initialize the variables for the list comparisons and drag and drop events
  let listItems1 = [];
  let listItems2 = [];
  let dragStartIndex;

  // Simple timeout function to race the promise in case there is an error
  const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  // Get JSON from the API fetch call
  const getJSON = async function (url) {
    try {
      const res = await Promise.race([fetch(url), timeout(5)]);
      const data = await res.json();
      if (!res.ok) throw new Error(`${data.message} (${res.status}) Sorry`);
      return data;
    } catch (err) {
      throw err;
    }
  };

  // Load the results from the API call based on a number of animals
  const loadSearchResults = async function (number) {
    try {
      const data = await getJSON(
        `https://zoo-animal-api.herokuapp.com/animals/rand/${number}`
      );
      // Adding the data to each array
      data.forEach((animalInfo) => {
        animals.push(animalInfo.name);
        animalpics.push(animalInfo.image_link);
      });
      // Creating the list and adding it to the HTML
      createList();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // Drag and drop event listeners
  function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index");
  }
  function dragEnter() {
    this.classList.add("over");
  }
  function dragOver(e) {
    e.preventDefault();
  }
  function dragLeave() {
    this.classList.remove("over");
  }
  function dragDrop() {
    const dragEndIndex = +this.getAttribute("data-index");
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove("over");
  }

  // Exchanging the items from the list after dragging the items
  function swapItems(fromIndex, toIndex) {
    const itemOne = listItems2[fromIndex].querySelector(".draggable");
    const itemTwo = listItems2[toIndex].querySelector(".draggable");
    listItems2[fromIndex].appendChild(itemTwo);
    listItems2[toIndex].appendChild(itemOne);
  }

  // Checking the order of the items and checking if the player won
  function checkOrder() {
    listItems2.forEach((listItem, index) => {
      const animalname = listItem.querySelector(".draggable").innerText.trim();
      if (animalname !== animals[index]) {
        listItem.classList.add("wrong");
      } else {
        listItem.classList.remove("wrong");
        listItem.classList.add("right");
      }
    });
    checkWinner();
  }

  // Function to check if the palyer won and activate modal window
  function checkWinner() {
    if (listItems2.every((listItem) => listItem.classList.contains("right"))) {
      document.getElementById("modal-container").classList.remove("hidden");
      document.getElementById("list-container").classList.add("hidden");
    }
  }

  // Adding the drag and drop event listeners for each item on the list
  function adddraglisteners() {
    const draggables = document.querySelectorAll(".draggable");
    const draglistItems = document.querySelectorAll(".drag-li li");
    draggables.forEach((draggable) =>
      draggable.addEventListener("dragstart", dragStart)
    );
    draglistItems.forEach((item) => {
      item.addEventListener("dragover", dragOver);
      item.addEventListener("drop", dragDrop);
      item.addEventListener("dragenter", dragEnter);
      item.addEventListener("dragleave", dragLeave);
    });
  }

  // Creating the list of the animals after the API call
  function createList() {
    // Creating the list of the animal pics
    [...animalpics].forEach((animalpic, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
  <span class="number">${index + 1}</span>
  <div>
  <img src=${animalpic} alt="Animal Picture" id="animal-pic" />
  </div>`;
      listItems1.push(listItem);
      picture_li.appendChild(listItem);
    });
    // Creating the list of the animal names
    [...animals]
      .map((animal) => ({ value: animal, sort: Math.random() }))
      .sort((value1, valueb) => value1.sort - valueb.sort)
      .map((object) => object.value)
      .forEach((animal, index) => {
        const listItem = document.createElement("li");
        listItem.setAttribute("data-index", index);
        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class ="draggable" draggable ="true">
        <p class="name">${animal}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;
        listItems2.push(listItem);
        drag_li.appendChild(listItem);
      });

    adddraglisteners();
  }

  // Init On DOM Load
  document.addEventListener("DOMContentLoaded", init);

  // Init the DOM events on load
  function init() {
    get_animals.addEventListener("click", startGame);
  }

  // Start the game
  function startGame() {
    document.getElementById("init-container").classList.add("hidden");
    loadSearchResults(qt_animals);
    document.getElementById("list-container").classList.remove("hidden");
    check.addEventListener("click", checkOrder);
  }

  // Re-start the game
  const replaybtn = document.getElementById("re-start");
  replaybtn.addEventListener("click", startAgain);
  function startAgain() {
    document.getElementById("modal-container").classList.add("hidden");
    document.getElementById("init-container").classList.remove("hidden");
    picture_li.innerHTML = "";
    drag_li.innerHTML = "";
    animals.splice(0, animals.length);
    animalpics.splice(0, animalpics.length);
    listItems1.splice(0, listItems1.length);
    listItems2.splice(0, listItems2.length);
  }
}

if (document.querySelector(".project-10") != null) {
  const jokeEl = document.getElementById("joke");
  const jokeBtn = document.getElementById("jokeBtn");

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  // fetch.then option
  // function generateJoke() {
  //   fetch("https://icanhazdadjoke.com/", config)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       jokeEl.innerText = data.joke;
  //     });
  // }

  // async await option
  async function generateJoke() {
    const res = await fetch("https://icanhazdadjoke.com/", config);
    const data = await res.json();
    jokeEl.innerText = data.joke;
  }

  jokeBtn.addEventListener("click", () => {
    generateJoke();
  });
}
