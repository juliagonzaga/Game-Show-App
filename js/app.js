const key = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const start = document.querySelector('.btn__reset');
const qwerty = document.querySelector('#qwerty');
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

function checkLetter(pressedBtn) {
    let letter = document.querySelectorAll('.letter');
    let correctGuess;
    for (let i = 0; i < letter.length; i++ ){
        let letterGuess = letter[i].textContent.toLowerCase();
        if (letterGuess === pressedBtn.textContent) {
            letter[i].className = 'show';
            correctGuess = letter[i];
            return correctGuess;
        } else { 
            return null;
        }  
        
    }
};

qwerty.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;
    if (target.tagName === 'BUTTON') {
        target.className = 'chosen';
        target.setAttribute('disabled', '');
        let letterFound = checkLetter(target);
        console.log(letterFound);
    }
});

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);