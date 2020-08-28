let overlay = document.querySelector('#overlay');
let title = overlay.querySelector('.title');
let startBtn = overlay.querySelector('.btn__reset');
let phrase = document.getElementById('phrase');
let qwerty = document.getElementById('qwerty');
let hearts = document.querySelectorAll('.tries');
let scoreboard = document.getElementById('scoreboard');
let img = scoreboard.querySelectorAll('img');
let keyboard = qwerty.querySelectorAll('button');

let h3 = document.createElement('h3');
overlay.appendChild(h3);

let missed = 0;
let phrases = [
    'you only live once',
    'aspire to inspire',
    'all is well',
    'die with memories',
    'believe in yourself'
];

let mainPhrases = [ 
    'you only live once',
    'aspire to inspire',
    'all is well',
    'die with memories',
    'believe in yourself'
];

//reset keyboard
function resetKeyboard() {
    for (let i = 0; i < keyboard.length; i++){
        keyboard[i].classList.remove('chosen');
        keyboard[i].removeAttribute('disabled');
    }
}

//return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    let randomIndex = Math.round(Math.random() * (arr.length - 1));
    let randomPhrase = arr[randomIndex];
        phrases = arr.filter(phrase => phrase !== randomPhrase);
        randomPhrase = arr[randomIndex].split('');
       
    return randomPhrase;
};  

//adds the letters of a string to the display
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++){
        let list = document.createElement('li');
        let ul = phrase.firstElementChild;
        list.textContent = arr[i];
        ul.appendChild(list);

        if (arr[i] !== ' '){
            list.className = 'letter';
        } else {
            list.className = 'space';
        }
    }
};

addPhraseToDisplay(getRandomPhraseAsArray(phrases));
let letter = document.querySelectorAll('.letter');

//check if a letter is in the phrase
const checkLetter = button => {
    let correctGuess = null;

    for (let i = 0; i < letter.length; i++ ){
        let letterGuess = letter[i].textContent;

        if (letterGuess === button) {
            letter[i].classList.add('show');
            correctGuess = letterGuess;
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
        h3.textContent = 'You Win!';
        overlay.style.display = 'flex';
    } else if (missed > 4) {
        overlay.className = 'lose';
        startBtn.textContent = 'Try Again';
        h3.textContent = 'You Lose!';
        overlay.style.display = 'flex';
    }
};

//listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    let btn = e.target;
    
    if (btn.tagName === 'BUTTON') {
        btn.className = 'chosen';
        btn.setAttribute('disabled', '');
        let guess = btn.textContent;
        let letterFound = checkLetter(guess);

        if (letterFound === null) {
            missed++;

            if (missed <= 5){
                for (let i = 1 ; i <= missed; i++) {
                    let index = [i] - 1;
                    img[index].setAttribute('src', 'images/lostHeart.png');
                }
            }
        }
    };
    checkWin();
});

//listen for the start game button to be pressed
startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    
    if (startBtn.textContent === 'Try Again' || startBtn.textContent === 'Play Again') {
        let ul = phrase.firstElementChild;
        ul.innerHTML = '';

        resetKeyboard();

        for (let i = 0; i < img.length; i++){
            img[i].setAttribute('src', 'images/liveHeart.png');
        }

        if (phrases.length < 0){
            phrases = mainPhrases;
            console.log(phrases)
            
            addPhraseToDisplay(getRandomPhraseAsArray(phrases));
        }
        
        addPhraseToDisplay(getRandomPhraseAsArray(phrases));
        missed = 0;
    }
});