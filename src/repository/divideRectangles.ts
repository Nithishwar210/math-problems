// interface INode {
//   type: string;
//   w: number;
//   h: number;
//   coordinates: number[];
//   children: INode[];
// }

// class Node implements INode {
//   type: string;
//   w: number;
//   h: number;
//   coordinates: number[];
//   children: INode[];

//   constructor(x: number, y: number, w: number, h: number, type: string) {
//     this.type = type;
//     this.w = w;
//     this.h = h;
//     this.coordinates = [x, y, w, h];
//     this.children = [];
//   }

//   addChild(child: INode) {
//     this.children.push(child);
//   }
// }

// class LeafNode implements INode {
//   type: string;
//   w: number;
//   h: number;
//   coordinates: number[];
//   children: INode[];

//   constructor(x: number, y: number, w: number, h: number) {
//     this.type = "leaf";
//     this.w = w;
//     this.h = h;
//     this.coordinates = [x, y, w, h];
//     this.children = [];
//   }
// }

// export function ShapeComposition(x: number, y: number, w: number, h: number, n: number): any[] {
//   const result: INode[] = [];

//   if (n === 1) {
//     return [new LeafNode(x, y, w, h)];
//   }

//   function recursive(x: number, y: number, width: number, height: number, parts: number, size: number = 0): any {

//     if (parts === 1) {
//       const leaf = new LeafNode(x + size, y, width, height);
//       return leaf
//     }

//     for (let i = 1; i < parts; i++) {
//       const remainingParts = parts - i;
//       if (remainingParts < 1) continue;

//       const rowHeight = height / parts * i
//       const remainingHeight = height - rowHeight;
//       const node = new Node(x + size, y, width, height, 'container');

//       if (width >= height) {
//         const child1 = recursive(x, y, width, rowHeight, i, node.coordinates[0])
//         node.addChild(child1)
//         node.addChild(recursive(x + node.coordinates[0], y + rowHeight, width, remainingHeight, remainingParts, node.coordinates[0]))
//       }

//       if (width <= height) {
//         const colWidth = width / parts * i;
//         const remainingColWidth = width - colWidth
//         node.addChild(recursive(x + node.coordinates[0], y, colWidth, height, i, node.coordinates[0]));
//         node.addChild(recursive(x + node.coordinates[0] + colWidth, y, remainingColWidth, height, remainingParts, node.coordinates[0]));
//       }

//       result.push(node)
//     }

//   }

//   recursive(x, y, w, h, n);

//   return result;
// }

// export function ShapeComposition(x: number, y: number, w: number, h: number, n: number): INode[] {
//   const result: INode[] = [];

//   function recursive(x: number, y: number, width: number, height: number, parts: number, size: number = 10): INode[] {
//     // Base case
//     console.log({ x, y, parts });

//     if (parts <= 0) return [];
//     if (parts === 1) {
//       return [new LeafNode(x, y, width, height)];
//     }

//     const nodes: INode[] = [];

// if (width <= height) {
//   // by rows
//   const rowHeight = height / parts;
//   console.log({ rowHeight });

//   for (let i = 0; i < parts; i++) {

//     const node = new Node(x, y + rowHeight * i, width, rowHeight, 'row');
//     // const child1 = recursive(x, y + rowHeight * i, width, rowHeight, i, size);
//     // const child2 = recursive(x, y + rowHeight * (i + 1), width, rowHeight, i, size);
//     const childHeight = y + rowHeight * i
//     const childHeight2 = y + rowHeight * (i + 1)

//     const child1 = recursive(x, y + rowHeight * i, width, rowHeight, i, size);
//     const child2 = recursive(x, y + rowHeight * (i + 1), width, rowHeight, parts - i - 1, size);

//     child1.forEach(child => node.addChild(child));
//     child2.forEach(child => node.addChild(child));
//     nodes.push(node);
//   }
// } else {

//   const colWidth = width / parts;
//   for (let i = 1; i < parts; i++) {
//     const node = new Node(x + colWidth * i, y, colWidth, height, 'col');

//     const child1 = recursive(x + colWidth * i, y, colWidth, height, parts - 1, size);
//     const child2 = recursive(x + colWidth * (i + 1), y, colWidth, height, parts - 2, size);

//     child1.forEach(child => node.addChild(child));
//     child2.forEach(child => node.addChild(child));

//     nodes.push(node);
//   }
// }

//     return nodes;
//   }

//   // result.push(...recursive(x, y, w, h, n));
//   const output = [...recursive(x, y, w, h, n)]
//   console.log({ output });

//   return result;
// }

// export function ShapeComposition(x: number, y: number, width: number, height: number, parts: number): any {
//   const result: INode[] = [];

//   parts = 3;
//   const totalNumberOfRow = parts * (parts - 1);

//   for (let i = 0; i < totalNumberOfRow; i++) {
//     const node = new Node(x, y, width, height, 'row');


//     if (width <= height) {
//       // by rows
//       const rowHeight = height / parts;
//       console.log({ rowHeight });

//       for (let i = 0; i < parts; i++) {

