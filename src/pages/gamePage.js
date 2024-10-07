import { Game } from "../game.js";
import { Player } from "../player.js";
import boardSketch from "../boardSketch.js";
import inventorySketch from "../inventorySketch.js";

//TODO: reorder this shitstorm

//Ohh this is so poorly ordered
const playerScoreTable = document.getElementById('playerScoreTable');


function initGame(playersData) {
    //console.log(playersData);
    const playersObjects = playersData.map((data, index) => {
        return new Player(data.color, index, data.name);
    });
    window.game = new Game(playersObjects);
    window.allPlayerData = window.game.players;
    generateScoreTable();
}

const rotateCurrentPlayer = () => {
    window.game.nextTurn();
    updateCurrentPlayerDisplay();
}

function generateScoreTable() {
    let playerData = window.allPlayerData;
    console.log("data:");
    console.log(playerData);
    playerScoreTable.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Player</th>
            <th>Name</th>
            <th>Colour</th>
            <th>Score</th>
            <th>Is Alive?</th>
        </tr>
    `;

    for (let i = 0; i < playerData.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${playerData[i].playerName}</td>
            <td>${playerData[i].color}</td>
            <td>${playerData[i].dragon.pathsTravelled}</td>
            <td>${playerData[i].dragon.isPlaying}</td>
        `;
        table.appendChild(row);
    }

    playerScoreTable.appendChild(table);
}

function updateCurrentPlayerDisplay() {
    const currentPlayer = window.game.getCurrentPlayer();
    document.getElementById('currentPlayerDisplay').innerText = `It is currently Player ${currentPlayer.number + 1}: ${currentPlayer.playerName}'s turn!`;
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
window.updateScores = generateScoreTable;

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

