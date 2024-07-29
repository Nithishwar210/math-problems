import './App.css'
import { DivideRectangles } from './components/divideRectangles/DivideRectangles'
import DrawBoundaryCanvas from './components/drawBoundary/DrawBoundary'
import RectDecoration from './components/rectDecoration/RectDecoration'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display:'flex', flexDirection: 'column', gap:30 }}>
        {/* <div style={{marginBottom: 10}}>
          <RectDecoration />
        </div> */}
        <div style={{widows: '100%'}}>
          <DrawBoundaryCanvas/>
        </div>
        <div style={{widows: '100%'}}>
          <DivideRectangles/>
        </div>
      </div>
    </div>
  )
}

export default App
