import { Point, Box, line, render, SVGElement } from "src/renderers/svg-data";

import Grid from "src/grid";
import Cell from "src/cell";

export default function gridToSvg(grid: Grid, cellSize: number): string {
  const buffer = Math.ceil(cellSize / 2),
    width = grid.columns * cellSize + buffer * 2,
    height = grid.rows * cellSize + buffer * 2;

  const viewPort = new Box(new Point(0, 0), new Point(width, height));

  const lines = Array.from(grid).flatMap(cell =>
    renderCell(buffer, cellSize, cell)
  );

  return render(viewPort, lines);
}

function renderCell(
  buffer: number,
  cellSize: number,
  cell: Cell
): Array<SVGElement> {
  const left = buffer + cellSize * cell.column,
    right = buffer + cellSize * (cell.column + 1),
    top = buffer + cellSize * cell.row,
    bottom = buffer + cellSize * (cell.row + 1);

  const walls: Array<SVGElement> = [];

  if (!cell.isLinked(cell.north)) walls.push(line(left, top, right, top));
  if (!cell.isLinked(cell.east)) walls.push(line(right, top, right, bottom));
  if (!cell.isLinked(cell.south)) walls.push(line(left, bottom, right, bottom));
  if (!cell.isLinked(cell.west)) walls.push(line(left, top, left, bottom));

  return walls;
}
