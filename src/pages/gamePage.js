import { Game } from "../game.js";
import { Player } from "../player.js";
import boardSketch from "../boardSketch.js";


//TODO: reorder this shitstorm

function initGame() {
    let players = [new Player('black', 0, "fred"), new Player('blue', 1, "george"), new Player('yellow', 2, "harry"), new Player('orange', 3, "velma")];
    window.game = new Game(players);
}

const rotateCurrentPlayer = () => {
    window.game.nextTurn();
    updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
    const currentPlayer = window.game.getCurrentPlayer();
    document.getElementById('currentPlayerDisplay').innerText = `Current Player Number: ${currentPlayer.number}, Name: ${currentPlayer.playerName}`;
}

const modal = document.getElementById("modal");
const winnerMessage = document.getElementById("winnerMessage");
const closeModal = document.getElementById("closeModal");
const resetButton = document.getElementById("resetButton");
const gameOverButton = document.getElementById("gameOverButton");

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

gameOverButton.addEventListener("click", function() {openModal("random test")});

closeModal.addEventListener("click", closeModalFunc);

resetButton.addEventListener("click", () => {
    console.log("Game reset logic goes here.");
    closeModalFunc();
    initGame();
    
    updateCurrentPlayerDisplay();
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModalFunc();
    }
});

initGame()
document.getElementById("rotateButton").addEventListener("click", rotateCurrentPlayer);
updateCurrentPlayerDisplay();

new p5((s) => boardSketch(s, updateCurrentPlayerDisplay), 'boardContainer');