import React, { useEffect } from "react";
import { Rectangle } from "../../types/rectDecorations"
import { DrawBoundaryFactory } from "../../repository/drawBoundary";

const DrawBoundaryCanvas = () => {

  const defaultRect: Rectangle[] = [
    { x: 0, y: 150, width: 395, height: 150 },
    { x: 534, y: 0, width: 393, height: 245 },
    { x: 280, y: 381, width: 185, height: 150 },
    { x: 597, y: 326, width: 185, height: 277 },
    ]

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const drawBoundary = new DrawBoundaryFactory(defaultRect);

  useEffect(() => {
    const points = drawBoundary.draw()
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvasRef?.current) {
      canvasRef.current.width = 950
      canvasRef.current.height = 750
      context && context.clearRect(0, 0, canvasRef?.current?.width || 0, canvasRef?.current?.height || 0);
      drawRectangleBoundary(context, points);
      drawRectangles(context);
    }
  }, [])

  const drawRectangleBoundary = (ctx: any, points: any) => {
    points.forEach((rect: any) => {
      ctx.lineWidth = 4;
      ctx.strokeStyle = "pink";
      ctx.lineTo(rect[0], rect[1]);
      ctx.stroke();
    });
  };

  const drawRectangles = (context: any) => {
    defaultRect.forEach((rect: any) => {
      context.fillStyle = rect?.color || '#00BFFF';
      context.fillRect(rect.x, rect.y, rect?.width || 5, rect?.height || 5);
    });
  };

  return (
    <div>
      <h2>DrawBoundary</h2>
      <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />
    </div>
  )
}

export default DrawBoundaryCanvas;
