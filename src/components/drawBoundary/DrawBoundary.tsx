import React from "react";
import { Rectangle } from "../../types/rectDecorations"
import { DrawBoundary } from "../../repository/drawBoundary";

const DrawBoundaryCanvas = () => {

  const defaultRect: Rectangle[] = [
    { x: 0, y: 150, width: 395, height: 150 },
    { x: 534, y: 0, width: 393, height: 245 },
    { x: 280, y: 381, width: 185, height: 150 },
    { x: 597, y: 326, width: 185, height: 277 },
  ];

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const drawBoundary = new DrawBoundary(defaultRect);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const boundaries = drawBoundary.draw();
    const context = canvas?.getContext('2d');
    if(canvasRef?.current) {
      canvasRef.current.width = 950
      canvasRef.current.height = 650
      context && context.clearRect(0, 0, canvasRef?.current?.width || 0, canvasRef?.current?.height || 0);
      drawRectangleBoundary(context, boundaries);
      drawRectangles(context);
    }
    
  }, [])

  const drawRectangles = (context: any) => {
    defaultRect.forEach((rect: any) => {
      context.fillStyle = rect?.color || '#00BFFF';
      context.fillRect(rect.x, rect.y, rect?.width || 5, rect?.height || 5);
    });
  };

  const drawRectangleBoundary = (ctx: any, boundaries: any[]) => {
    boundaries.forEach((rect: any) => {
      ctx.lineWidth = 4;
      ctx.strokeStyle = "pink";
      ctx.lineTo(rect[0], rect[1]);
      ctx.stroke();
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
