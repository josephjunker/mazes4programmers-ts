import fc from "fast-check";

import Grid from "src/grid";
import Cell from "src/cell";

export const smallGrid = fc
  .tuple(fc.integer(2, 6), fc.integer(2, 6))
  .map(([x, y]) => new Grid(x, y));

export const smallGridWithCell = fc
  .tuple(fc.integer(2, 6), fc.integer(2, 6))
  .chain(([rows, columns]) =>
    fc.tuple(
      fc.constant(rows),
      fc.constant(columns),
      fc.nat(rows - 1),
      fc.nat(columns - 1)
    )
  )
  .map(function([rows, columns, cellRow, cellColumn]): [Grid, Cell] {
    const grid = new Grid(rows, columns),
      cell = grid.cellAt(cellRow, cellColumn);

    if (!cell) throw new Error("TILT");

    return [grid, cell];
  });

export function fullyConnect(grid: Grid) {
  for (const cell of grid) {
    for (const neighbor of cell.neighbors()) {
      cell.link(neighbor);
    }
  }
}
