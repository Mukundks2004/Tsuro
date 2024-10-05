import { Point } from './point.js';

export class Bezier {
    constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
      this.points = [new Point(x1, y1), new Point(x2, y2), new Point(x3, y3), new Point(x4, y4)];
      this.color = 'wheat'
    }
  
    rotateBezier(times, centreX, centreY) {
      for (let point of this.points) {
        for (let i = 0; i < times; i++) {
          point.rotateQuaterTurn(centreX, centreY);
        }
      }
    }
  
    horizontallyFlipBezier(centreX) {
      for (let point of this.points) {
        point.horizontallyFlipPoint(centreX);
      }
    }
  
    verticallyFlipBezier(centreY) {
      for (let point of this.points) {
        point.verticallyFlipPoint(centreY);
      }
    }
  
    moveBy(diffX, diffY) {
      for (let point of this.points) {
        point.x += diffX;
        point.y += diffY;
      }
    }

    moveTo(x, y) {
      for (let point of this.points) {
        point.x = x;
        point.y = y;
      }
    }
  }