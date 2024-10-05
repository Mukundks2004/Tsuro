import { Board } from './board.js';
import { BOARDSIZE } from './utils/consts.js';
import { moduloStrict } from './utils/utilities.js';

export class Game {
  	constructor(players) {
		this.board = new Board(BOARDSIZE);
		this.currentPlayerIndex = 0;
		for (let i = 0; i < this.board.boardSize; i++) {
            this.board.tiles.push([]);
            for (let j = 0; j < this.board.boardSize; j++) {
                this.board.tiles[i].push(0);
            }
        }
		this.players = players;
	}

	//Game is over when every player has died
	isGameOver() {
		for (let player of this.players) {
			if (player.dragon.isPlaying) {
				return false;
			}
		}
		return true;
	}

	getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

  	moveDragons() {
		//umm this breaks if dragons go offscreen
		for (let player of this.players) {
			let dragon = player.dragon;
			let board = this.board.tiles;
			while (board[dragon.y][dragon.x] !== 0) {      
		
				let currentName = board[dragon.y][dragon.x].name;
				let otherVertex;

				for (let i = 0; i < currentName.length; i++) {
					if (parseInt(currentName[i]) === dragon.vertex) {
						otherVertex = parseInt(currentName[i + 1]);
						board[dragon.y][dragon.x].paths[i/2].color = dragon.color;
					}
					else if (parseInt(currentName[i + 1]) === dragon.vertex) {
						otherVertex = parseInt(currentName[i]);
						board[dragon.y][dragon.x].paths[i/2].color = dragon.color;
					}
					i++;
				}

				let newVertexOtherTile = moduloStrict(otherVertex + (otherVertex % 2 === 0 ? 5 : 3), 8);
				switch (Math.floor(newVertexOtherTile / 2)) {
				case 0:
					dragon.y += 1; 
					break;  
				case 1:
					dragon.x -= 1;
					break;
				case 2:
					dragon.y -= 1;
					break;
				case 3:
					dragon.x += 1;
					break;
				}

				dragon.vertex = newVertexOtherTile;
				dragon.calculatePixelCoords();
				if (dragon.isOffBoard()) {
					dragon.isPlaying = false;
					break;
				}
			}
		}
  	}
}
