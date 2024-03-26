import { moduloStrict } from './utils/utilities.js';


// Represents a single board state

export class Board {
    constructor(boardSize) {
        this.tiles = [];
        this.boardSize = boardSize;
    }
}