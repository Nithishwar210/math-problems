import { Config, Rectangle,Option } from "../types/rectDecorations";

export class DecoratorFactory {

    config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    addDecors(decorOption:Option,rectangles: Rectangle[]) {
        let decorRect:Rectangle[] = [];
        
        switch (decorOption as any) {
            case "1":
                return  this.addBackGroundOverAll(rectangles)
            case "2":
                console.log('inside 2')
                return this.addBackgroundIndividual(rectangles)                    
            case "3":
                return  this.addAsideDecor(rectangles)                    
            default:
                break;
        }

        
        return decorRect
    }

    private addAsideDecor(rectangles: Rectangle[]) {
        const decorRect = this.getBoundaryRectangle(rectangles);
        decorRect.width = 20
        const rect = [{ ...decorRect, color: this.config.decorColor }, ...rectangles];
        this.resolveOverlap(rect)
        return rect
    };

    private addBackgroundIndividual(rectangles: Rectangle[]) {

        const decorRect = [];
        for (let i = 0; i < rectangles.length; i++) {
            const rectangle = rectangles[i];
            const rect = this.addBackground([rectangle])
            decorRect.push(...rect)
        }

        console.log({decorRect});
        
        return decorRect

    }

    private addBackGroundOverAll(rectangles: Rectangle[]) {
        return this.addBackground(rectangles)
    }

    private addBackground(rectangles: Rectangle[]) {

        const boundaryRect = this.getBoundaryRectangle(rectangles)
        const scaledRectangles = this.scaleRectangle(boundaryRect, rectangles);

        return [{ ...boundaryRect, color: this.config.decorColor }, ...scaledRectangles]
    }

    private scaleRectangle(boundaryRect: Rectangle, rectangles: Rectangle[]) {

        const { paddingRange } = this.config;

        const padding = paddingRange.max;

        const scaleWidth = boundaryRect.width * padding;
        const scaledHeight = boundaryRect.height * padding;

        boundaryRect.height = boundaryRect.height + scaledHeight;
        boundaryRect.width = boundaryRect.width + scaleWidth;
        boundaryRect.x = boundaryRect.x
        boundaryRect.y = boundaryRect.y

        const scaledRectangles = rectangles.map(rect => {

            const newWidth = rect.width;
            const newHeight = rect.height;
            const newX = rect.x + (scaleWidth / 2);
            const newY = rect.y + (scaledHeight / 2);

            return {
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight
            };
        });

        return scaledRectangles

    };

    private getBoundaryRectangle(rectangles: Rectangle[]): Rectangle {

        const boundary = {
            minX: Infinity,
            minY: Infinity,
            maxX: -Infinity,
            maxY: -Infinity
        };

        for (let i = 0; i < rectangles.length; i++) {
            const rect = rectangles[i];
            const maxX = rect.x + rect.width;
            const maxY = rect.y + rect.height;

            boundary.minX = Math.min(boundary.minX, rect.x);
            boundary.minY = Math.min(boundary.minY, rect.y);
            boundary.maxX = Math.max(boundary.maxX, maxX);
            boundary.maxY = Math.max(boundary.maxY, maxY);
        };

        const boundaryRectangle = {
            x: boundary.minX,
            y: boundary.minY,
            width: boundary.maxX - boundary.minX,
            height: boundary.maxY - boundary.minY,
        }

        return boundaryRectangle
    }

    private isOverlapping(current: Rectangle, other: Rectangle) {
        return !(
            current.x + current.width <= other.x || current.x >= other.x + other.width ||
            current.y + current.height <= other.y || current.y >= other.y + other.height);
    }

    private move(current: Rectangle, dx: number, dy: number) {
        const { spacing } = this.config
        current.x += dx + ((spacing.x || 0.1) * 100);
        current.y += dy + ((spacing.y || 0.001) * 100);;
    }

    private resolveOverlap(rectangles: Rectangle[]) {
        let moved;
        do {
            moved = false;
            for (let i = 0; i < rectangles.length; i++) {
                for (let j = i + 1; j < rectangles.length; j++) {
                    if (this.isOverlapping(rectangles[i], rectangles[j])) {
                        this.move(rectangles[j], rectangles[i].width, 0,);
                        moved = true;
                    }
                }
            }
        } while (moved);
    }

}