export class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    rotateQuaterTurn(centreX, centreY) {
      let newDiffY = this.x - centreX;
      let newDiffX = -1 * (this.y - centreY);
      this.x = centreX + newDiffX;
      this.y = centreY + newDiffY;
    }
  
    horizontallyFlipPoint(centreX) {
      this.x = centreX + -1 * (this.x - centreX);
    }
  
    verticallyFlipPoint(centreY) {
      this.y = centreY + -1 * (this.y - centreY);
    }
  }