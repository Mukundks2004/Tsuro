let numPlayers = 0;
let tilesPerPlayer = 3;

class Player {
  constructor(color) {
    this.color = color;
    this.number = numPlayers++;
    this.tilesOwned = [];
    for (let i = 0; i < tilesPerPlayer; i++) {
      this.tilesOwned.push(new Tile(i, 0));
    }
  }
}