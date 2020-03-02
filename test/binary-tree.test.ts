import fc from "fast-check";

import binaryTree from "src/maze-algorithms/binary-tree";

import { propertyEveryCellIsReachable } from "./testUtils";

suite("Binary tree algorithm", () => {
  test("every cell is reachable", () => {
    fc.assert(propertyEveryCellIsReachable(binaryTree));
  });
});
