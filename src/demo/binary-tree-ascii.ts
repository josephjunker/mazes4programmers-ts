import Grid from "../grid";
import Random from "../random";
import binaryTree from "../maze-algorithms/binary-tree";
import toAscii from "../renderers/ascii";

const grid = new Grid(5, 5);
binaryTree(grid, new Random());

console.log(toAscii(grid));
