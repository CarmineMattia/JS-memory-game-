const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lock = false;
let fisrtCard, secondCard;

function flipCard() {
  if (lock) return;
  if (this === fisrtCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // fisrt card click
    hasFlippedCard = true;
    fisrtCard = this;

    return;
  }

  // Second card Click
  secondCard = this;

  checkForMatch();
}
function checkForMatch() {
  // matching card?
  if (fisrtCard.dataset.framework === secondCard.dataset.framework) {
    // the maatch
    disableCards();
  } else {
    // no match
    unflipCards();
  }
}

function disableCards() {
  fisrtCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}
function unflipCards() {
  lock = true;
  setTimeout(() => {
    fisrtCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lock] = [false, false];
  [fisrtCard, secondCard] = [null, null];
}
// loop
cards.forEach((card) => card.addEventListener("click", flipCard));
