import { TILESIZE, TILEPERCENT } from './utils/consts.js';
import { Bezier } from './bezier.js';
import { moduloStrict } from './utils/utilities.js';

export class Tile {
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

  //Try to generate this procedurally, add to burnside's lemma part
  getRandomTileName() {
    let options = [
      '01234567', '03162547', '04152637', '05142736', '07123456',
      '01263745', '01273645', '05142637', '06132457',
      '04162537', '06172435', '07152634', '07162534',
      '02153746', '04172635',
      '01243657', '01253647', '01273456', '01273546', '06132547', '07123546',
      '01234657', '01234756', '05123647', '05172436', '06123547', '06172534',
      '01253746', '01263547', '01263457', '01243756',
      '02153647', '04172536', '02143756', '05172634'
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
        arc.moveBy(this.x * TILESIZE, this.y * TILESIZE);
        arc.horizontallyFlipBezier((this.x + 0.5) * TILESIZE);
      }
      else {
        arc = this.getArc(difference);
        arc.moveBy(this.x * TILESIZE, this.y * TILESIZE);
      }

      arc.rotateBezier(Math.floor(first / 2), (this.x + 0.5) * TILESIZE, (this.y + 0.5) * TILESIZE);
      this.paths.push(arc);
      i++;
    }
  }

  getArc(curveType) {
    switch (curveType) {
      case 1:
        return new Bezier(TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, 0, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE * 1/4, TILESIZE - TILESIZE * (1 - TILEPERCENT)/2 - TILESIZE/4, TILESIZE * 1/4, TILESIZE - TILESIZE * (1 - TILEPERCENT)/2 - TILESIZE/4, 0);
      case 2:
        return new Bezier(TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, 0, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4);
      case 3:
        return new Bezier(TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, 0, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE * 2/3, TILESIZE * 2/3, TILESIZE - TILESIZE * (1 - TILEPERCENT)/2 - TILESIZE/4, TILESIZE, TILESIZE - TILESIZE * (1 - TILEPERCENT)/2 - TILESIZE/4);
      case 4:
        return new Bezier(TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, 0, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE * 1/2, TILESIZE - TILESIZE * (1 - TILEPERCENT)/2 - TILESIZE/4, TILESIZE * 1/2, TILESIZE - TILESIZE * (1 - TILEPERCENT)/2 - TILESIZE/4, TILESIZE);
      case 5:
        return new Bezier(TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, 0, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, 0, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, 0, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE);
      case 6:
        return new Bezier(TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, 0, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE - TILESIZE * (1 - TILEPERCENT)/2 - TILESIZE/4, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE - TILESIZE * (1 - TILEPERCENT)/2 - TILESIZE/4, 0, TILESIZE - TILESIZE * (1 - TILEPERCENT)/2 - TILESIZE/4);
      case 7:
        return new Bezier(TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, 0, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4, 0, TILESIZE * (1 - TILEPERCENT)/2 + TILESIZE/4);
    }
  }
}