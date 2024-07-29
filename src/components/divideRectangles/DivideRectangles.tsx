import React from "react";
import { ShapeComposition } from "../../repository/divideRectangles";

export const DivideRectangles = () => {

    const defaultParts = 3
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
       
    }, [defaultParts])

    const onClick = () => {
        const rectanglesSplitted = ShapeComposition(0, 0, 100, 100, defaultParts)
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        ctx && ctx.clearRect(0, 0, canvasRef?.current?.width || 0, canvasRef?.current?.height || 0);
        ctx && drawNode(ctx, rectanglesSplitted);
    }
    const drawNode = (ctx: CanvasRenderingContext2D, nodes: any[]) => {

        nodes.forEach((node: any) => {
            if (node?.children?.length > 0) {
                drawNode(ctx, node.children);
            } else {
                node && ctx.strokeRect(node.coordinates[0], node.coordinates[1], node.w, node.h);
            }
        }
        )

    };

    return (
        <div>
            <h2>Rectangles splitted</h2>
            <button onClick={onClick}>click me</button>
            <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />
        </div>
    )
}

