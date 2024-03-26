import { Player } from './player.js';
import { Game } from './game.js';
import { TILESIZE, TILEPERCENT } from './utils/consts.js'

let game;
let viewingPlayer;

const boardSketch = (s) => {
    s.setup = () => {
        // load game
        game = new Game([new Player('red')]);

        s.createCanvas(game.board.boardSize * TILESIZE, game.board.boardSize * TILESIZE);
        // viewingPlayer = getViewingPlayer()
        viewingPlayer = game.players[game.currentPlayerIndex];

        // boardCanvas.mousePressed(boardClicked);
    };

    s.draw = () => {
        let yCoordOfTile = Math.floor(s.mouseY / TILESIZE);
        let xCoordOfTile = Math.floor(s.mouseX / TILESIZE);
        
        s.background('saddlebrown');
        for (let i = 0; i < game.board.boardSize; i++) {
            for (let j = 0; j < game.board.boardSize; j++) {
                s.noStroke();
                let tile = game.board.tiles[i][j];
                if (tile === 0) {
                    if (xCoordOfTile === viewingPlayer.dragon.x && xCoordOfTile === j && yCoordOfTile === viewingPlayer.dragon.y && yCoordOfTile === i && viewingPlayer === game.players[game.currentPlayerIndex]) {
                        s.fill('sandybrown');
                    }
                    else {
                        s.fill('chocolate');
                    }
                    s.square(TILESIZE * (j + (1 - TILEPERCENT)/2), TILESIZE * (i + (1 - TILEPERCENT)/2), TILESIZE * TILEPERCENT, 0);
                }
                else {
                    s.fill('maroon');
                    s.noStroke();
                    s.square(TILESIZE * (j + (1 - TILEPERCENT)/2), TILESIZE * (i + (1 - TILEPERCENT)/2), TILESIZE * TILEPERCENT, 0);
                    s.noFill();
                    for (let path of tile.paths) {
                        s.strokeWeight(3);
                        s.stroke(path.color);
                        s.bezier(path.points[0].x, path.points[0].y, path.points[1].x, path.points[1].y, path.points[2].x, path.points[2].y, path.points[3].x, path.points[3].y)
                    }
                }
            }
        }
    s.noStroke();
    for (let player of game.players) {
        let dragon = player.dragon;
        s.fill(dragon.color);
        s.ellipse(dragon.coords.x, dragon.coords.y, dragon.radius);
    }
  };
}

new p5(boardSketch, 'boardContainer');