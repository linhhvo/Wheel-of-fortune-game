const overlay = document.getElementById('overlay');
const resultMessage = document.querySelector('.title');
const startButton = document.querySelector('.btn__start');

const phrase = document.getElementById('phrase');
const phaseUl = phrase.firstElementChild;
const showedLetters = document.getElementsByClassName('show');
const allLetters = document.getElementsByClassName('letter');

const keyboard = document.getElementById('qwerty');
const keyboardLetter = document.querySelectorAll('#qwerty button');

const hearts = document.querySelector('#scoreboard ol');

const resetButton = document.querySelector('.btn__reset');

let missed = 0;

const phrases = [
  `Right Off the Bat`,
  `Drive Me Nuts`,
  `Rain on Your Parade`,
  `What Goes Up Must Come Down`,
  `My Cup of Tea`,
  `Dog Days of Summer`,
  `Apple of My Eye`,
];

// click Start game button to start
startButton.addEventListener('click', () => {
  overlay.style.display = `none`;
});

// return a random phrase from an array
const getRandomPhraseAsArray = (arr) => {
  let randomIndex = Math.floor(Math.random() * arr.length);
  let charArray = arr[randomIndex].split('');
  return charArray;
};

// adds the letters of a string to the display
const addPhraseToDisplay = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement('li');
    li.textContent = arr[i].toUpperCase();
    phaseUl.appendChild(li);
    if (arr[i] != ` `) {
      li.classList.add('letter');
    } else {
      li.style.padding = '0 10px';
    }
  }
};

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// check if a letter is in the phrase
const checkLetter = (button) => {
  let letterList = document.querySelectorAll('.letter');
  let chosenLetter = button.textContent.toUpperCase();
  let match = ``;
  for (let i = 0; i < letterList.length; i++) {
    let phraseLetter = letterList[i].textContent;
    if (chosenLetter === phraseLetter) {
      letterList[i].classList.add('show');
      match = chosenLetter;
    }
  }
  return match;
};

// listen for guess input

qwerty.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.tagName === 'BUTTON') {
    let pickedLetter = e.target;
    pickedLetter.classList.add('chosen');
    pickedLetter.disabled = true;
    let letterFound = checkLetter(pickedLetter);
    if (!letterFound) {
      missed++;
      hearts.removeChild(hearts.firstElementChild);

      const lostHeart = document.createElement('li');
      lostHeart.innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px" />`;
      hearts.appendChild(lostHeart);
    }
    checkWin();
  }
});

// check if the game has been won or lost
const checkWin = () => {
  const resetButton = (button) => {
    button.textContent = `Play Again`;
  };

  if (allLetters.length === showedLetters.length) {
    overlay.style.display = 'flex';
    overlay.className = `win`;
    resultMessage.textContent = `Congratulations! You have won the game.`;
    resetButton(startButton);
  } else if (missed > 4) {
    overlay.style.display = 'flex';
    overlay.className = `lose`;
    resultMessage.textContent = `Uh Oh! You have lost the game.`;
    resetButton(startButton);
  }
};
