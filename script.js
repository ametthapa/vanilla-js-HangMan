const wordEl =document.getElementById('word');
const wrongLettersEl =document.getElementById('wrong-letters');
const playAgainBtn =document.getElementById('play-again');
const popup =document.getElementById('popup-container');
const notification =document.getElementById('notification-container');
const finalMessage =document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');
const words =['application','programming','interface','wizard','medicine'];

let selectedWord =words[Math.floor(Math.random() * words.length)];

const correctLetters =[];
const wrongLetters =[];


//Update the wrong letters
function updateWrongLettersEl() {
    //Display wrong letters
    wrongLettersEl.innerHTML=`
        ${wrongLetters.length >0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display ='block';
        } else {
            part.style.display ='none';
        }
    });

    //check if lost
    if(wrongLetters.length === figureParts.length){
        popup.style.display ='flex';
    }
}


//show notification
function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//show hidden word
function displayWord(){
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(
            letter => `
                <span class="letters">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `
        )
        .join('')}
    `;

    //the result of wordEl is in next line, so thats need to be removed by
    const innerWord = wordEl.innerText.replace(/\n/g,'');
    
    if(innerWord === selectedWord){
        finalMessage.innerText =`Congratulations! You Won!!`;
        popup.style.display='flex';
    }
}

//keydown lettres press
window.addEventListener('keydown',e => {
    let ascii,key=e.key;

    if(key.length === 1) {
        ascii = e.key.charCodeAt(0);

        if(ascii >=65 && ascii <= 90 || ascii >=97 && ascii <=122) {
           const letter = e.key;
           if(selectedWord.includes(letter)){
               if(!correctLetters.includes(letter)) {
                   correctLetters.push(letter);
                   displayWord();
               } else {
                   showNotification();
               }
           } else {
               if(!wrongLetters.includes(letter)) {
                   wrongLetters.push(letter);
                   updateWrongLettersEl();
               } else {
                   showNotification();
               }
           }

        }
    }
});

playAgainBtn.addEventListener('click', () => {
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord =words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display='none';
});


displayWord();