import "../css/style.css";
import { Tree } from "./binary-search-trees/Tree.js";

let array = [1, 5, 9, 14, 23, 27];

const tree = new Tree(array);

let mid = Math.round((array.length - 1) / 2);
console.log(array.length - 1);
console.log(mid);
console.log(array[mid]);
Tree.prettyPrint(tree.root);

console.log(tree.includes(1));
console.log(tree.includes(0));

tree.insert(4);
tree.insert(1);

Tree.prettyPrint(tree.root);
tree.delete(5);
Tree.prettyPrint(tree.root);
