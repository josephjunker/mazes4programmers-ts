import Grid from "../grid";
import Random from "../random";

export default function binaryTree(grid: Grid, random: Random) {
    for (const cell of grid) {
        const neighbors = [];
        if (cell.north) neighbors.push(cell.north);
        if (cell.east) neighbors.push(cell.east);

        if (neighbors.length == 0) continue;
        cell.link(random.choose(neighbors));
    }
}