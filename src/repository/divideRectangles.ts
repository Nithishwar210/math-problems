type Rectangle = {
  w: number;
  h: number;
  x: number;
  y: number;
};

class LeafNode {
  constructor(public w: number, public h: number, public x: number, public y: number, public type: string = 'leaf') { }
}

class Node {
  children: (Node | LeafNode)[] = [];
  constructor(public w: number, public h: number, public x: number, public y: number, public type: string) { }

  addChild(child: Node | LeafNode) {
    this.children.push(child);
  }
}

export class RectangleSplitter {

  private generateHorizontalSplit(rect: Rectangle, parts: number): Node {
    const { w, h, x, y } = rect;
    const node = new Node(w, h, x, y, "container");

    for (let i = 0; i < parts; i++) {
      node.addChild(new LeafNode(w / parts, h, x + (i * w) / parts, y));
    }

    return node;
  }

  private generateVerticalSplit(rect: Rectangle, parts: number): Node {
    const { w, h, x, y } = rect;
    const node = new Node(w, h, x, y, "container");

    for (let i = 0; i < parts; i++) {
      node.addChild(new LeafNode(w, h / parts, x, y + (i * h) / parts));
    }

    return node;
  }

  private generateMixedSplit(rect: Rectangle, parts: number): Node[] {

    let { w, h, x, y } = rect;
    const nodes: Node[] = [];

    let container1 = new Node(w, h, x, y, "container");
    container1.addChild(new LeafNode(w, h / 2, x, y));
    for (let i = 0; i < parts - 1; i++) {
      container1.addChild(new LeafNode(w / (parts - 1), h / 2, x + (i * w) / (parts - 1), y + h / 2));
    }
    nodes.push(container1);


    let nextPosition = this.getNextPosition({ ...rect, offset: 10 });
    
    let container2 = new Node(w, h, nextPosition.x, y, "container");
    for (let i = 0; i < parts - 1; i++) {
      container2.addChild(new LeafNode(w / (parts - 1), h / 2, nextPosition.x + (i * w) / (parts - 1), y));
    }
    container2.addChild(new LeafNode(w, h / 2, nextPosition.x, y + h / 2));
    nodes.push(container2);

    rect.x = 0;

    nextPosition = this.getNextPosition({ ...rect, offset: 10 });

    let container3 = new Node(w, h, rect.x, nextPosition.y, "container");
    container3.addChild(new LeafNode(w / 2, h, rect.x, nextPosition.y));
    for (let i = 0; i < parts - 1; i++) {
      container3.addChild(new LeafNode(w / 2, h / (parts - 1), rect.x + w / 2, nextPosition.y + (i * h) / (parts - 1)));
    }

    nodes.push(container3);

    let container4 = new Node(w, h, nextPosition.x,nextPosition.y, "container");
    for (let i = 0; i < parts - 1; i++) {
      container4.addChild(new LeafNode(w / 2, h / (parts - 1), nextPosition.x,nextPosition.y + (i * h) / (parts - 1)));
    }
    container4.addChild(new LeafNode(w / 2, h, nextPosition.x + w / 2,nextPosition.y));
    nodes.push(container4);

    return nodes;
  }

  getNextPosition({ x, w, y, h, offset }: { x: number, y: number, w: number, h: number, offset: number }): Rectangle {
    return { w, h, x: x + w + offset, y: y + h + offset };
  }

  splitRectangle(rect: Rectangle, parts: number): Node[] {
    const variants: Node[] = [];
    variants.push(this.generateHorizontalSplit(rect, parts));
    rect.x = rect.x + rect.w + 10;
    variants.push(this.generateVerticalSplit(rect, parts));
    rect.x = rect.x + rect.w + 10;
    const mixedSplits = this.generateMixedSplit(rect, parts);
    variants.push(...mixedSplits);

    return variants;
  }
}