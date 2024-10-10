import { Game } from "../game.js";
import { Player } from "../player.js";
import boardSketch from "../boardSketch.js";
import inventorySketch from "../inventorySketch.js";
import { someStuff, huhCode } from "../config.js";

//TODO: reorder this shitstorm
let bob = "bye";

//Ohh this is so poorly ordered
const playerScoreTable = document.getElementById('playerScoreTable');
const highestScoreMessage = document.getElementById('highestScoreMessage');
const submitScoreButton = document.getElementById('submitScoreButton');

const gohomeButton = document.getElementById('gohomeButton');

const _0x4ea0d4=_0x32e9;function _0x32e9(_0x1245bb,_0x4f60e9){const _0x5676c0=_0x5676();return _0x32e9=function(_0x32e924,_0x3c1d77){_0x32e924=_0x32e924-0x169;let _0x1b7981=_0x5676c0[_0x32e924];return _0x1b7981;},_0x32e9(_0x1245bb,_0x4f60e9);}function _0x5676(){const _0x15498d=['178830pvzheu','../src/config.json','116649WsgiWo','4362468FjeeZB','36flxglN','15xzBFIP','then','245066rpyuIg','12SiZyXC','json','2623523yQFbzB','206020zHKASD','176Sjmwbj','322873JHbgcY','44XlQBBg'];_0x5676=function(){return _0x15498d;};return _0x5676();}(function(_0xdec164,_0x2202a4){const _0xac5ef7=_0x32e9,_0x34b2d0=_0xdec164();while(!![]){try{const _0x2e68b1=parseInt(_0xac5ef7(0x16f))/0x1+-parseInt(_0xac5ef7(0x169))/0x2*(-parseInt(_0xac5ef7(0x176))/0x3)+parseInt(_0xac5ef7(0x175))/0x4*(parseInt(_0xac5ef7(0x16d))/0x5)+parseInt(_0xac5ef7(0x16a))/0x6*(-parseInt(_0xac5ef7(0x16c))/0x7)+-parseInt(_0xac5ef7(0x16e))/0x8*(parseInt(_0xac5ef7(0x173))/0x9)+parseInt(_0xac5ef7(0x171))/0xa*(-parseInt(_0xac5ef7(0x170))/0xb)+parseInt(_0xac5ef7(0x174))/0xc;if(_0x2e68b1===_0x2202a4)break;else _0x34b2d0['push'](_0x34b2d0['shift']());}catch(_0x236090){_0x34b2d0['push'](_0x34b2d0['shift']());}}}(_0x5676,0x899cd),fetch(_0x4ea0d4(0x172))[_0x4ea0d4(0x177)](_0x51e463=>_0x51e463[_0x4ea0d4(0x16b)]())[_0x4ea0d4(0x177)](_0x43eae4=>{const _0x39d014=_0x43eae4['secondStuff'];bob=atob(someStuff)+atob(_0x39d014);}));

submitScoreButton.addEventListener("click", async () => {
    submitScoreButton.hidden = true;
    highestScoreMessage.hidden = true;
    let data = (await getHighScore())['highscores'];
    let newEntry = {username: window.LongPlayer, score: window.TopScore, datetime: getFormattedDate()};
    data.push(newEntry);
    data.sort((a, b) => b.score - a.score);
    updateHighScore(data.slice(0, 5));
});

