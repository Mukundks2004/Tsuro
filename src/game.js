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

		for (let player of this.players) {
			let dragon = player.dragon;
			if (!dragon.isPlaying) {
				continue;
			}
			
			let board = this.board.tiles;
			let dragonCollisionDetectedStopMoving = false;
			while (board[dragon.y][dragon.x] !== 0) {      
		
				let currentName = board[dragon.y][dragon.x].name;
				let otherVertex;

				for (let i = 0; i < currentName.length; i++) {
					if (parseInt(currentName[i]) === dragon.vertex) {
						otherVertex = parseInt(currentName[i + 1]);
						board[dragon.y][dragon.x].paths[i/2].color = dragon.color;
						break;
					}
					else if (parseInt(currentName[i + 1]) === dragon.vertex) {
						otherVertex = parseInt(currentName[i]);
						board[dragon.y][dragon.x].paths[i/2].color = dragon.color;
						break;
					}
					i++;
				}

				//Test if dragon exists at target vertex on same tile
				for (let otherPlayer of this.players) {
					if (otherPlayer !== player) {
						if (otherPlayer.dragon.vertex == otherVertex && dragon.x === otherPlayer.dragon.x && dragon.y === otherPlayer.dragon.y) {
							//This successfully detects a collision between two dragons. Now, what happens when two dragons collide?
							//Well stop moving both of them (leave this loop for one of them) and set both their statuses to NOT PLAYING :)
							//love ya
							console.log("collision between two dragons: ", dragon, otherPlayer.dragon);
							dragon.isPlaying = false;
							otherPlayer.dragon.isPlaying = false;
							dragonCollisionDetectedStopMoving = true;
						}
					}
				}

				if (dragonCollisionDetectedStopMoving) {
					break;
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
