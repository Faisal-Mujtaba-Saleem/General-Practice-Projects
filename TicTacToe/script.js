console.log("Welcome to myTicTacToe game");

const clickAudio = new Audio('ting.mp3');
const gameover_audio = new Audio('gameover.mp3');

const gameBox = document.getElementsByClassName('game-box');
const gameInfo = document.getElementById('gameInfo');
const excitedImg = document.getElementById('excited-img');
const ResetBtn = document.querySelector('button[type=reset]');

let turn = 'X';
let is_GameOver = false;

// Function to change the turn ...
const changeTurn = () => {
    turn = turn === 'X' ? turn = 0 : turn = 'X';
    gameInfo.innerText = `Turn for ${turn}`
    return turn;
}

// Winnining Logic Function...
function Win() {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    wins.forEach(elem => {
        if (
            (gameBox[elem[0]].firstElementChild.innerText === gameBox[elem[1]].firstElementChild.innerText)
            &&
            (gameBox[elem[1]].firstElementChild.innerText === gameBox[elem[2]].firstElementChild.innerText)
            &&
            (gameBox[elem[0]].firstElementChild.innerText !== '')
        ) {
            changeTurn();
            gameInfo.innerText = `${turn} won`
            gameover_audio.play();
            excitedImg.classList.remove('w-0');
            excitedImg.style.transition = "all 2s ease-in-out";
            is_GameOver = true;
        } else {
            console.log(gameBox[elem[0]]);
        }
    });
}

// Game Logic ...
Array.from(gameBox).forEach(element => {
    element.addEventListener('click', (e) => {
        // Logic to play audio on clicking on each game box...
        clickAudio.play();


        // Calling changeTurn() function to change the turn each time the player click game box...
        e.target.firstElementChild.innerText = turn;
        changeTurn();

        // Calling Win() function to announce the winner of the game...
        Win();

        if (is_GameOver === true) {
            setTimeout(() => {
                alert(`The winner of the game is "${turn} !\nReset the game and Play again..."`);
                is_GameOver = false;
            }, 2000);
        }
    })
});

// Reset Button logic...
ResetBtn.onclick = () => {
    turn = 'X';
    gameInfo.innerText = `Turn for ${turn}`;
    excitedImg.classList.toggle('w-0');

    Array.from(gameBox).forEach(element => {
        element.firstElementChild.innerText = '';
    });
}