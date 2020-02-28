import Grid from "src/grid";
import Random from "src/random";

export default function binaryTree(grid: Grid, random: Random) {
  for (const cell of grid) {
    const neighbors = [];
    if (cell.south) neighbors.push(cell.south);
    if (cell.east) neighbors.push(cell.east);

    if (neighbors.length == 0) continue;
    cell.link(random.choose(neighbors));
  }
}
