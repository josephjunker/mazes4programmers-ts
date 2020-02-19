
export default class Cell {
    readonly row: number;
    readonly column: number;

    north: Cell | undefined;
    south: Cell | undefined;
    east: Cell | undefined;
    west: Cell | undefined;

    private linkedCells: Map<Cell, boolean>;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;

        this.linkedCells = new Map();
    }

    link(cell: Cell, bidirectional = true) {
        this.linkedCells.set(cell, true);
        if (bidirectional) cell.link(this, false);
    }

    links() {
        return this.linkedCells.keys();
    }

    isLinked(cell: Cell) {
        return this.linkedCells.get(cell) || false;
    }

    neighbors() : Array<Cell> {
        const neighbors = [];
        if (this.north) neighbors.push(this.north);
        if (this.south) neighbors.push(this.south);
        if (this.east) neighbors.push(this.east);
        if (this.west) neighbors.push(this.west);
        return neighbors;
    }
}