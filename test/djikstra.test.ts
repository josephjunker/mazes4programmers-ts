import fc from "fast-check";
import { assert } from "chai";

import djikstra from "src/djikstra";

import {
  smallGridWithCell,
  fullyConnect,
  smallGridRandomlyConnected
} from "./testUtils";

suite("Djikstra's algorithm", () => {
  test("on a fully-connected grid, distance is cartesian distance", () => {
    fc.assert(
      fc.property(smallGridWithCell, ([grid, root]) => {
        fullyConnect(grid);

        const distances = djikstra(root);

        for (const cell of grid) {
          const cartesian =
            Math.abs(root.row - cell.row) + Math.abs(root.column - cell.column);

          assert.equal(
            distances.get(cell),
            cartesian,
            `assertion failed for cell ${cell}`
          );
        }
      })
    );
  });

  test("on an unconnected grid, only the root cell has a distance", () => {
    fc.assert(
      fc.property(smallGridWithCell, ([grid, root]) => {
        const distances = djikstra(root);

        for (const cell of grid) {
          if (cell === root) {
            assert.equal(distances.get(cell), 0);
          } else {
            assert.isUndefined(distances.get(cell));
          }
        }
      })
    );
  });

  test("on a randomly-connected grid, it terminates without error", () => {
    fc.assert(
      fc.property(smallGridRandomlyConnected, grid => {
        const cell = grid.cellAt(0, 0);
        if (!cell) throw new Error("TILT");
        djikstra(cell);
      })
    );
  });
});
