export class Node {
  #value = null;
  #rightChild = null;
  #leftChild = null;

  constructor(value) {
    this.value = value;
  }

  get value() {
    return this.#value;
  }

  set value(data = null) {
    this.#value = data;
  }

  get rightChild() {
    return this.#rightChild;
  }

  set rightChild(node) {
    if (!(node instanceof Node) && node !== null) {
      throw new Error("Right Child Node must be a type of Node");
    }
    this.#rightChild = node;
  }

  get leftChild() {
    return this.#leftChild;
  }

  set leftChild(node) {
    if (!(node instanceof Node) && node !== null) {
      throw new Error("Left Child Node must be a type of Node");
    }
    this.#leftChild = node;
  }
}
