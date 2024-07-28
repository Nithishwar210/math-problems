// class Node {
//   type: string;
//   w: number;
//   h: number;
//   co_ordinates: number[];
//   children: (Node | LeafNode)[];

//   constructor(w: number, h: number, type: string, co_ordinates: number[]) {
//     this.type = type;
//     this.w = w;
//     this.h = h;
//     this.co_ordinates = co_ordinates;
//     this.children = [];
//   }

//   addChild(child: Node | LeafNode) {
//     this.children.push(child);
//   }
// }

// class LeafNode {
//   type: string;
//   w: number;
//   h: number;
//   co_ordinates: number[];

//   constructor(w: number, h: number, co_ordinates: number[]) {
//     this.type = "leaf";
//     this.w = w;
//     this.h = h;
//     this.co_ordinates = co_ordinates;
//   }
// }

// export function divideRectangle(w: number, h: number, n: number): (Node | LeafNode)[] {
//   const results: (Node | LeafNode)[] = [];

//   function recursive(width: number, height: number, parts: number, x: number, y: number): Node | LeafNode {
//     if (parts === 1) {
//       return new LeafNode(width, height, [x, y, width, height]);
//     }

//     const node = new Node(width, height, "container", [x, y, width, height]);

//     // Horizontal split
//     const rowNode = new Node(width, height, "row", [x, y, width, height]);
//     for (let i = 0; i < parts; i++) {
//       const partHeight = height / parts;
//       const partY = y + i * partHeight;
//       rowNode.addChild(new LeafNode(width, partHeight, [x, partY, width, partHeight]));
//     }
//     results.push(rowNode);

//     // Variant 2: Split vertically into 3 equal parts
//     const colNode1 = new Node(w, h, "col", [x, y, w, h]);
//     for (let i = 0; i < n; i++) {
//       const partWidth = w / n;
//       const partX = x + i * partWidth;
//       colNode1.addChild(new LeafNode(partWidth, h, [partX, y, partWidth, h]));
//     }
//     results.push(colNode1);

//     // Vertical split
//     // const colNode = new Node(width, height, "col", [x, y, width, height]);
//     // for (let i = 0; i < parts; i++) {
//     //   const partWidth = width / parts;
//     //   const partX = x + i * partWidth;
//     //   colNode.addChild(new LeafNode(partWidth, height, [partX, y, partWidth, height]));
//     // }
//     // results.push(colNode);

//     return node;
//   }

//   recursive(w, h, n, 0, 0);
//   return results;
// }


interface Rectangle {
  w: number;
  h: number;
  x: number;
  y: number;
}

class Node {
  type: string;
  w: number;
  h: number;
  x: number;
  y: number;
  children: (Node | LeafNode)[];

  constructor(w: number, h: number, x: number, y: number, type: string) {
    this.type = type;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.children = [];
  }

  addChild(child: Node | LeafNode) {
    this.children.push(child);
  }
}

class LeafNode {
  type: string;
  w: number;
  h: number;
  x: number;
  y: number;

  constructor(w: number, h: number, x: number, y: number) {
    this.type = "leaf";
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
  }
}

export function splitRectangle(rect: Rectangle): Node[] {
  const variants: Node[] = [];
  const { w, h, x, y } = rect;

  // Split into 3 vertical parts
  for (let i = 1; i < 3; i++) {
    for (let j = 1; j < 3; j++) {
      if (i + j >= 3) continue;

      let remainingParts = 3 - i - j;
      let node = new Node(w, h, x, y, "container");

      // First part
      let firstChild = new Node(w / 3, h, x, y, "col");
      firstChild.addChild(new LeafNode(w / 3, h, x, y));
      node.addChild(firstChild);

      // Second part
      let secondChild = new Node(w / 3, h, x + (w / 3) * i, y, "col");
      secondChild.addChild(new LeafNode(w / 3, h, x + (w / 3) * i, y));
      node.addChild(secondChild);

      // Third part
      let thirdChild = new Node(w / 3, h, x + (w / 3) * (i + j), y, "col");
      thirdChild.addChild(new LeafNode(w / 3, h, x + (w / 3) * (i + j), y));
      node.addChild(thirdChild);

      variants.push(node);
    }
  }

  // Split into 3 horizontal parts
  for (let i = 1; i < 3; i++) {
    for (let j = 1; j < 3; j++) {
      if (i + j >= 3) continue;

      let remainingParts = 3 - i - j;
      let node = new Node(w, h, x, y, "container");

      // First part
      let firstChild = new Node(w, h / 3, x, y, "row");
      firstChild.addChild(new LeafNode(w, h / 3, x, y));
      node.addChild(firstChild);

      // Second part
      let secondChild = new Node(w, h / 3, x, y + (h / 3) * i, "row");
      secondChild.addChild(new LeafNode(w, h / 3, x, y + (h / 3) * i));
      node.addChild(secondChild);

      // Third part
      let thirdChild = new Node(w, h / 3, x, y + (h / 3) * (i + j), "row");
      thirdChild.addChild(new LeafNode(w, h / 3, x, y + (h / 3) * (i + j)));
      node.addChild(thirdChild);

      variants.push(node);
    }
  }

  return variants;
}

// Example usage:
const rect: Rectangle = { w: 120, h: 100, x: 0, y: 0 };
const variants = splitRectangle(rect);
console.log(variants);
