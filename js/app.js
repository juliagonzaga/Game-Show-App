const key = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const start = document.querySelector('.btn__reset');
const qwerty = document.querySelector('#qwerty');
const scoreboard = document.querySelector('#scoreboard ol');
const win = document.querySelector('.win');
let lives = 5;
let missed = 0;

let phrases = [ 
    'you only live once',
    'aspire to inspire',
    'all is well',
    'die with memories',
    'believe in yourself'
];

start.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    let randomIndex = Math.round(Math.random() * (arr.length - 1));
    let randomPhrase = arr[randomIndex].split('');
    return randomPhrase;
};  

function  addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++){
        let ul = document.querySelector('#phrase ul');
        let list = document.createElement('li');
        list.textContent = arr[i];
        ul.appendChild(list);

        if (arr[i] !== ' '){
            list.className = 'letter';
        }
    }
};

addPhraseToDisplay(getRandomPhraseAsArray(phrases));
let letter = document.querySelectorAll('.letter');

function checkLetter(clickedBtn) {
    let correctGuess = null;

    for (let i = 0; i < letter.length; i++ ){
        let letterGuess = letter[i].textContent;

        if (letterGuess === clickedBtn) {
            letter[i].className = 'show';
            correctGuess = letterGuess;
        }
    }
    return correctGuess;
};

function updateLives() {
    scoreboard.innerHTML = '';

    for(let i = 0; i < missed; i++){
        let list = document.createElement('li');
            list.innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`;
            scoreboard.appendChild(list);
    }

    for(let i = 0; i < lives; i++){
        let list = document.createElement('li');
            list.innerHTML = `<img src="images/liveHeart.png" height="35px" width="30px">`;
            list.className = 'tries';
            scoreboard.appendChild(list);
    }
};

function checkWin() {
    let correctLetter = document.querySelectorAll('.show');
        correctLetter = correctLetter.length;
    let totalLetters = letter.length;

    if(correctLetter === totalLetters) {
        console.log('You Win');
    };
};

qwerty.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;
    
    if (target.tagName == 'BUTTON') {
        target.className = 'chosen';
        target.setAttribute('disabled', '');
        let guess = target.textContent;
        let letterFound = checkLetter(guess);
        
        if (letterFound === null) {
            lives--;
            missed++;

            updateLives();
        }
    }
    checkWin()
});

updateLives();