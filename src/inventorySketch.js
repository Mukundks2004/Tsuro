import { TILESIZE, TILEPERCENT, TILESPERPLAYER } from './utils/consts.js';


const inventorySketch = (s) => {
    let inventory;
    s.setup = () => {
        let inventoryCanvas = s.createCanvas(TILESPERPLAYER * TILESIZE, TILESIZE);
        inventoryCanvas.mousePressed(inventoryClicked)
    }

    s.draw = () => {
        let currentPlayer = window.game.getCurrentPlayer();
        inventory = currentPlayer.inventory;
        s.background(0);
        for (let i = 0; i < TILESPERPLAYER; i++) {
            if (i === inventory.selectedTileIndex) {
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

    function inventoryClicked() {
        let tileX = Math.floor(s.mouseX / TILESIZE);
        if (tileX === inventory.selectedTileIndex) {
            inventory.tiles[tileX].rotateTile();
        }
        else {
            inventory.selectedTileIndex = tileX;
        }
    }
}

export default inventorySketch;
//new p5(inventorySketch, 'inventoryContainer');


// What happens when we click the board, for example
/*
Well we have a selected tile dont we
So we place the tile aka update the board to indicate the tile placed
But this board object is global, so we have to save it
So we send a message via API to the backend to update the board state, then we send a message to the backend to ping every other 
Person with a session open to replace their board with the new board.
---
Meanwhile, on a different computer:
It is not out turn, so we are able to rotate our current selected tile but unfortunately we can't place anything
And then... 
The computer gets sent the new board (or maybe just the tile and the place to put it, or maybe the entire game idk)
And so our board changes right in front of us, a new tile is placed
And it looks visibly different (has the new tile), and now it IS our turn hooray
So we click on board, and the same thing happens

*/