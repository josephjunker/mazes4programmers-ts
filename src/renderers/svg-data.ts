
export class Point {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Box {
    readonly upperLeft: Point;
    readonly lowerRight: Point;
    constructor(upperLeft: Point, lowerRight: Point) {
        this.upperLeft = upperLeft;
        this.lowerRight = lowerRight;
    }
}

export interface Style {
    stroke?: string;
    stroke_width?: number;
}

export interface SVGElement {
    svgToString(indentation: string): string;
}

export class Line implements SVGElement {
    readonly start: Point;
    readonly end: Point;
    readonly style: Style
    constructor(start: Point, end: Point, style: Style) {
        this.start = start;
        this.end = end;
        this.style = style;
    }

    svgToString(indentation: string) {
        return indentation +
            `<line x1="${this.start.x}" y1="${this.start.y}" x2="${this.end.x}" y2="${this.end.y}" ${this.styleToString()} />`;
    }

    private styleToString() : string {
        return `stroke="${this.style.stroke || "black"}" stroke-width="${this.style.stroke_width || 3}"`;
    }
}

export function line(x1: number, y1: number, x2: number, y2: number) : Line {
    return new Line(
        new Point(x1, y1),
        new Point(x2, y2),
        { stroke: "black", stroke_width: 3 });
}

const header = `<?xml version="1.0" standalone="no"?>`;

const svgRootAttrs = `  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"`;

export class G implements SVGElement {
    readonly elements: Array<SVGElement>;
    readonly backgroundFill: string;
    constructor(elements: Array<SVGElement>, backgroundFill: string) {
        this.elements = elements;
        this.backgroundFill = backgroundFill;
    }

    svgToString(indentation: string) {
        return [
            indentation + `<g fill="${this.backgroundFill}">`,
            ...this.elements.map(e => e.svgToString("  " + indentation)),
            indentation + `</g>`
        ].join("\n");
    }
}

export class SVG implements SVGElement {
    readonly elements: Array<SVGElement>;
    readonly viewBox: Box;
    constructor(elements: Array<SVGElement>, viewBox: Box) {
        this.elements = elements;
        this.viewBox = viewBox;
    }

    svgToString(indentation: string) {
        return [
            header,
            "<svg",
            svgRootAttrs,
            `  viewBox="${this.viewBoxToString()}"`,
            "  >",
            "",
            ...this.elements.map(e => e.svgToString("  ")),
            "</svg>"
        ].join("\n");
    }

    viewBoxToString() : string {
        const x1 = this.viewBox.upperLeft.x,
              y1 = this.viewBox.upperLeft.y,
              x2 = this.viewBox.lowerRight.x,
              y2 = this.viewBox.lowerRight.y;

        return `${x1} ${y1} ${x2} ${y2}`;
    }
}

export function render(viewBox: Box, elements: Array<SVGElement>) : string {
    return new SVG(
        [new G(elements, "white")], viewBox).svgToString("");
}
