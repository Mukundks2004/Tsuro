import { TILESPERPLAYER } from './utils/consts.js';
import { Dragon } from './dragon.js';
import { Tile } from './tile.js';
import { Inventory } from './inventory.js';

export class Player {
    constructor(color, number) {
        this.color = color;
        this.number = number;
        this.inventory = new Inventory(TILESPERPLAYER);
        for (let i = 0; i < TILESPERPLAYER; i++) {
            this.inventory.tiles.push(new Tile(i, 0));
        }
        this.dragon = new Dragon(color, number);
    }

    getSelectedTileOrNull() {
        if (this.inventory.selectedTileIndex == -1) {
            return null;
        }

        return this.inventory.tiles[this.inventory.selectedTileIndex];
    }
}