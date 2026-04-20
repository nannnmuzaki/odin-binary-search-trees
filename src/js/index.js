import "../css/style.css";
import { Tree } from "./binary-search-trees/Tree.js";

let array = [1, 5, 9, 14, 23, 27];

const tree = new Tree(array);

Tree.prettyPrint(tree.root);

console.log(tree.includes(1));
console.log(tree.includes(0));

tree.insert(4);
tree.insert(1);

Tree.prettyPrint(tree.root);
tree.delete(5);
Tree.prettyPrint(tree.root);

console.log("============= Level Order Traversal ==============");
tree.levelOrderForEach((node) => {
  console.log(node.value);
});

console.log("============= In Order Traversal ==============");
tree.inOrderForEach((node) => {
  console.log(node.value);
});

console.log("============= Pre Order Traversal ==============");
tree.preOrderForEach((node) => {
  console.log(node.value);
});

console.log("============= Post Order Traversal ==============");
tree.postOrderForEach((node) => {
  console.log(node.value);
});

console.log("============= Height of a tree node test ==============");
console.log(tree.find(1));
console.log(tree.includes(1));
console.log(tree.height(1));

console.log("============= Depth of a tree node test ==============");
console.log(tree.find(1));
console.log(tree.includes(1));
console.log(tree.depth(1));

tree.insert(5);
tree.insert(6);
console.log("============= Is Balanced Tree test ==============");
console.log("Before:");
Tree.prettyPrint(tree.root);
console.log("Is balanced: " + tree.isBalanced());
console.log("After rebalance:");
tree.rebalance();
Tree.prettyPrint(tree.root);
console.log("Is balanced: " + tree.isBalanced());
