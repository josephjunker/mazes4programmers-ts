import Grid from "src/grid";
import Random from "src/random";
import sidewinder from "src/maze-algorithms/sidewinder";
import toSvg from "src/renderers/svg";

const grid = new Grid(20, 10);
sidewinder(grid, new Random());

console.log(toSvg(grid, 20));
