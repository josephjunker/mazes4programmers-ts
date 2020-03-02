import Cell from "./cell";

export default class Distances {
  readonly root: Cell;
  private cellDistances: Map<Cell, number>;

  constructor(root: Cell) {
    this.root = root;
    this.cellDistances = new Map();
    this.cellDistances.set(root, 0);
  }

  get(cell: Cell): number | undefined {
    return this.cellDistances.get(cell);
  }

  set(cell: Cell, distance: number) {
    this.cellDistances.set(cell, distance);
  }

  has(cell: Cell): boolean {
    return this.cellDistances.has(cell);
  }

  cells(): IterableIterator<Cell> {
    return this.cellDistances.keys();
  }
}
