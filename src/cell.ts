
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

    link(cell: Cell) {
        this.linkedCells.set(cell, true);
        cell.linkUnidirectional(this);
    }

    private linkUnidirectional(cell: Cell) {
        this.linkedCells.set(cell, true);
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