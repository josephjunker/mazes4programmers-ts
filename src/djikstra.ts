import Distances from "src/distances";
import Cell from "./cell";

export default function(root: Cell): Distances {
  const distances = new Distances(root);
  let frontier = [root];

  while (frontier.length) {
    const newFrontier = [];

    for (const cell of frontier) {
      const currentDistance = distances.get(cell);
      if (currentDistance === undefined) throw new Error("TILT");

      for (const linked of cell.links()) {
        if (distances.has(linked)) continue;
        distances.set(linked, currentDistance + 1);
        newFrontier.push(linked);
      }
    }

    frontier = newFrontier;
  }

  return distances;
}
