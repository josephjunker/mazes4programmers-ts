import fc from "fast-check";
import { assert } from "chai";

import Grid from "../src/grid";

suite("Cell", () => {
    test("linking should be bidirectional", () => {
        fc.assert(fc.property(
            fc.tuple(fc.nat(4), fc.nat(4), fc.nat(4), fc.nat(4)),
            ([firstRow, firstColumn, secondRow, secondColumn]) => {
                const grid = new Grid(5, 5),
                      firstCell = grid.cellAt(firstRow, firstColumn),
                      secondCell = grid.cellAt(secondRow, secondColumn);

                if (!firstCell || !secondCell) throw new Error();
                firstCell.link(secondCell);

                assert.deepEqual(Array.from(firstCell.links()), [secondCell])
                assert.deepEqual(Array.from(secondCell.links()), [firstCell])
            }));
    });
});