import React from "react";
// import { Rectangle } from "../../types/rectDecorations";
// import { splitRectangle } from "../../repository/divideRectangles";
const rects = [
    {
        "type": "row",
        "w": 100,
        "h": 100,
        "co_ordinates": [
            0,
            0,
            100,
            100
        ],
        "children": [
            {
                "type": "leaf",
                "w": 100,
                "h": 33.33,
                "co_ordinates": [
                    0,
                    0,
                    100,
                    33.33
                ]
            },
            {
                "type": "leaf",
                "w": 100,
                "h": 33.33,
                "co_ordinates": [
                    0,
                    33.33,
                    100,
                    33.33
                ]
            },
            {
                "type": "leaf",
                "w": 100,
                "h": 33.33,
                "co_ordinates": [
                    0,
                    66.66,
                    100,
                    33.33
                ]
            }
        ]
    },
    {
        "type": "row",
        "w": 100,
        "h": 100,
        "co_ordinates": [
            0,
            0,
            100,
            100
        ],
        "children": [
            {
                "type": "leaf",
                "w": 100,
                "h": 50,
                "co_ordinates": [
                    0,
                    0,
                    100,
                    50
                ]
            },
            {
                "type": "leaf",
                "w": 50,
                "h": 50,
                "co_ordinates": [
                    0,
                    50,
                    50,
                    50
                ]
            },
            {
                "type": "leaf",
                "w": 50,
                "h": 50,
                "co_ordinates": [
                    50,
                    50,
                    50,
                    50
                ]
            }
        ]
    },
    {
        "type": "row",
        "w": 100,
        "h": 100,
        "co_ordinates": [
            0,
            0,
            100,
            100
        ],
        "children": [
            {
                "type": "leaf",
                "w": 50,
                "h": 50,
                "co_ordinates": [
                    0,
                    0,
                    50,
                    50
                ]
            },
            {
                "type": "leaf",
                "w": 50,
                "h": 50,
                "co_ordinates": [
                    50,
                    0,
                    50,
                    50
                ]
            },
            {
                "type": "leaf",
                "w": 100,
                "h": 50,
                "co_ordinates": [
                    0,
                    50,
                    100,
                    50
                ]
            }
        ]
    },
    {
        "type": "row",
        "w": 100,
        "h": 100,
        "co_ordinates": [
            0,
            0,
            100,
            100
        ],
        "children": [
            {
                "type": "leaf",
                "w": 50,
                "h": 50,
                "co_ordinates": [
                    0,
                    0,
                    50,
                    50
                ]
            },
            {
                "type": "leaf",
                "w": 50,
                "h": 50,
                "co_ordinates": [
                    0,
                    50,
                    50,
                    50
                ]
            },
            {
                "type": "leaf",
                "w": 50,
                "h": 100,
                "co_ordinates": [
                    50,
                    0,
                    50,
                    100
                ]
            }
        ]
    },
    {
        "type": "row",
        "w": 100,
        "h": 100,
        "co_ordinates": [
            0,
            0,
            100,
            100
        ],
        "children": [
            {
                "type": "leaf",
                "w": 50,
                "h": 100,
                "co_ordinates": [
                    0,
                    0,
                    50,
                    100
                ]
            },
            {
                "type": "leaf",
                "w": 50,
                "h": 50,
                "co_ordinates": [
                    50,
                    0,
                    50,
                    50
                ]
            },
            {
                "type": "leaf",
                "w": 50,
                "h": 50,
                "co_ordinates": [
                    50,
                    50,
                    50,
                    50
                ]
            }
        ]
    },
    {
        "type": "row",
        "w": 100,
        "h": 100,
        "co_ordinates": [
            0,
            0,
            100,
            100
        ],
        "children": [
            {
                "type": "leaf",
                "w": 33.33,
                "h": 100,
                "co_ordinates": [
                    0,
                    0,
                    33.33,
                    100
                ]
            },
            {
                "type": "leaf",
                "w": 33.33,
                "h": 100,
                "co_ordinates": [
                    33.33,
                    0,
                    33.33,
                    100
                ]
            },
            {
                "type": "leaf",
                "w": 33.33,
                "h": 100,
                "co_ordinates": [
                    66.66,
                    0,
                    33.33,
                    100
                ]
            }
        ]
    }
]

export const DivideRectangles = () => {

    // const [rectangles, setRectangles] = React.useState<Rectangle[]>([]);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    // const decorInstance = new Decorator(config);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const input = { w: 100, h: 100, n: 4 };
        const rectangles = generateSplit({ ...input, x: 0, y: 0 }, 5);
        console.log({ rectangles });
        drawRectangles(ctx, rectangles)
        // drawRectangles(ctx, rectangles);
    }, [])
  
    // const drawRectangles = (context: any, rectangles: (Node | any)[]) => {
    //     rectangles.forEach(rect => {
    //         if (rect.type === 'leaf') {
    //             context.strokeStyle = 'black';
    //             console.log({ w: rect.width });

    //             context.strokeRect(rect.x, rect.y, rect.w, rect.h);

    //         } else if (rect.children) {
    //             console.log({ child: rect.children });
    //             drawRectangles(context, rect.children);
    //         }
    //     })
    // };

    function drawRectangles(context: any, node: any) {
        if (node.type === "leaf") {
            context.strokeRect(node.x, node.y, node.w, node.h);
        }
        node.children.forEach((child: any) => drawRectangles(context, child));
    }

    return (
        <div>
            <h2>Divide decorations</h2>
            {/* <label>Choose a Decor:</label> */}
            <div>
                <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />
            </div>
        </div>
    )
}
// interface Rectangle {
//     w: number;
//     h: number;
//     x: number;
//     y: number;
// }

