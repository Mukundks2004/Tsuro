let tileSize = 90;
let tileRatio = 0.95; //this is a duplicate of tileRatio

function moduloStrict(a, n) {
  return ((a % n) + n) % n;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  rotateQuaterTurn(centreX, centreY) {
    let newDiffY = this.x - centreX;
    let newDiffX = -1 * (this.y - centreY);
    this.x = centreX + newDiffX;
    this.y = centreY + newDiffY;
  }

  horizontallyFlipPoint(centreX) {
    this.x = centreX + -1 * (this.x - centreX);
  }

  verticallyFlipPoint(centreY) {
    this.y = centreY + -1 * (this.y - centreY);
  }
}

class Bezier {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.points = [new Point(x1, y1), new Point(x2, y2), new Point(x3, y3), new Point(x4, y4)];
  }

  rotateBezier(times, centreX, centreY) {
    for (let point of this.points) {
      for (let i = 0; i < times; i++) {
        point.rotateQuaterTurn(centreX, centreY);
      }
    }
  }

  horizontallyFlipBezier(centreX) {
    for (let point of this.points) {
      point.horizontallyFlipPoint(centreX);
    }
  }

  verticallyFlipBezier(centreY) {
    for (let point of this.points) {
      point.verticallyFlipPoint(centreY);
    }
  }

  moveBy(diffX, diffY) {
    for (let point of this.points) {
      point.x += diffX;
      point.y += diffY;
    }
  }
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
    let tileCase = Math.random();
    if (tileCase > 0.8) {
      return "02134657";
    }
    if (tileCase > 0.6) {
      return "12345670"
    }
    if (tileCase > 0.4) {
      return "04152637"
    }
    if (tileCase > 0.2) {
      return "05274163";
    }
    return "03712645";
  }

  setTileArcs(pathInfo) {
    this.paths = []
    for (let i = 0; i < pathInfo.length; i++) {
      let first = parseInt(pathInfo[i]);
      let second = parseInt(pathInfo[i + 1]);
      let difference = moduloStrict(second - first, 8);
      let myArc = this.getArc(difference);

      myArc.moveBy(this.x * tileSize, this.y * tileSize);
      if (first % 2 == 1) {
        myArc.horizontallyFlipBezier((this.x + 0.5) * tileSize);
      }
      myArc.rotateBezier(first / 2, (this.x + 0.5) * tileSize, (this.y + 0.5) * tileSize);

      this.paths.push(myArc);
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