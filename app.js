const gameTitle = document.querySelector('#game-title');

const startScreen = document.querySelector('#start-screen');
const startScreenForm = document.querySelector('#start-screen form');
const onePlayerGameBtn = document.querySelector('#select-one-player-game');
const twoPlayerGameBtn = document.querySelector('#select-two-player-game');

const optionsScreen = document.querySelector('#options-screen');
const optionsScreenForm = document.querySelector('#options-screen form');
const numCardsRange = document.querySelector('input[type="range"]');
const currentNumCardsMsg = document.querySelector('#current-selection');
const onePlayerOptions = document.querySelector('#one-player-options');
const twoPlayerOptions = document.querySelector('#two-player-options');
const name = document.querySelector('#name');
const name1 = document.querySelector('#name1');
const name2 = document.querySelector('#name2');
const onePlayerStartBtn = document.querySelector('#start-one-player-game');
const twoPlayerStartBtn= document.querySelector('#start-two-player-game');

const lowScoreTxt = document.querySelector('#lowscore-text');
const upperTxt = document.querySelector('#upper-text');

const gameContainer = document.querySelector('#game');

const scoreBoard = document.querySelector('#score-board');
const player1Score = document.querySelector('#player1-score');
const player2Score = document.querySelector('#player2-score');

const lowerTxt = document.querySelector('#lower-text');
const homeBtn = document.querySelector('#home');
const playAgainBtn = document.querySelector('#play-again');

// Hide all content other than start screen
optionsScreen.style.display = "none";
onePlayerOptions.style.display = "none";
twoPlayerOptions.style.display = "none";
lowScoreTxt.style.display = "none";
scoreBoard.style.display = "none";
player1Score.style.display = "none";
player2Score.style.display = "none";
upperTxt.style.display = "none";
lowerTxt.style.display = "none";
homeBtn.style.display = "none";
playAgainBtn.style.display = "none";

// List of available cards
const characters = [
    "blackpanther",
    "blackwidow",
    "cptamerica",
    "drax",
    "drstrange",
    "falcon",
    "gamora",
    "hulk",
    "ironman",
    "mantis",
    "nebula",
    "okoye",
    "rocketgroot",
    "scarletwitch",
    "shuri",
    "spiderman",
    "starlord",
    "thor",
    "vision",
    "warmachine",
    "wintersoldier",
    "wong"
];

// Select num cards from the array of all cards
function selectCards(array, num) {
    const arrayCopy = array.slice();
    const selectedCards = [];

    for (let i = 0; i < num; i++) {
        cardIndex = Math.floor(Math.random() * arrayCopy.length);
        selectedCards.push(arrayCopy[cardIndex]);
        arrayCopy.splice(cardIndex, 1);
    }

    const cards = selectedCards.concat(selectedCards);
    return cards;
}

