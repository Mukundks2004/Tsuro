import { Inventory } from './inventory.js';
import { Tile } from './tile.js';
import { TILESIZE, TILEPERCENT, TILESPERPLAYER } from './utils/consts.js';

let inventory;

const inventorySketch = (s) => {
    s.setup = () => {
        s.createCanvas(TILESPERPLAYER * TILESIZE, TILESIZE);
        // inventory = getInventoryOfViewingPlayer()
        inventory = new Inventory(TILESPERPLAYER);
        for (let i = 0; i < TILESPERPLAYER; i++) {
            inventory.tiles.push(new Tile(i, 0));
        }
        // inventoryCanvas.mousePressed(inventoryClicked)
    }

    s.draw = () => {
        s.background(0);
        for (let i = 0; i < TILESPERPLAYER; i++) {
            if (i === inventory.selectedTileNumber) {
                s.fill('purple');
            }
            else {
                s.fill('maroon');
            }
            s.noStroke();
            s.square(TILESIZE * (i + (1 - TILEPERCENT)/2), TILESIZE * (1 - TILEPERCENT)/2, TILESIZE * TILEPERCENT, 0);
            s.noFill();
            for (let path of inventory.tiles[i].paths) {
                s.strokeWeight(3);
                s.stroke('wheat');
                s.bezier(path.points[0].x, path.points[0].y, path.points[1].x, path.points[1].y, path.points[2].x, path.points[2].y, path.points[3].x, path.points[3].y)
            }
        }
    }
}

new p5(inventorySketch, 'inventoryContainer');