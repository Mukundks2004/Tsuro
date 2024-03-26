import { TILESIZE, TILEPERCENT, TILESPERPLAYER } from './utils/consts.js';
import { Tile } from './tile.js';

let selectedTileNumber = -1;
let inventory = [];

function receiveTileDataQuery(_) {
  if (selectedTileNumber !== -1) {
    let event = new CustomEvent('tileDispatched', {detail: inventory[selectedTileNumber]});
    inventory[selectedTileNumber] = new Tile(selectedTileNumber, 0);
    document.dispatchEvent(event);
    selectedTileNumber = -1;
  }
}

const inventorySketch = (s) => {
  s.setup = () => {
    document.addEventListener('boardClicked', receiveTileDataQuery);
    
    for (let i = 0; i < TILESPERPLAYER; i++) {
      inventory.push(new Tile(i, 0));
    }
    let inventoryCanvas = s.createCanvas(TILESPERPLAYER * TILESIZE, TILESIZE);
    inventoryCanvas.mousePressed(inventoryClicked)
  }

  function inventoryClicked() {
    let xCoordOfTile = Math.floor(s.mouseX / TILESIZE);
    if (xCoordOfTile === selectedTileNumber) {
      let myTile = inventory[xCoordOfTile];
      myTile.rotateTile();
    }
    else {
      selectedTileNumber = xCoordOfTile;
    }
  }

  s.draw = () => {
    s.background(0);
    for (let i = 0; i < TILESPERPLAYER; i++) {
      if (i === selectedTileNumber) {
        s.fill('purple');
      }
      else {
        s.fill('maroon');
      }
      s.noStroke();
      s.square(TILESIZE * (i + (1 - TILEPERCENT)/2), TILESIZE * (1 - TILEPERCENT)/2, TILESIZE * TILEPERCENT, 0);
      s.noFill();
      for (let path of inventory[i].paths) {
        s.strokeWeight(3);
        s.stroke('wheat');
        s.bezier(path.points[0].x, path.points[0].y, path.points[1].x, path.points[1].y, path.points[2].x, path.points[2].y, path.points[3].x, path.points[3].y)
      }
    }
  }
}

new p5(inventorySketch, 'inventoryContainer');


