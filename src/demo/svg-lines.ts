import { Point, Box, line, render } from "../renderers/svg-data";

const upperLeft = new Point(0, 0);
const upperRight = new Point(100, 100);
const box = new Box(upperLeft, upperRight);

const line1 = line(25, 25, 75, 75);
const line2 = line(25, 75, 75, 25);

const rendered = render(box, [line1, line2]);

console.log(rendered);
