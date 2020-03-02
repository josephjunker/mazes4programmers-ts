import fc from "fast-check";
import { assert } from "chai";

import * as utils from "./testUtils";

suite("TestUtils", () => {
  test("fullyConnect should link every cell to its neighbors", () => {
    fc.assert(
      fc.property(utils.smallGrid, grid => {
        utils.fullyConnect(grid);
        for (const cell of grid) {
          assert.sameMembers(cell.neighbors(), Array.from(cell.links()));
        }
      })
    );
  });
});
