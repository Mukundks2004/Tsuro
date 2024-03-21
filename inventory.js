let selectedTileNumber = -1;
let inventory = [];
let tilePercent = 0.95;
let tileSize = 90;
let inventorySize = 4;

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
    
    for (let i = 0; i < inventorySize; i++) {
      inventory.push(new Tile(i, 0));
    }
    let inventoryCanvas = s.createCanvas(inventorySize * tileSize, tileSize);
    inventoryCanvas.mousePressed(inventoryClicked)
  }

  function inventoryClicked() {
    let xCoordOfTile = Math.floor(s.mouseX / tileSize);
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
    for (let i = 0; i < inventorySize; i++) {
      if (i === selectedTileNumber) {
        s.fill('darkgoldenrod');
      }
      else {
        s.fill('maroon');
      }
      s.noStroke();
      s.square(tileSize * (i + (1 - tilePercent)/2), tileSize * (1 - tilePercent)/2, tileSize * tilePercent, 0);
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


