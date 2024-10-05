import { TILESIZE, TILEPERCENT } from './utils/consts.js'
import { Tile } from './tile.js';

let game;
let viewingPlayer;

const boardSketch = (s, onTurnChange) => {
    s.setup = () => {
        game = window.game;
        let boardCanvas = s.createCanvas(game.board.boardSize * TILESIZE, game.board.boardSize * TILESIZE);

        boardCanvas.mousePressed(boardClicked);
    };

    s.draw = () => {
        let yCoordOfTile = Math.floor(s.mouseY / TILESIZE);
        let xCoordOfTile = Math.floor(s.mouseX / TILESIZE);
        viewingPlayer = game.getCurrentPlayer();
        
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

    function boardClicked() {


        let clicked_x = s.mouseX;
        let clicked_y = s.mouseY;
        let theCurrentPlayer = game.getCurrentPlayer();
        console.log("inven before:", theCurrentPlayer.inventory);
        if (theCurrentPlayer.inventory.selectedTileIndex !== -1) {

            let xCoordTileClick = Math.floor(clicked_x / TILESIZE);
            let yCoordTileClick = Math.floor(clicked_y / TILESIZE);
            console.log("x and y coords of click:",xCoordTileClick, yCoordTileClick);

            let coolTile = game.getCurrentPlayer().getSelectedTileOrNull();
            

            for (let path of coolTile.paths) {
                path.moveBy(-1 * coolTile.x * TILESIZE, 0);
                path.moveBy(xCoordTileClick * TILESIZE, yCoordTileClick * TILESIZE)
            }
            console.log(coolTile);
            game.board.tiles[yCoordTileClick][xCoordTileClick] = coolTile;

            theCurrentPlayer.inventory.tiles[coolTile.x] = new Tile(coolTile.x, 0);
            theCurrentPlayer.inventory.selectedTileIndex = -1;

            console.log(game.board.tiles);

            // i think this is not needed. The only time this is ever needed is when setting the paths initially and then recalibrating them. it makes sense to try to keep them consistent
            // so you should try to maintain them.
            coolTile.x = xCoordTileClick;
            coolTile.y = yCoordTileClick;
        }

        game.moveDragons();
        game.nextTurn();
        onTurnChange();

    }
}

export default boardSketch;
//new p5(boardSketch, 'boardContainer');