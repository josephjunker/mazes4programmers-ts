import fc from "fast-check";
import { assert } from "chai";

import djikstra from "src/djikstra";

import { smallGridWithCell, fullyConnect } from "./testUtils";

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
});
