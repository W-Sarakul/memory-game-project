// store card value in a list //
let cardValue = ["fas fa-gem", "fas fa-anchor", "fas fa-cannabis", "fas fa-feather", "fas fa-fish", "fas fa-snowflake", "fas fa-star", "fas fa-paper-plane"];

// create shuffle 16 card values //
let doubleValue = [...cardValue, ...cardValue];

// shuffle function from https://stackoverflow.com/a/12646864 //
var shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
    return array;
}

// create cards //
var createCard = () => {
  let shuffledList = shuffleArray(doubleValue);
  // Now we have shuffles cardValue so we can create cards element by this order //
  let deck = document.createElement("UL");
  deck.setAttribute("class", "deck");
  // create cards //
  for (let i = 0 ; i < shuffledList.length ; i++) {
    let card = document.createElement("LI");
    card.setAttribute("class", "card");
    let value = document.createElement("I");
    value.setAttribute("class", shuffledList[i]);
    card.appendChild(value);
    deck.appendChild(card);
  }

  document.body.children[1].appendChild(deck);
}


var addEvntCards = () => {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", (event) => {
      if (cards[i] != event.target) return;
      playCard(event);
    })
  }
}


// get elements //
let cards = document.getElementsByClassName("card");
let leftMove = document.getElementsByClassName("move")[0];
let stars = document.querySelector(".stars");
let restart = document.querySelector(".reset");
let start = document.querySelector(".start");

// array to store the cards while playing //
let open = [];
let match = [];
let move = 40;
leftMove.textContent = move;
let left = [];

//Time section //
// code from https://stackoverflow.com/a/4435813 to create timer//
let timeLeft = 30;
let timing = document.querySelector(".timer");
let intervalId = null;

var countdown = () => {
  if (timeLeft == 0) {
    clearTimeout(intervalId);
    gameOver(); // gameover
  } else {
    timing.innerHTML = timeLeft + ' seconds remaining';
    timeLeft--;
  }
}

// end Time section //

// Begin Game section //
var beginGame = () => {
  createCard();
  addEvntCards();
}

// Game over section //
var gameOver = () => {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].className != "card match") {
      cards[i].classList.add("ans");
    }
  }
  clearTimeout(intervalId);
  timing.innerHTML = "GAME OVER";
  timing.style.color = "red";
}
// end Game over section //

// Play Again section //
var playAgain = () => {
  let deck = document.querySelector(".deck");
  match = [];
  open = [];
  deck.remove();
  createCard();
  cards = document.getElementsByClassName("card");
  addEvntCards()
  move = 40;
  leftMove.textContent = move;
  timeLeft = 30;
  timing.innerHTML = "30 seconds remaining"
  timing.style.color = "black";
  clearTimeout(intervalId);
  starRate(move);
}
// end Play Again section //

//Congratulations message section//
// let test = document.querySelector("#test");
// test.addEventListener("click", () => {modal.style.display = "block"})
let modal = document.querySelector(".modal");
let usedMove = document.querySelector(".used-move");
let displayStar = document.querySelector(".display-star");
let closeModal = document.querySelector(".close");
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
})
var congratMessage = () => {
  let numOfmoves = 40 - move;
  usedMove.innerHTML = numOfmoves;
  let leftStar = stars.cloneNode(true);
  displayStar.appendChild(leftStar);
  modal.style.display = "block";
}
//end Congratulations message section//


// Rule section //
var check = (openedCard) => {
  if (openedCard[0].firstElementChild.className == openedCard[1].firstElementChild.className) {
    for (let i = 0; i < openedCard.length; i++) {
      openedCard[i].classList.add("match");
      openedCard[i].classList.remove("open");
      match.push(openedCard[i]);
    }
    open = [];

  } else {
    setTimeout(() => {
      for (let i = 0; i < openedCard.length; i++) {
        openedCard[i].classList.remove("open");
      }
    }, 1500);
    open = [];

  }
}


var starRate = (move) => {
  if (move == 0) {
    gameOver();
  } else if (move < 5) {
    stars.children[0].className = "far fa-star";
  } else if (move < 15) {
    stars.children[1].className = "far fa-star";
  } else if (move < 25) {
    stars.children[2].className = "far fa-star";
  } else {
    for (let i = 0; i < stars.children.length; i++) {
      stars.children[i].className = "fas fa-star";
    }
  }
}

var playCard = (event) => {
  if (move > 0) {
    move--;
    leftMove.textContent = move;
    event.target.classList.add("open");
    open.push(event.target);
    if (open.length == 2) {
      check(open);
    }
    starRate(move);
    if (match.length == 16) {
      congratMessage();
    }
  }
}
// end Rule section //


// add event listener to the buttons //
restart.addEventListener("click", playAgain)
start.addEventListener("click", () => {
  intervalId = setInterval(countdown, 1000); // idea from https://stackoverflow.com/a/2844027
})
beginGame();
