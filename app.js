// Variables
const letterList = document.getElementsByClassName("letter");
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const startGame = document.querySelector(".btn__reset");
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
  console.log(correctLetter);
  return correctLetter;
}

//Press the button to activate checkLetter
qwerty.addEventListener( "click", (event) => {
  if ( event.target.tagName === "BUTTON") {
    event.target.classList.add("chosen");
    event.target.disabled = true;
    const letterFound = checkLetter(event.target);
    return letterFound;
  }
});
