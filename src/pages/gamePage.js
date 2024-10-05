import { Game } from "../game.js";
import { Player } from "../player.js";
import boardSketch from "../boardSketch.js";


//TODO: reorder this shitstorm

function initGame() {
    let players = [new Player('black', 0), new Player('blue', 1), new Player('yellow', 2)];
    window.game = new Game(players);
}

const rotateCurrentPlayer = () => {
    window.game.nextTurn();
    updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
    const currentPlayer = window.game.getCurrentPlayer();
    document.getElementById('currentPlayerDisplay').innerText = `Current Player: ${currentPlayer.color} ${currentPlayer.number}`;
}

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const resetButton = document.getElementById("resetButton");
const gameOverButton = document.getElementById("gameOverButton");

function openModal() {
    modal.style.display = "block";
}

function closeModalFunc() {
    modal.style.display = "none";
}

const gameIsOver = () => {
    console.log("uwu game over");
    openModal();
};

window.gameIsOver = gameIsOver;

gameOverButton.addEventListener("click", openModal);

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