import { TILESIZE, TILEPERCENT } from './utils/consts.js'

//Represents the collection of tiles a player owns

export class Inventory {
    constructor(inventorySize) {
        this.inventorySize = inventorySize;
        this.tiles = [];
        this.selectedTileIndex = -1;
    }
}