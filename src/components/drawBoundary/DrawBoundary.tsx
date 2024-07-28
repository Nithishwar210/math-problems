import React from "react";
import { Rectangle } from "../../types/rectDecorations"

const DrawBoundary = () => {

  const defaultRect: Rectangle[] = [
    { x: 0, y: 150, width: 395, height: 150 },
    { x: 534, y: 0, width: 393, height: 245 },
    { x: 280, y: 381, width: 185, height: 150 },
    { x: 597, y: 326, width: 185, height: 277 },
  ];

  const [rectangles, setRectangles] = React.useState<Rectangle[]>(defaultRect);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {

    const canvas = canvasRef.current;
    
    if (canvas) {
      canvas.width = 950;
      canvas.height = 600;
    }
    const context = canvas?.getContext('2d');

    drawRectangles(context);
  }, [rectangles])

  const drawRectangles = (context: any,color?: string) => {
    context.clearRect(0, 0, canvasRef?.current?.width, canvasRef?.current?.height);
    rectangles.forEach((rect: any) => {
      context.fillStyle = rect?.color || '#00BFFF';
      context.fillRect(rect.x, rect.y, rect?.width || 5, rect?.height || 5);
    });

  };

  const onClick = () => {
    const boundary = new Boundary();
    const draw = boundary.drawBoundary(rectangles);
    const temp = [...draw].map(points => {
      return {
        ...points,
        color: "red"
      }
    })


    setRectangles((prev) => [...temp,...prev]);
  }

  return (
    <div>
      <h2>DrawBoundary</h2>
      <div>
        <button onClick={onClick}>Check boundary</button>
        <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />
      </div>
    </div>
  )
}

export default DrawBoundary;


class Boundary {

  drawBoundary(rectangles: Rectangle[]) {
    const points: { x: number; y: number; }[] = [];
    rectangles.forEach(rect => {
      points.push({ x: rect.x, y: rect.y });
      points.push({ x: rect.x + rect.width, y: rect.y });
      points.push({ x: rect.x, y: rect.y + rect.height });
      points.push({ x: rect.x + rect.width, y: rect.y + rect.height });
    });

    function nextToTop(S: any) { return S[S.length - 2]; }

    // A utility function to return square of distance
    // between p1 and p2
    function distSq(p1: any, p2: any) {
      return ((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    }

    // To find orientation of ordered triplet (p, q, r).
    // The function returns following values
    // 0 --> p, q and r are collinear
    // 1 --> Clockwise
    // 2 --> Counterclockwise
    let p0 = { x: 0, y: 0 };

    function orientation(p: any, q: any, r: any) {
      let val = ((q.y - p.y) * (r.x - q.x)
        - (q.x - p.x) * (r.y - q.y));
      if (val == 0)
        return 0; // collinear
      else if (val > 0)
        return 1; // clock wise
      else
        return 2; // counterclock wise
    }

    // A function used by cmp_to_key function to sort an array
    // of points with respect to the first point
    function compare(p1: any, p2: any) {

      // Find orientation
      let o = orientation(p0, p1, p2);
      if (o == 0) {
        if (distSq(p0, p2) >= distSq(p0, p1))
          return -1;
        else
          return 1;
      }
      else {
        if (o == 2)
          return -1;
        else
          return 1;
      }
    }
    // Prints convex hull of a set of n points.
    function convexHull(points:any, n:any) {

      // Find the topmost point

      let xmin = points[0].x;
      
      let min = 0;
      for (var i = 1; i < n; i++) {
        let x = points[i].x;
        if ((x < xmin) || ((xmin == x) && (points[i].y < points[min].y))) {
          xmin = points[i].x;
          min = i;
        }
      }

      console.log({xmin,min});
      
      points[0], points[min] = points[min], points[0];

      let p0 = points[0];
      points.sort(compare);

      let m = 1; 
      for (var i = 1; i < n; i++) {
        while ((i < n - 1)
          && (orientation(p0, points[i], points[i + 1])
            == 0))
          i += 1;

        points[m] = points[i];
        m += 1; 
      }

      if (m < 3)
        return;

      let S = [];
      S.push(points[0]);
      S.push(points[1]);
      S.push(points[2]);

      for (var i = 3; i < m; i++) {
        while (true) {
          if (S.length < 2)
            break;
          if (orientation(nextToTop(S), S[S.length - 1],
            points[i])
            >= 2)
            break;
          S.pop();
        }

        S.push(points[i]);
      }

      while (S.length > 0) {
        let p = S[S.length - 1];
        console.log("(" + p.x + ", " + p.y + ")");
        S.pop();
      }

      console.log({points});
      return points
    }

    console.log({points});
    
    let n = points.length;

    const result = convexHull(points,n)
    console.log({result});
    
    return result
  }

}