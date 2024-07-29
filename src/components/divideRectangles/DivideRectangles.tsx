import React from "react";
import { VisualSubCompositionFactory } from "../../repository/divideRectangles";

export const DivideRectangles = () => {

    const defaultParts = 2
    const canvasWidth = 500;
    const canvasHeight = 500;
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const visualSubComposition = new VisualSubCompositionFactory(canvasWidth, canvasHeight)
    
    const onClick = async () => {
        try {
            const subCompositions = visualSubComposition?.getSubCompositions(100, 100, defaultParts)
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx && drawNode(ctx, subCompositions);
            }
        } catch (error) {
            alert(error)
        }
    }

    const drawNode = (ctx: CanvasRenderingContext2D, nodes: any[]) => {
        nodes.forEach((node: any) => {
            if (node?.children?.length > 0) {
                drawNode(ctx, node.children);
            } else {
                node && ctx.strokeRect(node.x, node.y, node.width, node.height);
            }
        }
        )

    };

    return (
        <div>
            <h2>Rectangles splitted</h2>
            <button onClick={onClick}>click me</button>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '1px solid black' }} />
        </div>
    )
}

