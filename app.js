/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
//We first write down all the vars, this time we going to define them different, you don't need to write a semicolon everytime but instead you can use a comma
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listener for guess button
guessBtn.addEventListener('click', function(){
    //we want to number to be a number and no string so we have to parse it, we make a var guess and use the parseInt js function to make it a number
    let guess = parseInt(guessInput.value);

    //Validate our input
    //Because we parseInt above it will say NaN when there is no number entered, we also want when there is a number entered below the min or above the max we get an error, so we say, if guess is NaN or guess is less then the min number or guess is more then the max number then execute the setMessage function
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`);
    }
});

// SetMessage function
function setMessage(msg){
    message.textContent = msg;
}
