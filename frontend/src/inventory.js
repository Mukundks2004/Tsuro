import { TILESIZE, TILEPERCENT } from './consts.js'

//Represents the collection of tiles a player owns

class inventory {
    constructor(inventorySize) {
        this.inventorySize = inventorySize;
        this.tiles = [];
        this.selectedTileIndex = -1;
    }
}