import { someStuff, huhCode } from "../config.js";

const homeButton = document.getElementById('goHomeButton');
const printDeetsButton = document.getElementById('printDeetsButton');
const playerHighscoresTable = document.getElementById('playerHighscoresTable');
let bob = "hi";

fetch('../src/config.json')
.then(response => response.json())
.then(data => {
    const bits = data.secondStuff;
    bob = atob(someStuff) + atob(bits);
  })

homeButton.addEventListener('click', function () {
    window.location.href = '/';
});

async function getHighScore() {
    const url = 'https://api.jsonbin.io/v3/b/6706693dad19ca34f8b57cdb';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': bob
        }
      });
    const data = await response.json();
    return data.record;
}

function generatePlayerTable(dataObject) {
    playerHighscoresTable.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Player Name</th>
            <th>Score</th>
            <th>Date</th>
        </tr>
    `;

    //Put 5 in consts in FE
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dataObject[i].username}</td>
            <td>${dataObject[i].score}</td>
            <td>${dataObject[i].datetime}</td>
        `;
        table.appendChild(row);
    }

    playerHighscoresTable.appendChild(table);
}
  

printDeetsButton.addEventListener('click', async function () {
    let data = await getHighScore();
    generatePlayerTable(data['highscores']);
})
