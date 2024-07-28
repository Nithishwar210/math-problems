import './App.css'
import DrawBoundary from './components/drawBoundary/DrawBoundary'
import RectDecoration from './components/rectDecoration/RectDecoration'

function App() {
  return (
    <div style={{
      display: 'flex',
      gap: 40
    }}>
      <RectDecoration />
      <DrawBoundary/>
    </div>
  )
}

export default App
