import { Game } from "../game.js";
import { Player } from "../player.js";
import boardSketch from "../boardSketch.js";
import inventorySketch from "../inventorySketch.js";

//TODO: reorder this shitstorm

//Ohh this is so poorly ordered

function initGame(playersData) {
    console.log(playersData);
    const playersObjects = playersData.map((data, index) => {
        return new Player(data.color, index, data.name);
    });
    window.game = new Game(playersObjects);
}

const rotateCurrentPlayer = () => {
    window.game.nextTurn();
    updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
    const currentPlayer = window.game.getCurrentPlayer();
    document.getElementById('currentPlayerDisplay').innerText = `Current Player Number: ${currentPlayer.number + 1}, Name: ${currentPlayer.playerName}`;
}

const modal = document.getElementById("modal");
const winnerMessage = document.getElementById("winnerMessage");
const closeModal = document.getElementById("closeModal");
const resetButton = document.getElementById("resetButton");
// const gameOverButton = document.getElementById("gameOverButton");

function openModal(winnerName) {
    modal.style.display = "block";
    winnerMessage.innerText = "The winner of the game is: " + winnerName + "!";
}

function closeModalFunc() {
    modal.style.display = "none";
}

const gameIsOver = () => {
    openModal(window.winningPlayerName);
};

window.gameIsOver = gameIsOver;

// gameOverButton.addEventListener("click", function() {openModal("random test")});

closeModal.addEventListener("click", closeModalFunc);

resetButton.addEventListener("click", () => {
    console.log("Game reset logic goes here.");
    closeModalFunc();
    initGame(JSON.parse(localStorage.getItem('playersData')));
    
    updateCurrentPlayerDisplay();
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModalFunc();
    }
});

window.onload = function() {
    const playersData = JSON.parse(localStorage.getItem('playersData'));

    if (playersData) {
        console.log('Players Data:', playersData);
        console.log("creating game");
        initGame(playersData);
        // document.getElementById("rotateButton").addEventListener("click", rotateCurrentPlayer);
        updateCurrentPlayerDisplay();
    
        new p5((s) => boardSketch(s, updateCurrentPlayerDisplay), 'boardContainer');
        new p5((s) => inventorySketch(s), 'inventoryContainer');
    }

};