//         const node = new Node(x, y + rowHeight * i, width, rowHeight, 'row');
//         // const child1 = recursive(x, y + rowHeight * i, width, rowHeight, i, size);
//         // const child2 = recursive(x, y + rowHeight * (i + 1), width, rowHeight, i, size);
//         const childHeight = y + rowHeight * i
//         const childHeight2 = y + rowHeight * (i + 1)

//         // const child1 = recursive(x, y + rowHeight * i, width, rowHeight, i, size);
//         // const child2 = recursive(x, y + rowHeight * (i + 1), width, rowHeight, parts - i - 1, size);

//         node.addChild(node);
//       }
//     } else {

//       const colWidth = width / parts;
//       for (let i = 1; i < parts; i++) {
//         const node = new Node(x + colWidth * i, y, colWidth, height, 'col');

//         // const child1 = recursive(x + colWidth * i, y, colWidth, height, parts - 1, size);
//         // const child2 = recursive(x + colWidth * (i + 1), y, colWidth, height, parts - 2, size);

//         // child1.forEach(child => node.addChild(child));
//         // child2.forEach(child => node.addChild(child));

//         node.addChild(node);
//       }
//     }


//     // for (let j = 0; j < n; j++) {
//     //   const rowHeight = h / n;
//     //   const colWidth = w / n;

//     // Determine whether to cut row-wise or column-wise
//     // if (i % 2 === 0) { // Row-wise cut
//     //   for (let k = 0; k < n; k++) {
//     //     const rowNode = new Node(x, y + k * rowHeight, w, rowHeight, 'leaf');
//     //     if (rowNode.coordinates[1] + rowNode.h <= y + h) {
//     //       node.addChild(rowNode);
//     //     }
//     //   }
//     // } else { // Column-wise cut
//     //   for (let k = 0; k < n; k++) {
//     //     const colNode = new Node(x + k * colWidth, y, colWidth, h, 'leaf');
//     //     if (colNode.coordinates[0] + colNode.w <= x + w) {
//     //       node.addChild(colNode);
//     //     }
//     //   }
//     // }
//     // }

//     result.push(node);
//   }
//   console.log({ result });

//   return result1
// }

// const result1 = [{
//   children: [{
//     height: 100,
//     width: 50,
//     x: 0,
//     y: 0
//   }, {
//     height: 50,
//     width: 100,
//     x: 0,
//     y: 50
//   }],
//   height: 100,
//   orientation: "row",
//   width: 100,
//   x: 0,
//   y: 0
// }, {
//   children: [{
//     height: 100,
//     width: 100,
//     x: 0,
//     y: 0
//   }, {
//     height: 0,
//     width: 50,
//     x: 0,
//     y: 100
//   }],
//   height: 100,
//   orientation: "row",
//   width: 100,
//   x: 0,
//   y: 0
// }]



// Usage
// const rectangles = ShapeComposition(0, 0, 300, 200, 3);
// console.log(rectangles);

interface INode {
  x: number;
  y: number;
  width: number;
  height: number;
  
  addChild(child: INode | LeafNode): void;
}

class Node implements INode {
  x: number;
  y: number;
  width: number;
  height: number;
  orientation: 'row' | 'col';
  children: (INode | LeafNode)[] = [];

  constructor(x: number, y: number, width: number, height: number, orientation: 'row' | 'col') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.orientation = orientation;
  }

  addChild(child: INode | LeafNode) {
    this.children.push(child);
  }
}

class LeafNode implements INode {
  x: number;
  y: number;
  width: number;
  height: number;
  co_ordinates:[number,number,number,number]

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.co_ordinates = [x,y,width,height]
  }

  addChild() {
    // Leaf nodes do not have children
  }
}

function generatePermutations(arr: any[]): any[][] {

  const permutations: any[][] = [];

  function permute(arr: any[], left: number, right: number) {
    if (left === right) {
      permutations.push(arr.slice());
    } else {
      for (let i = left; i <= right; i++) {
        arr = swap(arr, left, i);
        permute(arr, left + 1, right);
        arr = swap(arr, left, i);
      }
    }
  }

  function swap(arr: any[], i: number, j: number): any[] {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
  }

  permute(arr, 0, arr.length - 1);
  return permutations;
}

 export function ShapeComposition(x: number, y: number, w: number, h: number, n: number): any[] {
  
  const result: INode[] = [];
  const permutations = generatePermutations(Array.from({ length: n }, (_, i) => i));

  for (const permutation of permutations) {

    const root = new Node(x, y, w, h, 'row');
    let currentX = x;
    let currentY = y;
    let remainingWidth = w;
    let remainingHeight = h;

    for (const part of permutation) {

      const width = remainingWidth / (n - part);
      const height = remainingHeight / (n - part);

      if (remainingWidth >= remainingHeight) {

        const child = new LeafNode(currentX, currentY, width, remainingHeight);
        root.addChild(child);
        currentY += height;
        remainingHeight -= height;

      } else {

        const child = new LeafNode(currentX, currentY, remainingWidth, height);
        root.addChild(child);
        currentX += width;
        remainingWidth -= width;

      }

    }

    result.push(root);
  }

  return result;
}
