let tileSize = 90;
let tileRatio = 0.95;

function moduloStrict(a, n) {
  return ((a % n) + n) % n;
}

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.paths = [];
    this.initializePaths();
  }

  initializePaths() {
    this.name = this.getRandomTileName();
    this.setTileArcs(this.name);
  }

  rotateTile() {
    let newString = "";
    for (let i = 0; i < 8; i++) {
      newString += ((parseInt(this.name[i]) + 2) % 8).toString()
    }
    this.name = newString;
    this.setTileArcs(this.name);
  }

  getRandomTileName() {
    let options = [
      '01234567', '03612547', '04152637', '50147236', '70123456',
      '01452637', '01453672', '50142637', '02713546', 
      '03472651', '02134657', '12560437', '12560347',
      '71263504', '02734615'
    ]
    return options[Math.floor(Math.random() * options.length)];
  }

  setTileArcs(pathInfo) {
    this.paths = [];
    for (let i = 0; i < pathInfo.length; i++) {
      let first = parseInt(pathInfo[i]);
      let second = parseInt(pathInfo[i + 1]);
      if ((moduloStrict(second - first), 8) > 4) {
        [first, second] = [second, first];
      }
      let difference = moduloStrict(second - first, 8);
      let arc;

      if (first % 2 === 1) {
        difference = moduloStrict(-1 * difference, 8);
        arc = this.getArc(difference);
        arc.moveBy(this.x * tileSize, this.y * tileSize);
        arc.horizontallyFlipBezier((this.x + 0.5) * tileSize);
      }
      else {
        arc = this.getArc(difference);
        arc.moveBy(this.x * tileSize, this.y * tileSize);
      }

      arc.rotateBezier(Math.floor(first / 2), (this.x + 0.5) * tileSize, (this.y + 0.5) * tileSize);
      this.paths.push(arc);
      i++;
    }
  }

  getArc(curveType) {
    switch (curveType) {
      case 1:
        return new Bezier(tileSize * (1 - tileRatio)/2 + tileSize/4, 0, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize * 1/4, tileSize - tileSize * (1 - tileRatio)/2 - tileSize/4, tileSize * 1/4, tileSize - tileSize * (1 - tileRatio)/2 - tileSize/4, 0);
      case 2:
        return new Bezier(tileSize * (1 - tileRatio)/2 + tileSize/4, 0, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize, tileSize * (1 - tileRatio)/2 + tileSize/4);
      case 3:
        return new Bezier(tileSize * (1 - tileRatio)/2 + tileSize/4, 0, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize * 2/3, tileSize * 2/3, tileSize - tileSize * (1 - tileRatio)/2 - tileSize/4, tileSize, tileSize - tileSize * (1 - tileRatio)/2 - tileSize/4);
      case 4:
        return new Bezier(tileSize * (1 - tileRatio)/2 + tileSize/4, 0, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize * 1/2, tileSize - tileSize * (1 - tileRatio)/2 - tileSize/4, tileSize * 1/2, tileSize - tileSize * (1 - tileRatio)/2 - tileSize/4, tileSize);
      case 5:
        return new Bezier(tileSize * (1 - tileRatio)/2 + tileSize/4, 0, tileSize * (1 - tileRatio)/2 + tileSize/4, 0, tileSize * (1 - tileRatio)/2 + tileSize/4, 0, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize);
      case 6:
        return new Bezier(tileSize * (1 - tileRatio)/2 + tileSize/4, 0, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize - tileSize * (1 - tileRatio)/2 - tileSize/4, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize - tileSize * (1 - tileRatio)/2 - tileSize/4, 0, tileSize - tileSize * (1 - tileRatio)/2 - tileSize/4);
      case 7:
        return new Bezier(tileSize * (1 - tileRatio)/2 + tileSize/4, 0, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize * (1 - tileRatio)/2 + tileSize/4, tileSize * (1 - tileRatio)/2 + tileSize/4, 0, tileSize * (1 - tileRatio)/2 + tileSize/4);
    }
  }
}