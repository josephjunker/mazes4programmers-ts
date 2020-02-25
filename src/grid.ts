import Cell from "./cell";

export default class Grid {
  readonly rows: number;
  readonly columns: number;

  private grid: Array<Cell>;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;

    this.grid = this.prepareCells();
    this.configureCells();
  }

  protected prepareCells(): Array<Cell> {
    const grid = [];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        grid[this.index(i, j)] = new Cell(i, j);
      }
    }

    return grid;
  }

  protected configureCells() {
    this.grid.forEach(cell => {
      cell.north = this.cellAt(cell.row - 1, cell.column);
      cell.south = this.cellAt(cell.row + 1, cell.column);
      cell.east = this.cellAt(cell.row, cell.column + 1);
      cell.west = this.cellAt(cell.row, cell.column - 1);
    });
  }

  protected index(row: number, column: number): number {
    return row * this.columns + column;
  }

  cellAt(row: number, column: number): Cell | undefined {
    if (row < 0 || column < 0 || row >= this.rows || column >= this.columns)
      return undefined;

    return this.grid[this.index(row, column)];
  }

  size(): number {
    return this.rows * this.columns;
  }

  [Symbol.iterator](): Iterator<Cell> {
    return this.grid[Symbol.iterator]();
  }

  iterateRows(): Iterable<Array<Cell>> {
    const { rows, grid, columns } = this;
    return {
      *[Symbol.iterator]() {
        let row = 0;
        while (row < rows) {
          yield grid.slice(row * columns, (row + 1) * columns);
          row++;
        }
      }
    };
  }
}