// Helper function to shuffle an array based on an algorithm called Fisher Yates
function shuffle(array) {
    let counter = array.length;

  // While there are elements in the array
     while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

// Loop over the array of shuffled cards to create a new div for each card.
// Gives each card a class with the value of the character's name
// Adds an event listener for a click for each card
function createDivsForCards(cardArray, evtListernerFn) {
    for (let card of cardArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(card);
        newDiv.addEventListener("click", evtListernerFn);
    
        gameContainer.append(newDiv);
    }
}

// Handle card-clicks for a one-player game
let currentAttempt = [];
let matchedCards = [];
let numGuesses = 0;
 
function handleCardClick(event) {

    // Prevent an already matched card from being selected
    if (!matchedCards.includes(event.target)) {

        // First card of the turn
        if (currentAttempt.length === 0) {
            event.target.style.backgroundImage = `url("images/${event.target.className}.jpeg")`;
            event.target.style.backgroundSize = "cover";
            event.target.style.textAlign = "center";
            currentAttempt[0] = event.target;

        // Second card of the turn
        } else if (currentAttempt.length === 1 && currentAttempt[0] !== event.target) {
            event.target.style.backgroundImage = `url("images/${event.target.className}.jpeg")`;
            event.target.style.backgroundSize = "cover";
            event.target.style.textAlign = "center";
            currentAttempt[1] = event.target;
            numGuesses++;
           
            player1Score.innerText = `Number of guesses: ${numGuesses}`;
        
            // The two cards are a match
            if (currentAttempt[0].className === currentAttempt[1].className) {
                matchedCards.push(currentAttempt[0], currentAttempt[1]);
                
                // All cards have been matched
                if (matchedCards.length === shuffledCards.length) {

                    setTimeout (() => {

                        // Check if score against saved low score for current number of cards
                        // Save if new low score
                        let lowscoreFound = false;
                        for (let i=0; i < lowScoreArray.length; i++) {
                            if (lowScoreArray[i].numCards == numCards) { 
                                lowscoreFound = true;
                                if (lowScoreArray[i].score > numGuesses) {
                                    lowScoreArray[i].score = numGuesses;
                                    localStorage.setItem('lowscore', JSON.stringify(lowScoreArray));
                                    lowerTxt.innerText = `New low score of ${numGuesses}`;
                                } else {
                                    lowerTxt.innerText = `All cards matched`;
                                }
                            }
                        }  
                        
                        // Save score as new low score if no previous low score found for current number of cards
                        if (lowscoreFound===false) {
                            let newLowScore = {
                                'numCards' : numCards,
                                'score' : numGuesses
                            }
                            lowScoreArray.push(newLowScore);
                            localStorage.setItem('lowscore', JSON.stringify(lowScoreArray));
                            lowerTxt.innerText = `New low score of ${numGuesses}`;
                        }

                        lowerTxt.style.display = "block";
                        playAgainBtn.style.display = "block";
                    }, 500)
          
                // If all cards haven't been matched yet, start a new turn    
                } else {
                    currentAttempt = [];
                }
            
            // The cards are not a match so turn them back over after a 1 second delay
            } else {
                setTimeout(() => {
                    currentAttempt[0].style.backgroundImage = 'none';
                    currentAttempt[0].style.background = "linear-gradient(61deg, rgba(30,19,212,1) 0%, rgba(77,138,181,1) 0%, rgba(30,38,57,1) 100%)";

                    currentAttempt[1].style.backgroundImage = 'none';
                    currentAttempt[1].style.background = "linear-gradient(61deg, rgba(30,19,212,1) 0%, rgba(77,138,181,1) 0%, rgba(30,38,57,1) 100%)";

                    currentAttempt = [];                    
                }, 1000);
            }
        }
    }
}


// Handle card-clicks for a two-player game
let player1turn = true;
let plyr1score = 0;
let plyr2score = 0;

function handleCardClickTwoPlayer(event) {

    // Prevent an already matched card from being selected
    if (!matchedCards.includes(event.target)) {

        // First card of the turn
        if (currentAttempt.length === 0) {
            event.target.style.backgroundImage = `url("images/${event.target.className}.jpeg")`;
            event.target.style.backgroundSize = "cover";
            event.target.style.textAlign = "center";
            currentAttempt[0] = event.target;

        // Second card of the turn
        } else if (currentAttempt.length === 1 && currentAttempt[0] !== event.target) {
            event.target.style.backgroundImage = `url("images/${event.target.className}.jpeg")`;
            event.target.style.backgroundSize = "cover";
            event.target.style.textAlign = "center";
            currentAttempt[1] = event.target;

            // The two cards are a match
            if (currentAttempt[0].className === currentAttempt[1].className) {
                matchedCards.push(currentAttempt[0], currentAttempt[1]);

                // If it is Player 1's turn, give Player 1 a point and style the cards red
                if (player1turn) {
                    upperTxt.innerText = `${name1.value}, you made a match!`;
                    plyr1score++;
                    player1Score.innerText = `${name1.value}: ${plyr1score}`;
                
                    setTimeout(() => {
                        currentAttempt[0].style.backgroundImage = 'none';
                        currentAttempt[0].classList.add('player1card');

                        currentAttempt[1].style.backgroundImage = 'none';
                        currentAttempt[1].classList.add('player1card');
                    }, 1000);

                // If it is Player 2's turn, give Player 2 a point and style the cards blue
                } else {
                    upperTxt.innerText = `${name2.value}, you made a match!`;  
                    plyr2score++;
                    player2Score.innerText = `${name2.value}: ${plyr2score}`; 

                    setTimeout(() => {
                        currentAttempt[0].style.backgroundImage = 'none';
                        currentAttempt[0].classList.add('player2card');

                        currentAttempt[1].style.backgroundImage = 'none';
                        currentAttempt[1].classList.add('player2card');
                    }, 1000);
                }
                
                // All cards have been matched
                if (matchedCards.length === shuffledCards.length) {
                    setTimeout (() => { 
                        upperTxt.innerText = `All cards have been matched`;
                        if (plyr1score > plyr2score) {
                            lowerTxt.innerText = `${name1.value} won!`;
                        } else if (plyr1score < plyr2score) {
                            lowerTxt.innerText = `${name2.value} won!`;
                        } else {
                            lowerTxt.innerText = `It was a tie!`;
                        }
                        lowerTxt.style.display = "block";
                        playAgainBtn.style.display = "block";
                    }, 1000)

                // If all cards haven't been matched yet, give the current player a new turn    
                } else {
                    setTimeout (() => { 
                        if (player1turn) {
                            upperTxt.innerText = `Please go again, ${name1.value}`;
                            currentAttempt = [];
                        } else {
                            upperTxt.innerText = `Please go again, ${name2.value}`;
                            currentAttempt = []; 
                        }

                    }, 1000);
                }
       
            // If the cards aren't a match, turn the cards back over after a delay and switch players   
            } else {
                player1turn = !player1turn;
                
                setTimeout(() => {
                    if (player1turn) {
                        upperTxt.innerText = `Not a match`;
                    } else {
                        upperTxt.innerText = `Not a match`;
                    }

                    setTimeout(() => {
                        currentAttempt[0].style.backgroundImage = "linear-gradient(61deg, rgba(30,19,212,1) 0%, rgba(77,138,181,1) 0%, rgba(30,38,57,1) 100%)";
                        currentAttempt[1].style.backgroundImage= "linear-gradient(61deg, rgba(30,19,212,1) 0%, rgba(77,138,181,1) 0%, rgba(30,38,57,1) 100%)";

                        currentAttempt = [];

                        if (player1turn) {
                            upperTxt.innerText = `${name1.value}'s turn.`;
                        } else {
                            upperTxt.innerText = `${name2.value}'s turn.`;
                        }
                    }, 1000);

                }, 500);
            }
        }
    }
}

// Reset the game, taking the user back to the start screen
homeBtn.addEventListener('click', function () {

    // Remove current cards div from the game div
    while (gameContainer.firstChild) {
        gameContainer.firstChild.remove();
    }

    gameTitle.classList.remove("small");

    startScreen.style.display = "block";

    optionsScreen.style.display = "none";
    onePlayerOptions.style.display = "none";
    twoPlayerOptions.style.display = "none";

    homeBtn.style.display = "none";
    scoreBoard.style.display = "none";
    player1Score.style.display = "none";
    player2Score.style.display = "none";

    lowScoreTxt.style.display = 'none';
    upperTxt.style.display = 'none';
    lowerTxt.style.display = "none";

    playAgainBtn.style.display = "none";

    currentAttempt = [];
    matchedCards = [];
}
)

// Play again using current settings but with new cards
playAgainBtn.addEventListener('click', function () {
    while (gameContainer.firstChild) {
        gameContainer.firstChild.remove();
    }

    currentAttempt = [];
    matchedCards = [];  

    let deck = selectCards(characters, numCards/2);
    shuffledCards = shuffle(deck);

    if (onePlayerGame === true) {
        let found = false;
        for (let i=0; i < lowScoreArray.length; i++) {
          if (lowScoreArray[i].numCards === numCards) {
            lowScoreTxt.innerText = `Low score: ${lowScoreArray[i].score}`;
            lowScoreTxt.style.display = 'block';
            found = true;
          } 
        }  

        createDivsForCards(shuffledCards, handleCardClick);

        numGuesses = 0;
        player1Score.innerText = `Number of guesses: ${numGuesses}`;

    } else {
        createDivsForCards(shuffledCards, handleCardClickTwoPlayer);

        plyr1score = 0;
        plyr2score = 0;
        player1Score.innerText = `${name1.value}: 0`
        player2Score.innerText = `${name2.value}: 0`

        player1turn = true;
        upperTxt.innerText = `${name1.value}'s turn`;
    }

    lowerTxt.style.display = "none";
    playAgainBtn.style.display = "none";
}
)

// Allow the user to choose a one or two player game from the start screen
startScreenForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    startScreen.style.display = "none";
    optionsScreen.style.display = "block";
    gameTitle.classList.add("small");

    if (evt.submitter === onePlayerGameBtn) {
        onePlayerOptions.style.display = "block";
    } else if (evt.submitter === twoPlayerGameBtn) {
        twoPlayerOptions.style.display = "block";
    }

    currentNumCardsMsg.innerText = `${numCardsRange.value} cards`;

    homeBtn.style.display = "block";
})


