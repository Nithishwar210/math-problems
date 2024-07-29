import React, { useEffect } from "react";
import { Rectangle } from "../../types/rectDecorations"
import { DrawOutline } from "../../repository/drawOutline";

const DrawBoundaryCanvas = () => {

  const defaultRect: Rectangle[] = [
    { x: 55, y: 0, width: 456, height: 92 },
    { x: 0, y: 114, width: 565, height: 92 },
    { x: 0, y: 228, width: 565, height: 92 },
    { x: 70, y: 342, width: 569, height: 92 },
    { x: 155, y: 456, width: 650, height: 92 },
  ]

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const drawBoundary = new DrawOutline(defaultRect);

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
