interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class DrawBoundary {
    private boundary: [number, number][];

    constructor(private rects: Rectangle[]) {
        this.boundary = [[rects[0].x, rects[0].y]];
    }

    public draw(): [number, number][] {
        this.findIntersection("+x", 0);
        return this.boundary;
    }

    private findIntersection(direction: string, index: number): void {

        const [outX, outY] = this.boundary[this.boundary.length - 1];

        if (this.boundary.length > 1 && outX === this.boundary[0][0] && outY === this.boundary[0][1]) {
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
                this.boundary.push([maxX, outY]);
                this.findIntersection("+y", indexBreaks);
            } else if (direction === "-y") {
                this.boundary.push([outX, maxY]);
                this.findIntersection("-x", indexBreaks);
            } else if (direction === "+x") {
                this.boundary.push([minX, outY]);
                this.findIntersection("-y", indexBreaks);
            }
            
            return;
        }

        const { x, width, height, y } = this.rects[index];

        if (direction === "-x") {

            this.boundary.push([x, y + height]);
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
                this.boundary.push([x, minY]);
                this.findIntersection("+x", minYIndex);
            } else {
                this.boundary.push([x, y]);
                this.findIntersection("+x", index);
            }

        } else if (direction === "+x") {

            this.boundary.push([x + width, y]);
            this.findIntersection("+y", index);

        } else if (direction === "+y") {

            this.boundary.push([x + width, y + height]);
            this.findIntersection("-x", index);

        }
    }
}
