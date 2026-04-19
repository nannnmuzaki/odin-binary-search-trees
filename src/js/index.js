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

tree.levelOrderForEach((node) => {
  console.log(node.value);
});

console.log("===========================");

tree.inOrderForEach((node) => {
  console.log(node.value);
});
