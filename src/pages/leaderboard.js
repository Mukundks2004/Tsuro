const homeButton = document.getElementById('goHomeButton');
const printDeetsButton = document.getElementById('printDeetsButton');
const playerHighscoresTable = document.getElementById('playerHighscoresTable');

homeButton.addEventListener('click', function () {
    window.location.href = '/';
});

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
    console.log("real data");
    console.log(data);
    let dataObject = [
        {username: "Mks", score: "9", datetime: "01-01-2000"},
        {username: "Andrew", score: "6", datetime: "01-01-2000"},
        {username: "Jacob", score: "4", datetime: "01-02-2000"},
        {username: "Phillip", score: "2", datetime: "01-01-2000"},
        {username: "Sally", score: "1", datetime: "01-01-2000"}
    ];
    generatePlayerTable(data['highscores']);
    //updateHighScore(dataObject);
    console.log("done");
})
