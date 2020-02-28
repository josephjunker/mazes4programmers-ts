import Grid from "src/grid";
import Random from "src/random";
import binaryTree from "src/maze-algorithms/binary-tree";
import toAscii from "src/renderers/ascii";

const grid = new Grid(5, 5);
binaryTree(grid, new Random());

console.log(toAscii(grid));
