import Grid from "../grid";
import Cell from "../cell";

const horizWall = "---",
      vertWall = "|",
      horizSpace = "   ",
      vertSpace = " ",
      corner = "+";

export default function gridToAscii(grid: Grid) : string {
    return Array.from(grid.iterateRows())
        .map(rowToString)
        .join("\n")
        + "\n"
        + getHorizontalEdge(grid.columns);
}

function getHorizontalEdge(columns: number) : string {
    let result = corner;

    for(let i = 0; i < columns; i++) {
        result = result + horizWall + corner;
    }

    return result;
}

function rowToString(cells: Array<Cell>) : string {
    const top = corner + 
        cells.map(cell => cell.isLinked(cell.north) ? horizSpace + corner : horizWall + corner)
        .join("");

    const middle = vertWall +
        cells.map(cell => cell.isLinked(cell.east) ? horizSpace + vertSpace : horizSpace + vertWall)
        .join("");

    return top + "\n" + middle;
}