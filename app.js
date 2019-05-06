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
    //the winning number have to be random so we set winningNum to a function called getRandomNum with the parameters min and max
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    //we only have to target the right element with the class name play-again
    if(e.target.className === 'play-again'){
        //reload the page
        window.location.reload();
    }
});

// Listener for guess button
guessBtn.addEventListener('click', function(){
    
    //we want to number to be a number and no string so we have to parse it, we make a var guess and use the parseInt js function to make it a number
    let guess = parseInt(guessInput.value);

    //Validate our input
    //Because we parseInt above it will say NaN when there is no number entered, we also want when there is a number entered below the min or above the max we get an error, so we say, if guess is NaN or guess is less then the min number or guess is more then the max number then execute the setMessage function
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }// Check if it is the winning number
    else if(guess === winningNum){
        // Game over - won

        // // Disable input if correct, commented everything below out because its better to write a function for this as we did on the bottom (gameOver function) to make the code look cleaner
        // guessInput.disabled === true;
        // // Change the border to green if correct
        // guessInput.style.borderColor = 'green';
        // // Set Message if correct
        // setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } //Then we want to check if there are any guesses left, so we say else if guessesLeft equals zero it means they lost
        else if(guessesLeft === 1){
            //Game over - lost
            
            // Disable input if game over, same as above, I have commented everything out as we can write the code much cleaner with the gameOver function:
            // guessInput.disabled === true;
            // // Change the border to red if game over
            // guessInput.style.borderColor = 'red';
            // // Set Message if game over
            // setMessage(`Game Over, you lost. The correct number was ${winningNum}`, 'red');

            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
        } else {
            // Game continues - answer wrong

            guessesLeft -= 1;

            // Change the border to red if wrong answer
            guessInput.style.borderColor = 'red';

            // Clear the input
            guessInput.value = '';

            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
});

// Game Over
function gameOver(won, msg){
    let color;
    //So we say if won is equal to true then the color is green else the color is red:
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled === true;
    // Change the border color
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set Message if correct
    setMessage(msg);

    // Change the submit button to Play Again
    guessBtn.value = 'Play Again';
    //Here we append a new class to the button when it is game over, as we change this after the page is loaded we have to add a listener to the parent
    guessBtn.className += 'play-again';
}

// Get Random number
function getRandomNum(){
    //generate a random num between the min and max
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set Message 
function setMessage(msg, color){
    //We want the text to be red when it is an error or green when it's good, so we set another parameter above in the function named color and set it in the message above to red. 
    message.style.color = color;
    message.textContent = msg;
}

