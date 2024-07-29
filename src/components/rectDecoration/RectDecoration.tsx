import React, { useEffect, useState } from 'react'
import { Rectangle, Config, Option } from '../../types/rectDecorations';
import { DecoratorFactory } from '../../repository/decorator';

// Configuration for the decorator
const config: Config = {
    paddingRange: { min: 0.03, max: 0.08 },
    widthCoverageRange: { min: 0.4, max: 0.8 },
    spacing: { x: 0.1, y: 0 },
    whichOutput: 1 as Option,
    decorColor: '#b6b6d4'
};

const RectDecoration = () => {

    const defaultRect = [
        { x: 100, y: 100, width: 200, height: 40 },
        { x: 50, y: 160, width: 100, height: 40 },
        { x: 180, y: 220, width: 40, height: 40 },
    ];

    const [rectangles, setRectangles] = useState<Rectangle[]>(defaultRect);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const decorInstance = new DecoratorFactory(config);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        drawRectangles(context);
    }, [rectangles])

    const drawRectangles = (context: any) => {
        context.clearRect(0, 0, canvasRef?.current?.width, canvasRef?.current?.height);
        rectangles.forEach((rect: any) => {
            context.fillStyle = rect?.color || '#00BFFF';
            context.fillRect(rect.x, rect.y, rect.width, rect.height);
        });

    };

    const onChangeDecor = (e: any) => {
        const currentDecor = e.target.value
        const boundary = decorInstance.addDecors(currentDecor, defaultRect)
        const temp = [...boundary]
        setRectangles(temp);
    }

    return (
        <div>
            <h2>Rectangle decorations</h2>
            <div style={{display: 'flex', flexDirection:'column', alignItems: 'center' }}>
                <label>Choose a Decor:</label>
                <select onChange={onChangeDecor} style={{ marginBottom: 10, width: '50%', }} name="decors" id="decors">
                    <option disabled selected />
                    <option value="1">Decor 1</option>
                    <option value="2">Decor 2</option>
                    <option value="3">Decor 3</option>
                </select>
            </div>
            <div>
                <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />
            </div>
        </div>
    )
}

export default RectDecoration;

