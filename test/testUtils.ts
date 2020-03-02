import fc from "fast-check";

import Grid from "src/grid";
import Cell from "src/cell";
import Random from "src/random";
import djikstra from "src/djikstra";
import { assert } from "chai";

export const smallGrid = fc
  .tuple(fc.integer(2, 6), fc.integer(2, 6))
  .map(([x, y]) => new Grid(x, y));

function cellCoordinates(
  minRow: number,
  maxRow: number,
  minColumn: number,
  maxColumn: number
): fc.Arbitrary<[number, number]> {
  return fc.tuple(fc.integer(minRow, maxRow), fc.integer(minColumn, maxColumn));
}

export const smallGridWithCell = fc
  .tuple(fc.integer(2, 6), fc.integer(2, 6))
  .chain(([rows, columns]) =>
    fc.tuple(
      fc.constant(rows),
      fc.constant(columns),
      cellCoordinates(0, rows - 1, 0, columns - 1)
    )
  )
  .map(function([rows, columns, [cellRow, cellColumn]]): [Grid, Cell] {
    const grid = new Grid(rows, columns),
      cell = grid.cellAt(cellRow, cellColumn);

    if (!cell) throw new Error("TILT");

    return [grid, cell];
  });

export const smallGridRandomlyConnected = fc
  .tuple(fc.integer(2, 6), fc.integer(2, 6))
  .chain(([rows, columns]) =>
    fc.tuple(
      fc.constant(rows),
      fc.constant(columns),
      fc.array(
        // Cells to connect to the east
        cellCoordinates(0, rows - 1, 0, columns - 2),
        rows * (columns - 1)
      ),
      fc.array(
        // cells to connect to the south
        cellCoordinates(0, rows - 2, 0, columns - 1),
        (rows - 1) * columns
      )
    )
  )
  .map(([rows, columns, connectEast, connectSouth]) => {
    const grid = new Grid(rows, columns);

    connectEast.forEach(([row, column]) => {
      const cell = grid.cellAt(row, column);
      if (!cell || !cell.east) throw new Error("TILT");

      cell.link(cell.east);
    });

    connectSouth.forEach(([row, column]) => {
      const cell = grid.cellAt(row, column);
      if (!cell || !cell.south) throw new Error("TILT");

      cell.link(cell.south);
    });

    return grid;
  });

export function fullyConnect(grid: Grid) {
  for (const cell of grid) {
    for (const neighbor of cell.neighbors()) {
      cell.link(neighbor);
    }
  }
}

export const seededRandom = fc.string().map(str => new Random(str));

export function propertyEveryCellIsReachable(
  algo: (grid: Grid, rand: Random) => void
) {
  return fc.property(
    fc.tuple(smallGridWithCell, seededRandom),
    ([[grid, root], rand]) => {
      algo(grid, rand);
      const distances = djikstra(root);
      for (const cell of grid) {
        assert.isNumber(distances.get(cell));
      }
    }
  );
}
