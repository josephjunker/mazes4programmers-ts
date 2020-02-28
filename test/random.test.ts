import fc from "fast-check";
import { assert } from "chai";

import Random from "src/random";

const arbRng = fc
  .option(fc.string(5))
  .map(str => (str ? new Random(str) : new Random()));

suite("Random", () => {
  test("choose returns array elements", () => {
    const arbArray = fc.array(fc.option(fc.string(5)), 1, 5);
    fc.assert(
      fc.property(fc.tuple(arbRng, arbArray), ([rng, arr]) => {
        const hits = new Map();
        for (let i = 0; i < 100; i++) {
          const generated = rng.choose(arr);
          hits.set(generated, true);
        }

        const generated = Array.from(hits.keys());

        // We check inclusion both ways rather than use sameMembers,
        // to permit duplicates in the input array
        assert.includeMembers(arr, generated);
        assert.includeMembers(generated, arr);
      })
    );
  });
});
