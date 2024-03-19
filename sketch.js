let tiles = [];
let tilePercent = 0.9;

function setup() {
  tiles.push(new Tile())
  createCanvas(600, 600);
}

function draw() {
  background(0);
  fill(255, 255, 255);
  //bezier(0, 0, 0, 100, 200, 100, 200, 0);
  for (let tile of tiles) {
    square(100 * (tile.x + (1 - tilePercent)/2), 100 * (tile.y + (1 - tilePercent)/2), 100 * tilePercent, 0);
    for (let path of tile.paths) {
      noFill();
      bezier(path.points[0].x, path.points[0].y, path.points[1].x, path.points[1].y, path.points[2].x, path.points[2].y, path.points[3].x, path.points[3].y)
    }
  }
  
}