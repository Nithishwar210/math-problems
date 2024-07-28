interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  export class DrawBoundary {
    private outline: [number, number][];
  
    constructor(private rects: Rectangle[]) {
      this.outline = [[rects[0].x, rects[0].y]];
    }
  
    public draw(): [number, number][] {
      this.findIntersection("+x", 0);
      return this.outline;
    }
  
    private findIntersection(direction: string, index: number): void {

      const [outX, outY] = this.outline[this.outline.length - 1];

      if (this.outline.length > 1 && outX === this.outline[0][0] && outY === this.outline[0][1]) {
        return;
      }
  
      let maxX = -Infinity;
      let maxY = -Infinity;
      let minX = Infinity;
      let indexBreaks = -1;
  
      for (let i = 0; i < this.rects.length; i++) {
        const rect = this.rects[i];
        if (direction === "+x" && rect.x > outX && rect.y < outY) {
          if (rect.x < minX) {
            minX = rect.x;
            indexBreaks = i;
          }
        }
        if (direction === "-x" && rect.x + rect.width < outX && rect.y > outY) {
          if (rect.x + rect.width > maxX) {
            maxX = rect.x + rect.width;
            indexBreaks = i;
          }
        }
        if (direction === "-y" && rect.y + rect.height < outY && rect.x < outX) {
          if (rect.y + rect.height > maxY) {
            maxY = rect.y + rect.height;
            indexBreaks = i;
          }
        }
      }
  
      if (indexBreaks >= 0) {
        if (direction === "-x") {
          this.outline.push([maxX, outY]);
          this.findIntersection("+y", indexBreaks);
        } else if (direction === "-y") {
          this.outline.push([outX, maxY]);
          this.findIntersection("-x", indexBreaks);
        } else if (direction === "+x") {
          this.outline.push([minX, outY]);
          this.findIntersection("-y", indexBreaks);
        }
        return;
      }
  
      for (let i = 0; i < this.rects.length; i++) {

        const rect = this.rects[i];
        if (direction === "+x" && outX <= rect.x && outY < rect.y + rect.height && outY > rect.y) {
          this.outline.push([rect.x, outY]);
          this.findIntersection("-y", i);
          return;
        } else if (direction === "+y" && outY <= rect.y && outX < rect.x + rect.width && outX > rect.x) {
          this.outline.push([outX, rect.y]);
          this.findIntersection("+x", i);
          return;
        } else if (direction === "-x" && outX >= rect.x + rect.width && outY < rect.y + rect.height && outY > rect.y) {
          this.outline.push([rect.x + rect.width, outY]);
          this.findIntersection("+y", i);
          return;
        } else if (direction === "-y" && outY >= rect.y + rect.height && outX < rect.x + rect.width && outX > rect.x) {
          this.outline.push([outX, rect.y + rect.height]);
          this.findIntersection("+x", i);
          return;
        }
        
      }
  
      const { x, width, height, y } = this.rects[index];

      if (direction === "-x") {

        this.outline.push([x, y + height]);
        this.findIntersection("-y", index);

      } else if (direction === "-y") {

        let minY = Infinity;
        let minYIndex = -1;

        for (let i = 0; i < this.rects.length; i++) {
          if (minY > this.rects[i].y && this.rects[i].x === x) {
            minY = this.rects[i].y;
            minYIndex = i;
          }
        }

        if (minYIndex >= 0) {
          this.outline.push([x, minY]);
          this.findIntersection("+x", minYIndex);
        } else {
          this.outline.push([x, y]);
          this.findIntersection("+x", index);
        }

      } else if (direction === "+x") {
        this.outline.push([x + width, y]);
        this.findIntersection("+y", index);
      } else if (direction === "+y") {
        this.outline.push([x + width, y + height]);
        this.findIntersection("-x", index);
      }
    }
  }
  