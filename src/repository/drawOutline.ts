interface Rectangle {
    x: number,
    y: number,
    width: number,
    height: number
}

export class DrawOutline {
    constructor(public rectangles: Rectangle[]) { }

    draw() {
        const points = this.getPoints();
        points.sort((a, b) => a[0] - b[0]);

        const upper: any = [];
        const lower: any = [];

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            while (upper.length >= 2 && isNotRightTurn(upper[upper.length - 2], upper[upper.length - 1], point)) {
                upper.pop();
            }
            upper.push(point);
        }

        for (let i = points.length - 1; i >= 0; i--) {
            const point = points[i];
            while (lower.length >= 2 && isNotRightTurn(lower[lower.length - 2], lower[lower.length - 1], point)) {
                lower.pop();
            }
            lower.push(point);
        }

        upper.pop();
        lower.pop();

        const outline = [...upper, ...lower];

        const detailedOutline = this.addMidPoints(outline);
        return detailedOutline

        function isNotRightTurn(a: any, b: any, c: any) {

            const crossProduct = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
            return crossProduct <= 0;
        }

    }

    getPoints() {
        const points: Array<[number, number]> = [];

        for (let i = 0; i < this.rectangles.length; i++) {
            const rectangle = this.rectangles[i];
            const allCoordinates = this.getCoordinates(rectangle);
            points.push(...allCoordinates);
        }

        return points;
    }

    getCoordinates(rectangle: Rectangle): Array<[number, number]> {
        const { x, y, width, height } = rectangle;
        return [
            [x, y],
            [x + width, y],
            [x + width, y + height],
            [x, y + height],
        ];
    }

    addMidPoints(outline: Array<[number, number]>) {
        const detailedOutline: Array<[number, number]> = [];

        for (let i = 0; i < outline.length; i++) {
            const current = outline[i];
            const next = outline[(i + 1) % outline.length];

            detailedOutline.push(current);
            let midpoint: [number, number] | undefined 

            if (current[0] > next[0] && current[1] < next[1]) {
                midpoint = [next[0], current[1]];
            } else if (current[0] < next[0] && current[1] > next[1]) {
                midpoint = [next[0], current[1]];
            } else if (current[0] > next[0] && current[1] > next[1]) {
                midpoint = [current[0], next[1]];
            } else if (current[0] < next[0] && current[1] < next[1]) {
                midpoint = [current[0], next[1]];
            }

            midpoint && detailedOutline.push(midpoint);
        }

        return detailedOutline;
    }

}