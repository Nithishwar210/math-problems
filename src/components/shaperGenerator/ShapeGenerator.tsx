import { useState } from "react"
import { Canvas } from "./Canvas";

const ShapeGeneratorCanvas = () => {

    const [totalRowItems, setTotalRowItems] = useState(3);

    const onChangeRowItem =  () => {
        setTotalRowItems(prev => prev + 1 )
    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <label>Items in a row: {totalRowItems}</label>
                <button
                    onClick={onChangeRowItem}
                    title="Add item"
                >
                    Add Item
                </button>
            </div>

            <Canvas totalRowItems={totalRowItems}/>
        </div>
    )
}

export default ShapeGeneratorCanvas