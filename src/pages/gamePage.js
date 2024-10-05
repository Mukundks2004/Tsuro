import { Game } from "../game.js";
import { Player } from "../player.js";


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

initGame()
document.getElementById("rotateButton").addEventListener("click", rotateCurrentPlayer);
updateCurrentPlayerDisplay();