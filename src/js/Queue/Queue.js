import { QueueNode } from "../QueueNode/QueueNode";

export class Queue {
  #head = null;
  #tail = null;

  enqueue(value) {
    const node = new QueueNode(value);
    if (this.#tail === null) {
      this.#tail = node;
      this.#head = node;
    }

    this.#tail.next = node;
    this.#tail = node;
  }

  dequeue() {
    if (this.#head === null) {
      throw new Error("This queue is empty");
    }

    const temp = this.#head;
    this.#head = this.#head.next;

    return temp;
  }
}
