import Grid from "src/grid";
import Random from "src/random";
import binaryTree from "src/maze-algorithms/binary-tree";
import toSvg from "src/renderers/svg";

const grid = new Grid(8, 12);
binaryTree(grid, new Random());

console.log(toSvg(grid, 20));
