import { TreeNode } from "../tree-node/TreeNode.js";

export class Tree {
  #root = null;

  constructor(array) {
    this.#root = this.#buildTree(array, 0, array.length - 1);
  }

  #buildTree(array, start, end) {
    if (start > end) return null;

    if (!Array.isArray(array)) {
      throw new Error("buildTree argument must be an array");
    }

    let n = array.length;

    if (array.length === 0) {
      throw new Error("cannot pass empty array as argument");
    }

    for (let i = 0; i < array.length; i++) {
      if (!Number.isSafeInteger(i)) {
        throw new TypeError("All array element must be an integer");
      }
    }

    let sorted = false;

    if (!sorted) {
      array.sort((a, b) => a - b);
      sorted = true;
    }

    let mid = start + Math.round((end - start) / 2);
    let root = new TreeNode(array[mid]);

    root.leftChild = this.#buildTree(array, start, mid - 1);
    root.rightChild = this.#buildTree(array, mid + 1, end);

    return root;
  }
}
