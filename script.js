document.addEventListener('DOMContentLoaded', function () {
  const playerCountSelect = document.getElementById('playerCount');
  const playerTableDiv = document.getElementById('playerTable');
  const startButton = document.getElementById('startButton');

  playerCountSelect.addEventListener('change', function () {
      const playerCount = parseInt(playerCountSelect.value);
      generatePlayerTable(playerCount);
  });

  startButton.addEventListener('click', function () {
    const playerNameInputs = document.querySelectorAll('#playerTable select');
    const selectedPlayerNames = Array.from(playerNameInputs).map(input => input.value);
    const queryParams = new URLSearchParams();
    selectedPlayerNames.forEach((color, index) => {
        queryParams.append(`player${index + 1}`, color);
    });
    const queryString = queryParams.toString();
    window.location.href = `gamepage.html?${queryString}`;
  });

  function generatePlayerTable(playerCount) {
      playerTableDiv.innerHTML = '';

      const table = document.createElement('table');
      table.innerHTML = `
          <tr>
              <th>Player</th>
              <th>Color</th>
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
          `;
          table.appendChild(row);
      }

      playerTableDiv.appendChild(table);
  }
});
