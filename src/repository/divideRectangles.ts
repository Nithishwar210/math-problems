interface INode {
  x: number;
  y: number;
  width: number;
  height: number;
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
  co_ordinates: [number, number, number, number]

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.co_ordinates = [x, y, width, height]
  }

}

export class VisualSubCompositionFactory {

  maxWidth: number
  maxHeight: number
  x: number
  y: number

  constructor(maxWidth: number, maxHeight: number) {
    this.maxWidth = maxWidth
    this.maxHeight = maxHeight
    this.x = 0
    this.y = 0
  }

  getSubCompositions(width: number, height: number, parts: number) {
    this.validateDimensions(width, height, parts)
    const result: INode[] = [];
    const permutations = this.getAllPermutations(Array.from({ length: parts }, (_v, i) => i));

    for (const permutation of permutations) {

      const root = new Node(this.x, this.y, width, height, 'row');
      let currentX = this.x;
      let currentY = this.y;
      let remainingWidth = width;
      let remainingHeight = height;

      for (const part of permutation) {

        const width = remainingWidth / (parts - part);
        const height = remainingHeight / (parts - part);

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

    return result
  }

  getAllPermutations(nums: number[]): any[][] {

    const permutations: number[][] = [];

    function permute(nums: number[], left: number, right: number) {

      if (left === right) {
        permutations.push(nums.slice());
      } else {
        for (let i = left; i <= right; i++) {
          nums = swap(nums, left, i);
          permute(nums, left + 1, right)
          nums = swap(nums, left, i)
        }
      }

    }

    function swap(nums: number[], i: number, j: number): number[] {
      const temp = nums[i]
      nums[i] = nums[j]
      nums[j] = temp
      return nums
    }

    permute(nums, 0, nums.length - 1);
    return permutations
  }

  validateDimensions(width: number, height: number, parts: number) {

    const isExceedsBoundaries = (width > this.maxHeight) || (height > this.maxHeight)
    const isPositive = width > 0 && height > 0

    if (isExceedsBoundaries && !isPositive) {
      throw new Error("Invalid input for dimensions");
    };

    if (width > this.maxHeight || height > this.maxHeight) {
      throw new Error("Dimensions exceeds canvas size");
    };

    if (parts <= 1) {
      throw new Error("2 is the Minimum value for splitting parts");
    };

  }

}