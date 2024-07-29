interface INode {
  type: string;
  w: number;
  h: number;
  coordinates: number[];
  children: INode[];
}

class Node implements INode {
  type: string;
  w: number;
  h: number;
  coordinates: number[];
  children: INode[];

  constructor(x: number, y: number, w: number, h: number, type: string) {
    this.type = type;
    this.w = w;
    this.h = h;
    this.coordinates = [x, y, w, h];
    this.children = [];
  }

  addChild(child: INode) {
    this.children.push(child);
  }
}

class LeafNode implements INode {
  type: string;
  w: number;
  h: number;
  coordinates: number[];
  children: INode[];

  constructor(x: number, y: number, w: number, h: number) {
    this.type = "leaf";
    this.w = w;
    this.h = h;
    this.coordinates = [x, y, w, h];
    this.children = [];
  }
}

export function ShapeComposition(x: number, y: number, w: number, h: number, n: number): any[] {
  const result: INode[] = [];

  if (n === 1) {
    return [new LeafNode(x, y, w, h)];
  }

  function recursive(x: number, y: number, width: number, height: number, parts: number, size: number = 0): any {

    if (parts === 1) {
      const leaf = new LeafNode(x + size, y, width, height);
      return leaf
    }

    for (let i = 1; i < parts; i++) {
      const remainingParts = parts - i;
      if (remainingParts < 1) continue;

      const rowHeight = height / parts * i
      const remainingHeight = height - rowHeight;
      const node = new Node(x + size, y, width, height, 'container');

      if (width >= height) {
        const child1 = recursive(x, y, width, rowHeight, i, node.coordinates[0])
        node.addChild(child1)
        node.addChild(recursive(x + node.coordinates[0], y + rowHeight, width, remainingHeight, remainingParts, node.coordinates[0]))
      }

      if (width <= height) {
        const colWidth = width / parts * i;
        const remainingColWidth = width - colWidth
        node.addChild(recursive(x + node.coordinates[0], y, colWidth, height, i, node.coordinates[0]));
        node.addChild(recursive(x + node.coordinates[0] + colWidth, y, remainingColWidth, height, remainingParts, node.coordinates[0]));
      }
      
      result.push(node)
    }

  }

  recursive(x, y, w, h, n);

  return result;
}
