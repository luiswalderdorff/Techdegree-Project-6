// Variables
const letterList = document.getElementsByClassName("letter");
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const startGame = document.querySelector(".btn__reset");
const resetButton = document.querySelector(".reset-button");
const overlay = document.getElementById("overlay");
const phrases = [
  "Hello World and people",
  "One fish Two Fish",
  "Red fish Blue Fish",
  "Luke I am your father",
  "Humongous Mushrooms"
];

// Hide Overlay
startGame.addEventListener( "click", () => {
  overlay.style.display = "none";
  startGame.style.display = "none";
});

// Randomly chose a phrase from the phrases array and split that array into
// a new array of characters
function getRandomPhraseAsArray (array) {
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber].split("");
}

const phraseArray = getRandomPhraseAsArray(phrases);

//add the random array to the display
function addPhraseToDisplay (array) {
  const letters = getRandomPhraseAsArray(array);
  for ( let i = 0; i <= letters.length - 1; i++ ) { //Minus 1 because length starts at one and arrays at zero
    const ul = document.querySelector("#phrase ul");
    const li = document.createElement("li");
    li.textContent = letters[i];
    if ( letters[i] != " ") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }//why did I have to add the class, even though it isnt mentioned? Did I break something?
    ul.appendChild(li);
  }
}

addPhraseToDisplay(phrases);

//Check if button matches the phrase

let correctLetter;
function checkLetter (button) {
  correctLetter = null;
  for ( let i = 0; i <= letterList.length - 1; i++) {
    if ( letterList[i].textContent.toLowerCase() === button.textContent ) {
      letterList[i].classList.add("show");
      correctLetter = letterList[i].textContent;
    }
  }
  return correctLetter;
}

//Check if the player has won or lost
function checkWin () {
  const revealedLetters = document.querySelectorAll(".show");
  const revealableLetters = document.querySelectorAll(".letter");
  if ( revealedLetters.length === revealableLetters.length) {
    overlay.style.display = "";
    overlay.className = "win";
    overlay.querySelector(".win-title").style.display = "block";
    resetButton.style.display = "block";
  } else if ( missed === 5) {
    overlay.style.display = "";
    overlay.className = "lose";
    overlay.querySelector(".lost-title").style.display = "block";
    resetButton.style.display = "block";
  }
}

//Press the button to activate checkLetter
let letterFound;
qwerty.addEventListener( "click", (event) => {
  if ( event.target.tagName === "BUTTON") {
    event.target.classList.add("chosen");
    event.target.disabled = true;
    letterFound = checkLetter(event.target);
    if (letterFound === null) {
      document.querySelector(".tries").firstElementChild.src = "images/lostHeart.png";
      document.querySelector(".tries").className = "triesLost";
      missed += 1;
    }
    checkWin();
  }
});
//Remove last phrases for Reset Game function
function removeLastPhrase(){
  const lastLetters = document.getElementsByClassName("letter");
  const lastSpaces = document.getElementsByClassName("space");
  while (lastLetters.length > 0) {
      lastLetters[0].parentNode.removeChild(lastLetters[0]);
      if (lastSpaces.length > 0) {
        lastSpaces[0].parentNode.removeChild(lastSpaces [0]);
      }
  }
}

//Reset Game
function resetGame () {
  const chosenButtons = document.querySelectorAll(".keyrow button");
  missed = 0;
  //Refill hearts
  while (document.querySelectorAll(".triesLost").length > 0) {
    document.querySelectorAll(".triesLost")[0].firstElementChild.src = "images/liveHeart.png";
    document.querySelectorAll(".triesLost")[0].className = "tries";
  }
 //Reset buttons
  for (var i = 0; i < chosenButtons.length; i++) {
    chosenButtons[i].className = "";
    chosenButtons[i].disabled = false;
  }
  removeLastPhrase();
  addPhraseToDisplay(phrases);
}

resetButton.addEventListener ("click", (event) => {
  overlay.style.display = "none";
  resetGame();
})
