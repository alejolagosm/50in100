// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init Flex Container
function init() {
  const cards = document.querySelector(".cards");
  cards.addEventListener("click", function (e) {
    Array.from(cards.children).forEach((card) =>
      card.classList.remove("active")
    );
    e.target.closest(".card").classList.add("active");
  });
}
