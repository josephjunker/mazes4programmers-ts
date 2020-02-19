import fc from "fast-check";
import { assert } from "chai";

import Grid from "../src/grid";
import Cell from "../src/cell";

const smallGrid = fc.tuple(fc.integer(2, 6), fc.integer(2, 6)).map(([x, y]) => new Grid(x, y));

suite("Grid", () => {

    test("constructor makes a grid of the correct size", () => {
        fc.assert(fc.property(fc.tuple(fc.nat(10), fc.nat(10)), ([rows, columns]) => {
            const grid = new Grid(rows, columns);

            assert.equal(grid.rows, rows);
            assert.equal(grid.columns, columns);
            assert.equal(grid.size(), rows * columns);
        }));
    });

    test("constructor creates all cells at correct location", () => {
        fc.assert(fc.property(smallGrid, grid => {
            for(let row = 0; row < grid.rows; row++) {
                for(let column = 0; column < grid.columns; column++) {
                    const cell = grid.cellAt(row, column);
                    if (!cell) throw new Error("unexpected null");
                    assert.equal(row, cell.row);
                    assert.equal(column, cell.column);
                }
            }
        }));
    });

    test("iterator returns each cell once", () => {
        fc.assert(fc.property(smallGrid, grid => {
            const fromIterator = [];
            const fromLoop = [];

            for(const cell of grid) {
                fromIterator.push(cell);
            }

            for(let row = 0; row < grid.rows; row++) {
                for(let column = 0; column < grid.columns; column++) {
                    fromLoop.push(grid.cellAt(row, column));
                }
            }

            assert.sameMembers(fromIterator, fromLoop);
        }));
    });

    test("constructor sets the neighbors of each of its cells", () => {
        function expectedNeighborCount(cell: Cell, grid: Grid) {
            const { row, column } = cell;

            const rowIsOnEdge = row == 0 || row == grid.rows - 1;
            const columnIsOnEdge = column == 0 || column == grid.columns - 1;
            
            return rowIsOnEdge && columnIsOnEdge ? 2 // corner
            :      rowIsOnEdge                   ? 3 // top or bottom edge
            :                     columnIsOnEdge ? 3 // left or right edge
            :      /* cell is not on any edge   */ 4
        }
        
        fc.assert(fc.property(smallGrid, grid => {
            for(const cell of grid) {
                assert.equal(cell.neighbors().length, expectedNeighborCount(cell, grid));
            }
        }));
    });
});
