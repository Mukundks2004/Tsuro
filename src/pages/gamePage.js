import { Game } from "../game.js";
import { Player } from "../player.js";
import boardSketch from "../boardSketch.js";
import inventorySketch from "../inventorySketch.js";

//TODO: reorder this shitstorm

//Ohh this is so poorly ordered
const playerScoreTable = document.getElementById('playerScoreTable');
const highestScoreMessage = document.getElementById('highestScoreMessage');
const submitScoreButton = document.getElementById('submitScoreButton');


// highestScoreMessage.innerText = "Do you want to submit your score to the global leaderboard?";
submitScoreButton.addEventListener("click", async () => {
    console.log("submitting score user and score: ", window.LongPlayer, window.TopScore);
    submitScoreButton.hidden = true;
    highestScoreMessage.hidden = true;
    let data = (await getHighScore())['highscores'];
    let newEntry = {username: window.LongPlayer, score: window.TopScore, datetime: getFormattedDate()};
    data.push(newEntry);
    data.sort((a, b) => b.score - a.score);
    updateHighScore(data.slice(0, 5));
});

function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

function initGame(playersData) {
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
    const myPlayers = window.allPlayerData;
    const highestScore = myPlayers.reduce((max, current) => {
        return (current.dragon.pathsTravelled > max.dragon.pathsTravelled) ? current : max;
      }, myPlayers[0]);
    window.LongPlayer = highestScore.playerName;
    window.TopScore = highestScore.dragon.pathsTravelled;

    //Change to 70+ (so there can only be 1) and make that a const
    if (parseInt(window.TopScore) > 65) {
        highestScoreMessage.hidden = false;
        submitScoreButton.hidden = false;
        highestScoreMessage.innerText = `Do you want to submit your (${highestScore.playerName}) score (${highestScore.dragon.pathsTravelled}) to the global leaderboard?`;
    }
}

async function getHighScore() {
    const url = 'https://api.jsonbin.io/v3/b/6706693dad19ca34f8b57cdb'
    const apiKey = '$2a$10$b1XI2jMm5zWidjYmu7hpXeuUNfglKuktZCzWGIzNnSXY1xPZInmh.';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey
        }
      });
    const data = await response.json();
    return data.record;
}

async function updateHighScore(newScore) {
    const url = 'https://api.jsonbin.io/v3/b/6706693dad19ca34f8b57cdb'
    const apiKey = '$2a$10$b1XI2jMm5zWidjYmu7hpXeuUNfglKuktZCzWGIzNnSXY1xPZInmh.';    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey
      },
      body: JSON.stringify({
        highscores: newScore
      })
    });
    
    return response.json();
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
        initGame(playersData);
        // document.getElementById("rotateButton").addEventListener("click", rotateCurrentPlayer);
        updateCurrentPlayerDisplay();
    
        new p5((s) => boardSketch(s, updateCurrentPlayerDisplay), 'boardContainer');
        new p5((s) => inventorySketch(s), 'inventoryContainer');
    }

};

