import fc from "fast-check";

import sidewinder from "src/maze-algorithms/sidewinder";

import { propertyEveryCellIsReachable } from "./testUtils";

suite("Binary tree algorithm", () => {
  test("every cell is reachable", () => {
    fc.assert(propertyEveryCellIsReachable(sidewinder));
  });
});
