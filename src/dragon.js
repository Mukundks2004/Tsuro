let totalCount = 0;
class Dragon {
  constructor(color) {
    this.Id = totalCount++;
    this.color = color;
    this.radius = 3;
    this.setRandomStartingPos();
    this.calculatePixelCoords();
    this.isPlaying = true;
  }

  calculatePixelCoords() {
    let xDispMag = ((1 - tileRatio) / 2) * tileSize + tileSize * 1/4;
    let xPixel = this.x * tileSize + ((this.vertex % 2 === 0) ? xDispMag : tileSize - xDispMag);
    let yPixel = this.y * tileSize + tileSize * (1 - tileRatio)/2;
    this.coords = new Point(xPixel, yPixel);
    
    for (let i = 0; i < Math.floor(this.vertex / 2); i++) {
      this.coords.rotateQuaterTurn((this.x + 0.5) * tileSize, (this.y + 0.5) * tileSize);
    }
  }

  isOffBoard(boardSize) {
    return (this.x < 0 || this.y < 0 || this.x >= boardSize || this.y >= this.boardSize);
  }

  setRandomStartingPos(boardSize) {
    let seed = Math.random();
    switch (this.Id) {
      case 0:
        this.y = 0
        this.x = Math.floor(6 * seed);
        this.vertex = Math.floor(2 * seed);
        break;
      case 1:
        this.y = Math.floor(6 * random());
        this.x = boardSize - 1;
        this.vertex = 2 + Math.floor(2 * seed);
        break;
      case 2:
        this.y = boardSize - 1;
        this.x = Math.floor(6 * random());
        this.vertex = 4 + Math.floor(2 * seed);
        break;
      case 3:
        this.y = Math.floor(6 * random());
        this.x = 0;
        this.vertex = 6 + Math.floor(2 * seed);
        break;
    }
  }
}