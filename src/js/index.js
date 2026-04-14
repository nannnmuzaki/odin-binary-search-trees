import "../css/style.css";
import { Tree } from "./binary-search-trees/Tree.js";

let array = [1, 5, 9, 14, 23, 27];

const tree = new Tree(array);

let mid = Math.round((array.length - 1) / 2);
console.log(array.length - 1);
console.log(mid);
console.log(array[mid]);
console.log(tree);
