let sideLength = 100;
let tileRatio = 0.9; //this is a duplicate of tilepercent

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Bezier {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.points = [new Point(x1, y1), new Point(x2, y2), new Point(x3, y3), new Point(x4, y4)];
  }

  rotateBezier() {

  }
}

class Tile {
  constructor() {
    this.name = "01234567"
    this.x = 0;
    this.y = 0;
    this.paths = [this.getLargeArcPoints(), this.getSemiCirclePoints(), this.getSmallArcPoints(), this.getRadicalPoints(), this.getCubicPoints(), this.getLinePoints(), this.getBackwardsRadicalPoints()];
  }

  rotateTile() {
    let newString = "";
    for (let i = 0; i < 8; i++) {
      newString += ((parseInt(this.name[i]) + 2) % 8).toString()
    }
    this.name = newString;
  }

  getSemiCirclePoints() {
    return new Bezier(
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength * 1/4,
      sideLength - sideLength * (1 - tilePercent)/2 - sideLength/4,
      sideLength * 1/4,
      sideLength - sideLength * (1 - tilePercent)/2 - sideLength/4,
      0
    );
  }

  getSmallArcPoints() {
    return new Bezier(
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4
    );
  }

  getRadicalPoints() {
    return new Bezier(
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength,
      sideLength * (1 - tilePercent)/2 + sideLength/4
    );
  }

  getLargeArcPoints() {
    return new Bezier(
      sideLength * (1 - tileRatio)/2 + sideLength/4,
      0,
      sideLength * (1 - tileRatio)/2 + sideLength/4,
      sideLength * 2/3,
      sideLength * 2/3,
      sideLength - sideLength * (1 - tileRatio)/2 - sideLength/4,
      sideLength,
      sideLength - sideLength * (1 - tileRatio)/2 - sideLength/4
    );
  }

  getBackwardsRadicalPoints() {
    return new Bezier(
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength - sideLength * (1 - tilePercent)/2 - sideLength/4,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength - sideLength * (1 - tilePercent)/2 - sideLength/4,
      0,
      sideLength - sideLength * (1 - tilePercent)/2 - sideLength/4
    );
  }

  getLinePoints() {
    return new Bezier(
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength
    );
  }

  getCubicPoints() {
    return new Bezier(
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      0,
      sideLength * (1 - tilePercent)/2 + sideLength/4,
      sideLength
    );
  }

}