let board = []
  let tilePercent = 0.95;
  let tileSize = 90;
  let boardSize = 6;
  let lastClickedCoordX = -1;
  let lastClickedCoordY = -1;
  
function itIsYourTurn() {
  return true;
}

function sendGetTileQuery() {
  let event = new CustomEvent('boardClicked', {detail: null});
  document.dispatchEvent(event);
}

function updateBoard(event) {
  let newTile = event.detail;
  for (let path of newTile.paths) {
    path.moveBy(-1 * newTile.x * tileSize, 0);
    path.moveBy(lastClickedCoordX * tileSize, lastClickedCoordY * tileSize)
  }
  board[lastClickedCoordY][lastClickedCoordX] = event.detail;
  lastClickedCoordX = -1;
  lastClickedCoordY = -1;
}

const boardSketch = (s) => {
  s.setup = () => {
    document.addEventListener('tileDispatched', updateBoard);
    for (let i = 0; i < boardSize; i++) {
      board.push([]);
      for (let j = 0; j < boardSize; j++) {
        board[i].push(0);
      }
    }
    let boardCanvas = s.createCanvas(6 * tileSize, boardSize * tileSize);
    boardCanvas.mousePressed(boardClicked);
  };

  function boardClicked() {
    lastClickedCoordX = Math.floor(s.mouseX / tileSize);
    lastClickedCoordY = Math.floor(s.mouseY / tileSize);
    sendGetTileQuery();
  }

  s.draw = () => {
    let xCoordOfTile = Math.floor(s.mouseX / tileSize);
    let yCoordOfTile = Math.floor(s.mouseY / tileSize);
    s.background('saddlebrown');
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        s.noStroke();
        let tile = board[i][j];
        if (tile === 0) {
          if (xCoordOfTile === j && yCoordOfTile === i && itIsYourTurn()) {
            s.fill('sandybrown');
          }
          else {
            s.fill('chocolate');
          }
          s.square(tileSize * (j + (1 - tilePercent)/2), tileSize * (i + (1 - tilePercent)/2), tileSize * tilePercent, 0);
        }
        else {
          s.fill('maroon');
          s.noStroke();
          s.square(tileSize * (j + (1 - tilePercent)/2), tileSize * (i + (1 - tilePercent)/2), tileSize * tilePercent, 0);
          s.noFill();
          for (let path of tile.paths) {
            s.strokeWeight(3);
            s.stroke('wheat');
            s.bezier(path.points[0].x, path.points[0].y, path.points[1].x, path.points[1].y, path.points[2].x, path.points[2].y, path.points[3].x, path.points[3].y)
          }
        }
      }
    }
  };
}

new p5(boardSketch, 'boardContainer');