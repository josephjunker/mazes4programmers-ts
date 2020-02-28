import Grid from "../grid";
import Random from "../random";
import binaryTree from "../maze-algorithms/binary-tree";
import toSvg from "../renderers/svg";

const grid = new Grid(8, 12);
binaryTree(grid, new Random());

console.log(toSvg(grid, 20));
