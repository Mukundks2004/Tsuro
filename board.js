function itIsYourTurn() {
  return true;
}

const boardSketch = (s) => {
  let board = []
  let tilePercent = 0.95;
  let tileSize = 90;
  let boardSize = 6;

  s.setup = () => {
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
    let xCoordOfTile = Math.floor(s.mouseX / tileSize);
    let yCoordOfTile = Math.floor(s.mouseY / tileSize);
    // board[yCoordOfTile][xCoordOfTile] = 
  }

  s.draw = () => {
    let xCoordOfTile = Math.floor(s.mouseX / tileSize);
    let yCoordOfTile = Math.floor(s.mouseY / tileSize);
    s.background('saddlebrown');
    s.noStroke();
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
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
      }
    }
  };
}

new p5(boardSketch, 'boardContainer');