import { QueueNode } from "../QueueNode/QueueNode.js";

export class Queue {
  #head = null;
  #tail = null;
  #size = 0;

  get size() {
    return this.#size;
  }

  enqueue(value) {
    const node = new QueueNode(value);

    if (this.#tail === null) {
      this.#tail = node;
      this.#head = node;
    } else {
      this.#tail.nextNode = node;
      this.#tail = node;
    }
    this.#size++;
  }

  dequeue() {
    if (this.#head === null) {
      throw new Error("This queue is empty");
    }

    if (this.#head.nextNode === null) {
      this.#tail = null;
    }

    const temp = this.#head;
    this.#head = this.#head.nextNode;

    this.#size--;
    return temp;
  }
}
