import { TILESIZE, TILEPERCENT, BOARDSIZE } from './utils/consts.js';
import { Point } from './point.js';

//This class currently only supports one dragon at a time

export class Dragon {
	constructor(color) {
		this.Id = 0; //TODO: change once we have some kind of global player count
		this.color = color;
		this.radius = 3; //TODO: make bigger
		this.boardSize = BOARDSIZE; // Used for random location generation
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

	isOffBoard() {
		return (this.x < 0 || this.y < 0 || this.x >= this.boardSize || this.y >= this.boardSize);
	}

	//See if there is any way to make this more compact

	//TODO: test this
	setRandomStartingPos() {
		let seed = Math.random();
		switch (this.Id) {
		case 0:
			this.y = 0
			this.x = Math.floor(6 * seed);
			break;
		case 1:
			this.y = Math.floor(6 * random());
			this.x = this.boardSize - 1;
			break;
		case 2:
			this.y = this.boardSize - 1;
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