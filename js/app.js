let overlay = document.querySelector('#overlay');
let title = overlay.querySelector('.title');
let startBtn = overlay.querySelector('.btn__reset');
let phrase = document.getElementById('phrase');
let letter = phrase.getElementsByClassName('letter');
let qwerty = document.getElementById('qwerty');
let hearts = document.querySelectorAll('.tries');
let scoreboard = document.getElementById('scoreboard');
let img = scoreboard.querySelectorAll('img');
let keyboard = qwerty.querySelectorAll('button');
let missed = 0;

let phrases = [
    'you only live once',
    'aspire to inspire',
    'all is well',
    'die with memories',
    'believe in yourself',
    'create happiness',
    'every moment matters',
    'nothing is impossible',
    'time is gold',
    'make today count'
];

//return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    let randomIndex = Math.round(Math.random() * (arr.length - 1));
    let randomPhrase = arr[randomIndex].split('');//creates an array of letters from the random phrase

    return randomPhrase;
};  

//displays the random phrase
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++){
        let list = document.createElement('li');
        let ul = phrase.firstElementChild;
        list.textContent = arr[i];
        ul.appendChild(list);

        if (arr[i] !== ' '){
            list.classList.add('letter');
        } else {
            list.classList.add('space');
        }
    }
};

//reset phrase
function resetPhrase(){
    let ul = phrase.firstElementChild;
    ul.innerHTML = '';
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
};

//reset keyboard
function resetKeyboard() {
    for (let i = 0; i < keyboard.length; i++){
        keyboard[i].classList.remove('chosen');
        keyboard[i].removeAttribute('disabled');
    }
};

//reset hearts
function resetHearts() {
    for (let i = 0; i < img.length; i++){
        img[i].setAttribute('src', 'images/liveHeart.png');
    };
};

//reset game 
function resetGame(){
    missed = 0;
    resetPhrase();
    resetKeyboard();
    resetHearts();
};

//transition delay
function transition () {
    setTimeout(function () {
        resetGame();
        overlay.style.display = 'flex';
    }, 1000);
};

resetPhrase();

//check if a letter is in the phrase
const checkLetter = button => {
    let correctGuess = null;

    for (let i = 0; i < letter.length; i++ ){
        let guessedLetter = letter[i].textContent;

        if (guessedLetter === button) {
            letter[i].classList.add('show');
            correctGuess = guessedLetter;
        }
    }
    return correctGuess;
};  

//check if the game has been won or lost
const checkWin = () => {
    let correctLetter = document.querySelectorAll('.show');
    let totalLetters = letter.length;

    if(correctLetter.length === totalLetters) {
        overlay.className = 'win';
        startBtn.textContent = 'Play Again';
        title.textContent = 'You Win!';
        transition();
    } else if (missed > 4) {
        overlay.className = 'lose';
        startBtn.textContent = 'Try Again';
        title.textContent = 'You Lose!';
        overlay.style.display = 'flex';
        resetGame();
    }
};

//listen for the start game button to be pressed
startBtn.addEventListener('click', () => {
    let resetBtn = startBtn.textContent;
    overlay.style.display = 'none';
    
    if (resetBtn === 'Try Again' || resetBtn === 'Play Again') {
        resetGame();
    };
});

//listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    let btn = e.target;
    
    if (btn.tagName === 'BUTTON') {
        btn.classList.add('chosen');
        btn.setAttribute('disabled', '');
        let guess = btn.textContent;
        let letterFound = checkLetter(guess);

        if (letterFound === null) {
            missed++;

            if (missed > 0){
                for (let i = 1 ; i <= missed; i++) {
                    let index = [i] - 1;
                    img[index].setAttribute('src', 'images/lostHeart.png');
                }
            }
        }
    };
    checkWin();
});

