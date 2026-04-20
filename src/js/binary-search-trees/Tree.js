import { Queue } from "../Queue/Queue.js";
import { TreeNode } from "../tree-node/TreeNode.js";

export class Tree {
  #root = null;

  constructor(array) {
    if (!Array.isArray(array)) {
      throw new Error("Tree constructor argument must be an array");
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

    const sanitizedArray = [
      ...new Set(
        array.sort((a, b) => {
          return a - b;
        }),
      ),
    ];
    this.#root = this.#buildTree(sanitizedArray, 0, sanitizedArray.length - 1);
  }

  get root() {
    return this.#root;
  }

  #buildTree(array, start, end) {
    if (start > end) return null;

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

  find(value) {
    if (!Number.isSafeInteger(value)) {
      throw new TypeError("Value must be an integer");
    }

    let current = this.#root;

    while (current !== null) {
      if (Object.is(value, current.value)) {
        return current;
      }

      if (value < current.value) {
        current = current.leftChild;
      } else {
        current = current.rightChild;
      }
    }

    return null;
  }

  includes(value) {
    if (this.find(value) !== null) {
      return true;
    }

    return false;
  }

  insert(value) {
    if (!Number.isSafeInteger(value)) {
      throw new TypeError("Value must be an integer");
    }

    if (this.#root === null) {
      this.#root = new TreeNode(value);
      return;
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

    if (value < root.value) {
      root.leftChild = this.#deleteNode(root.leftChild, value);
    } else if (value > root.value) {
      root.rightChild = this.#deleteNode(root.rightChild, value);
    } else {
      if (root.leftChild === null) {
        return root.rightChild;
      }
      if (root.rightChild === null) {
        return root.leftChild;
      }

      const inorderSuccessor = this.#getInorderSuccessor(root);
      root.value = inorderSuccessor.value;
      root.rightChild = this.#deleteNode(
        root.rightChild,
        inorderSuccessor.value,
      );
    }
    return root;
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

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    const queue = new Queue();

    queue.enqueue(this.#root);

    while (queue.size > 0) {
      let current = queue.dequeue().value;

      callback(current);

      if (current.leftChild !== null) {
        queue.enqueue(current.leftChild);
      }

      if (current.rightChild !== null) {
        queue.enqueue(current.rightChild);
      }
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    let stack = [];
    let current = this.#root;
    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current);
        current = current.leftChild;
      }

      current = stack.pop();
      callback(current);

      current = current.rightChild;
    }
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    let stack = [];
    let current = this.#root;
    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current);
        callback(current);
        current = current.leftChild;
      }
      current = stack.pop();

      current = current.rightChild;
    }
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    let stack = [];
    let current = this.#root;
    while (current !== null || stack.length > 0) {
      while (current !== null) {
        if (current.rightChild !== null) {
          stack.push(current.rightChild);
        }
        stack.push(current);
        current = current.leftChild;
      }

      current = stack.pop();

      if (
        stack.length > 0 &&
        current.rightChild !== null &&
        current.rightChild === stack[stack.length - 1]
      ) {
        stack.pop();
        stack.push(current);
        current = current.rightChild;
      } else {
        callback(current);
        current = null;
      }
    }
  }

  #findNodeHeight(node) {
    if (node === null) return -1;

    const leftHeight = this.#findNodeHeight(node.leftChild);
    const rightHeight = this.#findNodeHeight(node.rightChild);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  height(value) {
    const targetNode = this.find(value);

    const height = this.#findNodeHeight(targetNode);
    if (height >= 0) {
      return height;
    }
    return undefined;
  }

  depth(value) {
    if (!Number.isSafeInteger(value)) {
      throw new TypeError("Value must be an integer");
    }

    let current = this.#root;
    let depthCount = 0;

    while (current !== null) {
      if (Object.is(current.value, value)) {
        return depthCount;
      }
      if (value < current.value) {
        current = current.leftChild;
        depthCount++;
      } else {
        current = current.rightChild;
        depthCount++;
      }
    }

    return undefined;
  }

  #isNodeBalanced(node) {
    if (node === null) return -1;

    const leftHeight = this.#isNodeBalanced(node.leftChild);
    if (leftHeight === null) return null;

    const rightHeight = this.#isNodeBalanced(node.rightChild);
    if (rightHeight === null) return null;

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return null;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBalanced() {
    return this.#isNodeBalanced(this.#root) !== null;
  }

  rebalance() {
    if (!this.isBalanced()) {
      const arr = [];
      this.inOrderForEach((node) => {
        arr.push(node.value);
      });

      this.#root = this.#buildTree(arr, 0, arr.length - 1);
    }
  }
}
