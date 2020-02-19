import seedrandom from "seedrandom";

export default class Random {
    readonly seed: string;
    private readonly rng: seedrandom.prng;

    constructor(seed?: string) {
        if (seed) {
            this.seed = seed;
        } else {
            this.seed = Date.now().toString();
        }

        this.rng = seedrandom.alea(this.seed);
    }

    choose<A>(arr: Array<A>) : A {
        if (arr.length == 0) throw new Error("Cannot call choose with an empty array");

        return arr[Math.abs(this.rng.int32()) % arr.length];
    }
}