// class Node {
//     type: string;
//     w: number;
//     h: number;
//     x: number;
//     y: number;
//     children: (Node | LeafNode)[];

//     constructor(w: number, h: number, x: number, y: number, type: string) {
//         this.type = type;
//         this.w = w;
//         this.h = h;
//         this.x = x;
//         this.y = y;
//         this.children = [];
//     }

//     addChild(child: Node | LeafNode) {
//         this.children.push(child);
//     }
// }

// class LeafNode {
//     type: string;
//     w: number;
//     h: number;
//     x: number;
//     y: number;

//     constructor(w: number, h: number, x: number, y: number) {
//         this.type = "leaf";
//         this.w = w;
//         this.h = h;
//         this.x = x;
//         this.y = y;
//     }
// }

// function splitRectangle(rect: Rectangle): Node[] {
//     const variants: Node[] = [];
//     let { w, h, x, y } = rect;

//     // Variant 1: Three horizontal parts
//     let node1 = new Node(w, h, x, y, "container");
//     node1.addChild(new LeafNode(w, h / 3, x, y));
//     node1.addChild(new LeafNode(w, h / 3, x, y + h / 3));
//     node1.addChild(new LeafNode(w, h / 3, x, y + (2 * h) / 3));
//     variants.push(node1);

//     x = x + w

//     // Variant 2: Three vertical parts
//     let node2 = new Node(w, h, x, y, "container");
//     node2.addChild(new LeafNode(w / 3, h, x, y));
//     node2.addChild(new LeafNode(w / 3, h, x + w / 3, y));
//     node2.addChild(new LeafNode(w / 3, h, x + (2 * w) / 3, y));
//     variants.push(node2);

//     x = x + w
//     // Variant 3: Top half and two bottom vertical parts
//     let node3 = new Node(w, h, x, y, "container");
//     node3.addChild(new LeafNode(w, h / 2, x, y));
//     node3.addChild(new LeafNode(w / 2, h / 2, x, y + h / 2));
//     node3.addChild(new LeafNode(w / 2, h / 2, x + w / 2, y + h / 2));
//     variants.push(node3);

//     x = x + w

//     // Variant 4: Bottom half and two top vertical parts
//     let node4 = new Node(w, h, x, y, "container");
//     node4.addChild(new LeafNode(w / 2, h / 2, x, y));
//     node4.addChild(new LeafNode(w / 2, h / 2, x + w / 2, y));
//     node4.addChild(new LeafNode(w, h / 2, x, y + h / 2));
//     variants.push(node4);

//     x = x + w

//     // Variant 5: Left half and two right horizontal parts
//     let node5 = new Node(w, h, x, y, "container");
//     node5.addChild(new LeafNode(w / 2, h, x, y));
//     node5.addChild(new LeafNode(w / 2, h / 2, x + w / 2, y));
//     node5.addChild(new LeafNode(w / 2, h / 2, x + w / 2, y + h / 2));
//     variants.push(node5);

//     x = x + w
//     // Variant 6: Right half and two left horizontal parts
//     let node6 = new Node(w, h, x, y, "container");
//     node6.addChild(new LeafNode(w / 2, h / 2, x, y));
//     node6.addChild(new LeafNode(w / 2, h / 2, x, y + h / 2));
//     node6.addChild(new LeafNode(w / 2, h, x + w / 2, y));
//     variants.push(node6);

//     return variants;


interface Rectangle {
    w: number;
    h: number;
    x: number;
    y: number;
}

//   class Node {
//     type: string;
//     w: number;
//     h: number;
//     x: number;
//     y: number;
//     children: (Node | LeafNode)[];

//     constructor(w: number, h: number, x: number, y: number, type: string) {
//       this.type = type;
//       this.w = w;
//       this.h = h;
//       this.x = x;
//       this.y = y;
//       this.children = [];
//     }

//     addChild(child: Node | LeafNode) {
//       this.children.push(child);
//     }
//   }

//   class LeafNode {
//     type: string;
//     w: number;
//     h: number;
//     x: number;
//     y: number;

//     constructor(w: number, h: number, x: number, y: number) {
//       this.type = "leaf";
//       this.w = w;
//       this.h = h;
//       this.x = x;
//       this.y = y;
//     }
//   }

// function generateHorizontalSplit(rect: Rectangle, parts: number): Node {
//     const { w, h, x, y } = rect;
//     let node = new Node(w, h, x, y, "container");

