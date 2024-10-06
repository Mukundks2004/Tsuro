const playerCountSelect = document.getElementById('playerCount');
const playerTableDiv = document.getElementById('playerTable');
const startButton = document.getElementById('gotoGamePage');
generatePlayerTable(parseInt(playerCountSelect.value));

playerCountSelect.addEventListener('change', function () {
    const playerCount = parseInt(playerCountSelect.value);
    generatePlayerTable(playerCount);
});

startButton.addEventListener('click', function () {
    const playerRows = document.querySelectorAll('#playerTable tr:not(:first-child)');
    const players = [];

    playerRows.forEach((row, index) => {
        const colorSelect = row.querySelector('td:nth-child(2) select');
        const nameInput = row.querySelector('td:nth-child(3) input');

        const color = colorSelect.value;
        const name = nameInput.value.trim() || nameInput.placeholder;

        players.push({
            player: `player${index + 1}`,
            color: color,
            name: name
        });
    });

    localStorage.setItem('playersData', JSON.stringify(players));

    window.location.href = 'public/gamepage.html';
});

function generatePlayerTable(playerCount) {
    playerTableDiv.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Player</th>
            <th>Color</th>
            <th>Name</th>
        </tr>
    `;

    for (let i = 1; i <= playerCount; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Player ${i}</td>
            <td>
                <select>
                    <option value="aqua">Aqua</option>
                    <option value="darkred">Dark red</option>
                    <option value="lime">Lime</option>
                    <option value="deeppink">Pink</option>
                    <option value="lightgrey">Grey</option>
                    <option value="purple">Purple</option>
                    <option value="yellow">Yellow</option>
                </select>
            </td>
            <td><input type="text" placeholder=CoolGuy${i}></td>
        `;
        table.appendChild(row);
    }

    playerTableDiv.appendChild(table);
}