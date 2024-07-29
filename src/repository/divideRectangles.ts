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
  
  function recursive(x: number, y: number, width: number, height: number, parts: number): any {
    
    if (parts === 1) {
      const leaf = new LeafNode(x, y, width, height);
      return leaf
    }
    
    for (let i = 1; i < parts; i++) {

      let remainingParts = parts - i;
      if (remainingParts < 1) continue;

      const node = new Node(x, y, width, height, "container");
      
      // Horizontal split
      const splitRatio = Math.random();
      const splitHeight = height * splitRatio
      const remainingHeight = height - splitHeight;
      const horizontalNode = new Node(x, y, width, height, "container");
      horizontalNode.addChild(recursive(x, y, width, splitHeight, i));
      horizontalNode.addChild(recursive(x, y + splitHeight, width, remainingHeight, remainingParts));
      node.addChild(horizontalNode);

      // Vertical split
      const splitWidth = width * splitRatio;
      const remainingWidth = width - splitWidth;
      const verticalNode = new Node(x, y, width, height, "container");
      verticalNode.addChild(recursive(x, y, splitWidth, height, i));
      verticalNode.addChild(recursive(x + splitWidth, y, remainingWidth, height, remainingParts));
      node.addChild(verticalNode);

      // Adding both current container node in result
      result.push(node)
    }

  }

  recursive(x, y, w, h, n);

  return result;
}
