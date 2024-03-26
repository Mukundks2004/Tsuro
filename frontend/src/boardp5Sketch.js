import { moduloStrict } from './utils/utilities.js';
import { Dragon } from './dragon.js';
import { TILESIZE, TILEPERCENT, BOARDSIZE } from './utils/consts.js'

let board = []
let dragons = []
let lastClickedCoordX = -1;
let lastClickedCoordY = -1;
  
function itIsYourTurn() {
  return true;
}

function sendGetTileQuery() {
  let event = new CustomEvent('boardClicked', {detail: null});
  document.dispatchEvent(event);
}

function updateBoard(event) {
  let newTile = event.detail;
  for (let path of newTile.paths) {
    path.moveBy(-1 * newTile.x * TILESIZE, 0);
    path.moveBy(lastClickedCoordX * TILESIZE, lastClickedCoordY * TILESIZE)
  }
  board[lastClickedCoordY][lastClickedCoordX] = event.detail;
  lastClickedCoordX = -1;
  lastClickedCoordY = -1;
  moveDragons();
}

function moveDragons() {
  for (let dragon of dragons) {
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

      if (dragon.isOffBoard(BOARDSIZE)) {
        dragon.isPlaying = false;
        break;
      }
    }
  }
}

function printParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  urlParams.forEach((value, key) => {
      console.log(`${key}: ${value}`);
  });
}

const boardSketch = (s) => {
  s.setup = () => {
    dragons.push(new Dragon('yellow', 6));
    printParams();
    document.addEventListener('tileDispatched', updateBoard);
    for (let i = 0; i < BOARDSIZE; i++) {
      board.push([]);
      for (let j = 0; j < BOARDSIZE; j++) {
        board[i].push(0);
      }
    }
    let boardCanvas = s.createCanvas(BOARDSIZE * TILESIZE, BOARDSIZE * TILESIZE);
    boardCanvas.mousePressed(boardClicked);
  };


  function boardClicked() {
    lastClickedCoordX = Math.floor(s.mouseX / TILESIZE);
    lastClickedCoordY = Math.floor(s.mouseY / TILESIZE);
    if (lastClickedCoordX === dragons[0].x && lastClickedCoordY === dragons[0].y) {
      sendGetTileQuery();
    }
  }

  

  s.draw = () => {
    let xCoordOfTile = Math.floor(s.mouseX / TILESIZE);
    let yCoordOfTile = Math.floor(s.mouseY / TILESIZE);
    s.background('saddlebrown');
    for (let i = 0; i < BOARDSIZE; i++) {
      for (let j = 0; j < BOARDSIZE; j++) {
        s.noStroke();
        let tile = board[i][j];
        if (tile === 0) {
          if (xCoordOfTile === dragons[0].x && xCoordOfTile === j && yCoordOfTile === dragons[0].y && yCoordOfTile === i && itIsYourTurn()) {
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
    for (let dragon of dragons) {
      s.fill(dragon.color);
      s.ellipse(dragon.coords.x, dragon.coords.y, dragon.radius);
    }
  };
}

new p5(boardSketch, 'boardContainer');