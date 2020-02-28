import Grid from "../grid";
import Random from "../random";
import sidewinder from "../maze-algorithms/sidewinder";
import toSvg from "../renderers/svg";

const grid = new Grid(20, 10);
sidewinder(grid, new Random());

console.log(toSvg(grid, 20));