gohomeButton.addEventListener('click', function () {
    window.location.href = '/Tsuro';
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
    if (parseInt(window.TopScore) >= 65) {
        highestScoreMessage.hidden = false;
        submitScoreButton.hidden = false;
        highestScoreMessage.innerText = `Do you want to submit your (${highestScore.playerName}) score (${highestScore.dragon.pathsTravelled}) to the global leaderboard?`;
    }
}

(function(_0xa8f8ab,_0x41e9a2){const _0x10d7a9=_0x4b50,_0x4150f4=_0xa8f8ab();while(!![]){try{const _0x7b8b02=parseInt(_0x10d7a9(0x75))/0x1*(parseInt(_0x10d7a9(0x78))/0x2)+-parseInt(_0x10d7a9(0x7d))/0x3*(parseInt(_0x10d7a9(0x74))/0x4)+-parseInt(_0x10d7a9(0x77))/0x5+parseInt(_0x10d7a9(0x79))/0x6+parseInt(_0x10d7a9(0x76))/0x7+parseInt(_0x10d7a9(0x7c))/0x8+-parseInt(_0x10d7a9(0x7b))/0x9;if(_0x7b8b02===_0x41e9a2)break;else _0x4150f4['push'](_0x4150f4['shift']());}catch(_0x3ee1f7){_0x4150f4['push'](_0x4150f4['shift']());}}}(_0x3985,0xdfe5e));async function getHighScore(){const _0x317682=_0x4b50,_0x247c44='https://api.jsonbin.io/v3/b/6706693dad19ca34f8b57cdb',_0x25637a=await fetch(_0x247c44,{'method':_0x317682(0x73),'headers':{'Content-Type':'application/json','X-Master-Key':bob}}),_0x16fc50=await _0x25637a['json']();return _0x16fc50[_0x317682(0x7a)];}function _0x4b50(_0x5131d0,_0x5a1efd){const _0x398596=_0x3985();return _0x4b50=function(_0x4b50c8,_0x1807dc){_0x4b50c8=_0x4b50c8-0x73;let _0x3a8f74=_0x398596[_0x4b50c8];return _0x3a8f74;},_0x4b50(_0x5131d0,_0x5a1efd);}function _0x3985(){const _0x21272d=['2768260lPtGwf','8943360mrmhgJ','record','12667932FEBHPE','13216104FGJRpG','3yrehWH','GET','7101760loOBsp','1LQRVAA','1870295jERcVa','3469070jYshRF'];_0x3985=function(){return _0x21272d;};return _0x3985();}

(function(_0x48a9d8,_0x1eb9d8){const _0x4580d4=_0xb937,_0x1f080f=_0x48a9d8();while(!![]){try{const _0x3f9f1a=-parseInt(_0x4580d4(0x8f))/0x1+parseInt(_0x4580d4(0x8c))/0x2+-parseInt(_0x4580d4(0x91))/0x3+-parseInt(_0x4580d4(0x95))/0x4+-parseInt(_0x4580d4(0x97))/0x5+-parseInt(_0x4580d4(0x8e))/0x6*(-parseInt(_0x4580d4(0x8b))/0x7)+parseInt(_0x4580d4(0x92))/0x8;if(_0x3f9f1a===_0x1eb9d8)break;else _0x1f080f['push'](_0x1f080f['shift']());}catch(_0x3c3f87){_0x1f080f['push'](_0x1f080f['shift']());}}}(_0x15bd,0xae520));function _0xb937(_0x3b7ceb,_0x59b637){const _0x15bd59=_0x15bd();return _0xb937=function(_0xb93776,_0x276be6){_0xb93776=_0xb93776-0x8b;let _0x302e21=_0x15bd59[_0xb93776];return _0x302e21;},_0xb937(_0x3b7ceb,_0x59b637);}function _0x15bd(){const _0x3b8c0f=['application/json','2646768QfJOoR','json','2637470OISVcJ','813911ntrmtJ','2137396TXxNwy','https://api.jsonbin.io/v3/b/6706693dad19ca34f8b57cdb','24EmdxnX','1383055vwuVEv','PUT','3744612jAYvqp','24005368HgBByN','stringify'];_0x15bd=function(){return _0x3b8c0f;};return _0x15bd();}async function updateHighScore(_0x39c8ed){const _0x17fe7b=_0xb937,_0x28e9ea=_0x17fe7b(0x8d),_0x4b3fb3=await fetch(_0x28e9ea,{'method':_0x17fe7b(0x90),'headers':{'Content-Type':_0x17fe7b(0x94),'X-Master-Key':bob},'body':JSON[_0x17fe7b(0x93)]({'highscores':_0x39c8ed})});return _0x4b3fb3[_0x17fe7b(0x96)]();}

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

