const key = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const start = document.querySelector('.btn__reset');
let button = document.querySelectorAll('button');
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

function checkLetter(click) {
    let letter = document.querySelectorAll('.letter');
    for (let i = 0; i < letter.length; i++ ){
        let letterGuess = letter[i].textContent;
        if (letterGuess === click) {
            letter[i].className = 'show';
            return letterGuess;
        } else { 
            return null;
        }
    }
};

button.addEventListener('keydown', (e) => {
    e.target.className = 'chosen';
    let chosen = document.querySelectorAll('.chosen');
    if (chosen) {
        chosen.setAttribute('disabled', '');
    }
});

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

console.log(btn);