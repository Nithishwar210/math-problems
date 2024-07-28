import React from "react";
import { RectangleSplitter } from "../../repository/divideRectangles";

export const DivideRectangles = () => {

    const defaultParts = 3;
    const [parts] = React.useState(defaultParts)
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const rectangleInput = { x: 0, y: 0, w: 100, h: 100 };
    const rectanglesSplitter = new RectangleSplitter();
    const rectanglesSplitted = rectanglesSplitter.splitRectangle(rectangleInput, parts);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        ctx && ctx.clearRect(0, 0, canvasRef?.current?.width || 0, canvasRef?.current?.height || 0);
        drawRectangles(ctx, rectanglesSplitted);
    }, [])

    const drawRectangles = (context: any, rectangles: (Node | any)[]) => {
        rectangles.forEach(rect => {
            if (rect.type === 'leaf') {
                context.strokeStyle = 'black';
                context.strokeRect(rect.x, rect.y, rect.w, rect.h);
            } else if (rect.children) {
                drawRectangles(context, rect.children);
            }
        })
    };

    return (
        <div>
            <h2>Rectangles splitted</h2>
            <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />
        </div>
    )
}