// Change the display of the number of cards selected when the range input changes
numCardsRange.addEventListener('change', function () {
    const currentNumCards = numCardsRange.value;
    currentNumCardsMsg.innerText =  `${currentNumCards} cards`;
}
)


// Allow the user to select the number of cards for either a one or two person game
// Allow the user to type player name(s)
// Set up the one- or two-player game board

let onePlayerGame;
let shuffledCards;
let numCards;
let lowScoreArray = JSON.parse(localStorage.getItem('lowscore')) || [];

optionsScreenForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    optionsScreen.style.display = "none";
    scoreBoard.style.display = "block";
    player1Score.style.display = "inline-block";

    numCards = parseInt(numCardsRange.value);

    // Select the character cards that will be used for this game and shuffle them
    let deck = selectCards(characters, numCards/2);
    shuffledCards = shuffle(deck);

    currentAttempt = [];
    matchedCards = [];
    
    //Set up the one-player game screen
    if (evt.submitter === onePlayerStartBtn) {
        onePlayerGame = true;
        onePlayerOptions.style.display = "none";

        createDivsForCards(shuffledCards, handleCardClick);

        numGuesses = 0;
        player1Score.innerText = `Number of guesses: ${numGuesses}`;
        // player2Score.style.display = "none";

        let found = false;
        for (let i=0; i < lowScoreArray.length; i++) {
          if (lowScoreArray[i].numCards === numCards) {
            lowScoreTxt.innerText = `Low score: ${lowScoreArray[i].score}`;
            lowScoreTxt.style.display = 'block';
            found = true;
          } 
        }  
        if (found === false) {
          lowScoreTxt.style.display = 'none';
        }

    //Set up the two-player game screen
    } else if (evt.submitter === twoPlayerStartBtn) {
        onePlayerGame = false;
        twoPlayerOptions.style.display = "none";

        createDivsForCards(shuffledCards, handleCardClickTwoPlayer);
    
        if (name1.value === "") {
            name1.value = "Player 1";
        }

        if (name2.value === "") {
            name2.value = "Player 2";
        }

        plyr1score = 0;
        plyr2score = 0;
        player1Score.innerText = `${name1.value}: 0`
        player2Score.innerText = `${name2.value}: 0`

        player2Score.style.display = 'inline-block';

        player1turn = true;
        upperTxt.innerText = `${name1.value}'s turn`;
        upperTxt.style.display = "block";
    }
}
)

