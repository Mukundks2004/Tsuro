import { TILESIZE, TILEPERCENT } from './utils/consts.js';
import { Point } from './point.js'

//This class currently only supports one dragon at a time
// let TILESIZE = 90;
// let TILEPERCENT = 0.95;

export class Dragon {
  constructor(color, BOARDSIZE) {
    this.Id = 0; //TODO: change once we have some kind of global player count
    this.color = color;
    this.radius = 3; //TODO: make bigger
    this.BOARDSIZE = BOARDSIZE; // Used for random location generation
    this.setRandomStartingPos();
    this.calculatePixelCoords();
    this.isPlaying = true;
  }

  calculatePixelCoords() {
    let xDispMag = ((1 - TILEPERCENT) / 2) * TILESIZE + TILESIZE * 1/4;
    let xPixel = this.x * TILESIZE + ((this.vertex % 2 === 0) ? xDispMag : TILESIZE - xDispMag);
    let yPixel = this.y * TILESIZE + TILESIZE * (1 - TILEPERCENT)/2;
    this.coords = new Point(xPixel, yPixel);
    
    for (let i = 0; i < Math.floor(this.vertex / 2); i++) {
      this.coords.rotateQuaterTurn((this.x + 0.5) * TILESIZE, (this.y + 0.5) * TILESIZE);
    }
  }

  isOffBoard(BOARDSIZE) {
    return (this.x < 0 || this.y < 0 || this.x >= BOARDSIZE || this.y >= this.BOARDSIZE);
  }

  //See if there is any way to make this more compact

  //TODO: test this
  setRandomStartingPos(BOARDSIZE) {
    let seed = Math.random();
    switch (this.Id) {
      case 0:
        this.y = 0
        this.x = Math.floor(6 * seed);
        break;
      case 1:
        this.y = Math.floor(6 * random());
        this.x = BOARDSIZE - 1;
        break;
      case 2:
        this.y = BOARDSIZE - 1;
        this.x = Math.floor(6 * random());
        break;
      case 3:
        this.y = Math.floor(6 * random());
        this.x = 0;
        break;
    }
    this.vertex = 2 * this.Id + Math.floor(2 * seed);
  }
}