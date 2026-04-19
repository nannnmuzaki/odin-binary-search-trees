export class QueueNode {
  #value = null;
  #nextNode = null;

  constructor(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  set value(data = null) {
    this.#value = data;
  }

  get nextNode() {
    return this.#nextNode;
  }

  set nextNode(node) {
    if (!(node instanceof QueueNode) && node !== null) {
      throw new Error("Right Child Node must be a type of QueueNode");
    }
    this.#nextNode = node;
  }
}
