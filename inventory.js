const inventorySketch = (s) => {
  let tiles = [];
  let tilePercent = 0.95;
  let tileSize = 90;

  s.setup = () => {
    for (let i = 0; i < 3; i++) {
      tiles.push(new Tile(i, 0));
    }
    let inventoryCanvas = s.createCanvas(3 * tileSize, tileSize);
    inventoryCanvas.mousePressed(inventoryClicked)
  }

  function inventoryClicked() {
    console.log(s.mouseX, s.mouseY);
    let xCoordOfTile = Math.floor(s.mouseX / tileSize);
    let yCoordOfTile = Math.floor(s.mouseY / tileSize);
    let myTile = tiles[yCoordOfTile * 3 + xCoordOfTile]
    myTile.rotateTile();
  }

  s.draw = () => {
    s.background(0);
    s.strokeWeight(3);
    for (let tile of tiles) {
      s.fill(255, 255, 255);
      s.square(tileSize * (tile.x + (1 - tilePercent)/2), tileSize * (tile.y + (1 - tilePercent)/2), tileSize * tilePercent, 0);
      s.noFill();
      for (let path of tile.paths) {
        s.bezier(path.points[0].x, path.points[0].y, path.points[1].x, path.points[1].y, path.points[2].x, path.points[2].y, path.points[3].x, path.points[3].y)
      }
    }
  }


}

new p5(inventorySketch, 'inventoryContainer');


