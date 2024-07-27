
export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    color?: string
}

export interface Range {
    min: number;
    max: number;
}

export type Option = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Config {
    paddingRange: Range; // Padding around the rects to form the rects
    widthCoverageRange: Range; // For row 2 outcomes where horizontal bar is covering rects
    whichOutput: Option; // Values can be 1, 2, 3, 4, 5, 6, 7
    spacing: { x: number, y: number },
    decorColor: string
}
