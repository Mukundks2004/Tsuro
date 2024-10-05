import { Game } from "../game.js";
import { Player } from "../player.js";
import boardSketch from "../boardSketch.js";

function initGame() {
    const players = [new Player('black', 0), new Player('blue', 1)];
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

gameOverButton.addEventListener("click", openModal);

closeModal.addEventListener("click", closeModalFunc);

resetButton.addEventListener("click", () => {
    // Your reset game logic here
    console.log("Game reset logic goes here.");
    closeModalFunc(); // Close the modal after resetting
});

// Close the modal if the user clicks anywhere outside of the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModalFunc();
    }
});

initGame()
document.getElementById("rotateButton").addEventListener("click", rotateCurrentPlayer);
updateCurrentPlayerDisplay();

new p5((s) => boardSketch(s, updateCurrentPlayerDisplay), 'boardContainer');