function itIsYourTurn() {
  return true;
}

const boardSketch = (s) => {
  let board = []
  let tilePercent = 0.95;
  let tileSize = 90;

  s.setup = () => {
    for (let i = 0; i < 6; i++) {
      board.push([]);
      for (let j = 0; j < 6; j++) {
        board[i].push(0);
      }
    }
    s.createCanvas(6 * tileSize, 6 * tileSize);
  };

  s.draw = () => {
    let xCoord = Math.floor(s.mouseX / tileSize);
    let yCoord = Math.floor(s.mouseY / tileSize);
    s.background('saddlebrown');
    s.strokeWeight(3);
    s.stroke('saddlebrown');
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        let tile = board[i][j];
        if (tile === 0) {
          if (xCoord === j && yCoord === i && itIsYourTurn()) {
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