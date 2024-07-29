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
        </div>
        <div style={{widows: '100%'}}>
          <DrawBoundaryCanvas/>
        </div> */}
        <div style={{widows: '100%'}}>
          <DivideRectangles/>
        </div>
      </div>
    </div>
  )
}

export default App


// const result1 = [
//   {
//   "type": "row",
//   "w": 100,
//   "h": 100,
//   "co_ordinates": [
//   0,
//   0,
//   100,
//   100
//   ],
//   "children": [
//   {
//   "type": "leaf",
//   "w": 100,
//   "h": 33.33,
//   "co_ordinates": [
//   0,
//  0,
//   100,
//  33.33
//   ]
//   },
//   {
//   "type": "leaf",
//   "w": 100,
//  "h": 33.33,
//  "co_ordinates": [
//  0,
// 33.33,
// 100,
// 33.33
//  ]
//  },
//  {
//  "type": "leaf",
//  "w": 100,
//  "h": 33.33,
//  "co_ordinates": [
//  0,
// 66.66,
// 100,
// 33.33
//  ]
//  }
//  ]
//  },
//  {
//  "type": "row",
//  "w": 100,
//  "h": 100,
//  "co_ordinates": [
//  0,
//  0,
//  100,
//  100
//  ],
//  "children": [
//  {
//  "type": "leaf",
//  "w": 100,
//  "h": 50,
//  "co_ordinates": [
//  0,
// 0,
//  100,
// 50
//  ]
//  },
//  {
//  "type": "leaf",
//  "w": 50,
//  "h": 50,
//  "co_ordinates": [
//  0,
// 50,
//  50,
// 50
// ]
// },
// {
// "type": "leaf",
// "w": 50,
// "h": 50,
// "co_ordinates": [
// 50,
// 50,
// 50,
// 50
// ]
// }
// ]
// },
// {
// "type": "row",
// "w": 100,
// "h": 100,
// "co_ordinates": [
// 0,
// 0,
// 100,
// 100
// ],
// "children": [
// {
// "type": "leaf",
// "w": 50,
// "h": 50,
// "co_ordinates": [
// 0,
// 0,
// 50,
// 50
// ]
// },
// {
// "type": "leaf",
// "w": 50,
// "h": 50,
// "co_ordinates": [
// 50,
// 0,
// 50,
// 50
// ]
// },
// {
// "type": "leaf",
// "w": 100,
// "h": 50,
// "co_ordinates": [
//   0,
// 50,
// 100,
//  50
//  ]
//  }
//  ]
//  },
//  {
//  "type": "row",
//  "w": 100,
//  "h": 100,
//  "co_ordinates": [
//  0,
//  0,
//  100,
//  100
//  ],
//  "children": [
//  {
//  "type": "leaf",
//  "w": 50,
//  "h": 50,
//  "co_ordinates": [
//  0,
// 0,
// 50,
// 50
//  ]
//  },
//  {
//  "type": "leaf",
//  "w": 50,
//  "h": 50,
//  "co_ordinates": [
//  0,
// 50,
// 50,
// 50
//  ]
//  },
//  {
//  "type": "leaf",
//  "w": 50,
//  "h": 100,
//  "co_ordinates": [
//  50,
// 0,
// 50,
// 100
//  ]
//  }
//  ]
// },
// {
// "type": "row",
// "w": 100,
// "h": 100,
// "co_ordinates": [
// 0,
// 0,
// 100,
// 100
// ],
// "children": [
// {
// "type": "leaf",
// "w": 50,
// "h": 100,
// "co_ordinates": [
// 0,
// 0,
// 50,
// 100
// ]
// },
// {
// "type": "leaf",
// "w": 50,
// "h": 50,
// "co_ordinates": [
// 50,
// 0,
// 50,
// 50
// ]
// },
// {
// "type": "leaf",
// "w": 50,
// "h": 50,
// "co_ordinates": [
// 50,
// 50,
// 50,
// 50
// ]
// }
// ]
// },
// {
// "type": "row",
// "w": 100,
// "h": 100,
// "co_ordinates": [
// 0,0,
// 100,
// 100
// ],
// "children": [
// {
// "type": "leaf",
// "w": 33.33,
// "h": 100,
// "co_ordinates": [
// 0,
// 0,
// 33.33,
// 100
// ]
// },
// {
// "type": "leaf",
// "w": 33.33,
// "h": 100,
// "co_ordinates": [
// 33.33,
// 0,
// 33.33,
// 100
// ]
// },
// {
// "type": "leaf",
// "w": 33.33,
// "h": 100,
// "co_ordinates": [
// 66.66,
// 0,
// 33.33,
// 100
// ]
// }
// ]
// }
// ]