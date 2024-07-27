import { useRef, useState, useEffect } from 'react';

interface CanvasProps {
    totalRowItems: number
}

export const Canvas = (props: CanvasProps) => {

    const { totalRowItems } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [rectangles, setRectangles] = useState([{ x: 10, y: 10 }]);
    const [rectWidth,setRectangleWidth] = useState(50);
    const spacing = 10;

    useEffect(() => {
        let canvas = canvasRef.current;
        if(canvas) {
            const canvasWidth = canvas.width;
            setRectangleWidth((canvasWidth / totalRowItems) - spacing * totalRowItems )
        }
    },[])

    const rectHeight = 30;
    console.log({rectWidth});
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        drawRectangles(context);
    }, [rectangles]);

    const drawRectangles = (context: any) => {

        context.clearRect(0, 0, canvasRef?.current?.width, canvasRef?.current?.height);

        rectangles.forEach(rect => {
            context.fillStyle = 'blue';
            context.fillRect(rect.x, rect.y, rectWidth, rectHeight);
        });

    };

    const handleClick = () => {

        const newRectangles = [...rectangles];
        const lastRect = newRectangles[newRectangles.length - 1];
        console.log({lastRect});
        
        let newX = lastRect.x + rectWidth + spacing;
        let newY = lastRect.y;

        if (newRectangles.length % totalRowItems === 0) {
            newX = 10;
            newY += rectHeight + spacing;
        }

        newRectangles.push({ x: newX, y: newY });
        setRectangles(newRectangles);

    };

    return (
        <div>
            <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} onClick={handleClick} />
        </div>
    );
};
