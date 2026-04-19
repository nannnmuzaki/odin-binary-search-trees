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

    if (n === 0) {
      throw new Error("cannot pass empty array as argument");
    }

    for (let i = 0; i < n; i++) {
      if (!Number.isSafeInteger(i)) {
        throw new TypeError("All array element must be an integer");
      }
    }

    let sorted = false;

    if (!sorted) {
      array.sort((a, b) => a - b);
      sorted = true; // eslint-disable-line
    }

    let mid = start + Math.round((end - start) / 2);
    let root = new TreeNode(array[mid]);

    root.leftChild = this.#buildTree(array, start, mid - 1);
    root.rightChild = this.#buildTree(array, mid + 1, end);

    return root;
  }

  static prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    Tree.prettyPrint(
      node.rightChild,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false,
    );
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    Tree.prettyPrint(
      node.leftChild,
      `${prefix}${isLeft ? "    " : "│   "}`,
      true,
    );
  }

  includes(value) {
    if (!Number.isSafeInteger(value)) {
      throw new TypeError("Value must be an integer");
    }

    let current = this.#root;

    while (current !== null) {
      if (Object.is(value, current.value)) {
        return true;
      }

      if (value < current.value) {
        current = current.leftChild;
      } else {
        current = current.rightChild;
      }
    }

    return false;
  }

  insert(value) {
    if (!Number.isSafeInteger(value)) {
      throw new TypeError("Value must be an integer");
    }

    let current = this.#root;

    while (current !== null) {
      if (Object.is(value, current.value)) {
        return;
      }

      if (value < current.value && current.leftChild !== null) {
        current = current.leftChild;
      } else if (value > current.value && current.rightChild !== null) {
        current = current.rightChild;
      } else {
        break;
      }
    }

    console.log(current);

    if (value < current.value) {
      current.leftChild = new TreeNode(value);
    } else {
      current.rightChild = new TreeNode(value);
    }
  }

  #deleteNode(root, value) {
    if (!Number.isSafeInteger(value)) {
      throw new TypeError("Value must be an integer");
    }

    if (root === null) return root;

    if (value < root.data) {
      root = this.#deleteNode(root.left, value); // eslint-disable-line
    } else if (value > root.data) {
      root = this.#deleteNode(root.right, value); // eslint-disable-line
    } else {
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }

      const inorderSuccessor = this.#getInorderSuccessor(root);
      root.value = inorderSuccessor.value;
      root.rightChild = this.#deleteNode(root.right, inorderSuccessor.value);
    }
  }

  #getInorderSuccessor(current) {
    if (current === null || !(current instanceof TreeNode)) {
      throw new TypeError("Current node parameter must be a type of TreeNode");
    }
    current = current.rightChild;
    while (current !== null && current.leftChild !== null) {
      current = current.leftChild;
    }
    return current;
  }

  delete(value) {
    this.#deleteNode(this.#root, value);
  }
}
