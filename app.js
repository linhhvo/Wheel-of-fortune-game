const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phaseUl = phrase.firstElementChild;
const startButton = document.querySelector('.btn__reset');
const overlay = startButton.parentNode;

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
startButton.addEventListener('click', (e) => {
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
      li.className = `letter`;
    } else {
      li.style.padding = '0 10px';
    }
  }
};

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// check if a letter is in the phrase
const checkLetter = (button) => {
  let letterList = document.getElementsByClassName('letter');
  let chosenLetter = button.textContent.toUpperCase();
  let match = ``;
  for (let i = 0; i < letterList.length; i++) {
    let phraseLetter = letterList[i].textContent;
    if (chosenLetter === phraseLetter) {
      letterList[i].className += ` show`;
      match = chosenLetter;
      i--;
    }
  }
  return match;
};

// listen for guess input
qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.className != `chosen`) {
    let pickedLetter = e.target;
    pickedLetter.className = `chosen`;
    pickedLetter.disabled = true;
    let letterFound = checkLetter(pickedLetter);
    if (!letterFound) {
      missed++;
      const hearts = document.querySelector('#scoreboard ol');
      hearts.removeChild(hearts.firstElementChild);

      const lostHeart = document.createElement('li');
      lostHeart.innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px" />`;
      hearts.appendChild(lostHeart);
    }
  }
});

// check if the game has been won or lost
const checkWin = () => {
  const showedLetters = document.getElementsByClassName('show');
  const allLetters = document.getElementsByClassName('letter');

  if (showedLetters.length === allLetters.length && missed < 5) {
    overlay.className = `win`;
  } else if (missed >= 5) {
    overlay.className = `lose`;
  }
};
