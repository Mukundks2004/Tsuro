import { TILESPERPLAYER } from './utils/consts.js';
import { Dragon } from './dragon.js';
import { Tile } from './tile.js';
import { Inventory } from './inventory.js';


export class Player {
  constructor(color) {
    this.color = color;
    this.number = 0; //currently only supoorts one player
    this.tilesOwned = [];
    for (let i = 0; i < TILESPERPLAYER; i++) {
      this.tilesOwned.push(new Tile(i, 0));
    }
    this.dragon = new Dragon(color);
    this.inventory = new Inventory(TILESPERPLAYER);
  }
}