//     for (let i = 0; i < parts; i++) {
//       node.addChild(new LeafNode(w, h / parts, x, y + (i * h) / parts));
//     }

//     return node;
//   }

//   function generateVerticalSplit(rect: Rectangle, parts: number): Node {
//     const { w, h, x, y } = rect;
//     let node = new Node(w, h, x, y, "container");

//     for (let i = 0; i < parts; i++) {
//       node.addChild(new LeafNode(w / parts, h, x + (i * w) / parts, y));
//     }

//     return node;
//   }

//   function generateMixedSplit(rect: Rectangle, parts: number): Node[] {
//     const { w, h, x, y } = rect;
//     const nodes: Node[] = [];

//     // Top half and two bottom vertical parts
//     let node1 = new Node(w, h, x, y, "container");
//     node1.addChild(new LeafNode(w, h / 2, x, y));
//     for (let i = 0; i < parts - 1; i++) {
//       node1.addChild(new LeafNode(w / (parts - 1), h / 2, x + (i * w) / (parts - 1), y + h / 2));
//     }
//     nodes.push(node1);

//     // Bottom half and two top vertical parts
//     let node2 = new Node(w, h, x + w + 10, y, "container"); // Shifted right
//     for (let i = 0; i < parts - 1; i++) {
//       node2.addChild(new LeafNode(w / (parts - 1), h / 2, x + w + 10 + (i * w) / (parts - 1), y));
//     }
//     node2.addChild(new LeafNode(w, h / 2, x + w + 10, y + h / 2));
//     nodes.push(node2);

//     // Left half and two right horizontal parts
//     let node3 = new Node(w, h, x, y + h + 10, "container"); // Shifted down
//     node3.addChild(new LeafNode(w / 2, h, x, y + h + 10));
//     for (let i = 0; i < parts - 1; i++) {
//       node3.addChild(new LeafNode(w / 2, h / (parts - 1), x + w / 2, y + h + 10 + (i * h) / (parts - 1)));
//     }
//     nodes.push(node3);

//     // Right half and two left horizontal parts
//     let node4 = new Node(w, h, x + w + 10, y + h + 10, "container"); // Shifted right and down
//     for (let i = 0; i < parts - 1; i++) {
//       node4.addChild(new LeafNode(w / 2, h / (parts - 1), x + w + 10, y + h + 10 + (i * h) / (parts - 1)));
//     }
//     node4.addChild(new LeafNode(w / 2, h, x + w + 10 + w / 2, y + h + 10));
//     nodes.push(node4);

//     return nodes;
//   }

//   function splitRectangle(rect: Rectangle, parts: number): Node[] {
//     const variants: Node[] = [];

//     // Generate horizontal and vertical splits
//     variants.push(generateHorizontalSplit(rect, parts));

//     rect.x = rect.x + rect.w + 10
//     variants.push(generateVerticalSplit(rect, parts));
//     rect.x = rect.x + rect.w  + 10
//     // Generate mixed splits
//     const mixedSplits = generateMixedSplit(rect, parts);
//     variants.push(...mixedSplits);

//     return variants;
//   }

class Node {
    children: Node[];
    constructor(public w: number, public h: number, public x: number, public y: number, public type: string = "container") {
        this.children = [];
    }
    addChild(child: Node) {
        this.children.push(child);
    }
}

class LeafNode extends Node {
    constructor(w: number, h: number, x: number, y: number) {
        super(w, h, x, y, "leaf");
    }
}

class Rectangle {
    constructor(public w: number, public h: number, public x: number, public y: number) { }
}

function splitRectangleRecursive(rect: Rectangle, parts: number, horizontal: boolean): Node {
    if (parts === 1) {
        return new LeafNode(rect.w, rect.h, rect.x, rect.y);
    }

    let node = new Node(rect.w, rect.h, rect.x, rect.y);
    let splitSize = Math.floor(parts / 2);

    if (horizontal) {
        let height1 = (rect.h * splitSize) / parts;
        let height2 = rect.h - height1;

        let rect1 = new Rectangle(rect.w, height1, rect.x, rect.y);
        let rect2 = new Rectangle(rect.w, height2, rect.x, rect.y + height1);

        node.addChild(splitRectangleRecursive(rect1, splitSize, !horizontal));
        node.addChild(splitRectangleRecursive(rect2, parts - splitSize, !horizontal));
    } else {
        let width1 = (rect.w * splitSize) / parts;
        let width2 = rect.w - width1;

        let rect1 = new Rectangle(width1, rect.h, rect.x, rect.y);
        let rect2 = new Rectangle(width2, rect.h, rect.x + width1, rect.y);

        node.addChild(splitRectangleRecursive(rect1, splitSize, !horizontal));
        node.addChild(splitRectangleRecursive(rect2, parts - splitSize, !horizontal));
    }

    return node;
}

function generateSplit(rect: Rectangle, parts: number): Node {
    // Start with horizontal split
    return splitRectangleRecursive(rect, parts, true);
}