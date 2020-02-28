import Grid from "src/grid";
import Random from "src/random";

export default function binaryTree(grid: Grid, random: Random) {
  for (const row of grid.iterateRows()) {
    let run = [];

    for (const cell of row) {
      run.push(cell);
      const atSouthernBoundary = cell.south === undefined;

      const shouldCloseOut = !atSouthernBoundary && random.coinFlip();

      if (shouldCloseOut || !cell.east) {
        const member = random.choose(run);
        if (member.south) member.link(member.south);
        run = [];
      } else {
        cell.link(cell.east);
      }
    }
  }
}
