import { Pattern, Tile } from "../mapGenerator.js";

const a = Tile.tiles['wall'];
const b = Tile.tiles['zone1'];
const c = Tile.tiles['zone2'];
const d = Tile.tiles['zone3'];
const e = Tile.tiles['zone4'];
const f = Tile.tiles['door'];
const g = Tile.tiles['floor'];
const h = Tile.tiles['window'];
const i = Tile.tiles['shelf'];

export const house1_base = new Pattern(
  [
    [a, a, a, a, a, a, a, a],
    [a, b, b, b, c, c, c, a],
    [a, b, b, b, c, c, c, a],
    [a, b, b, b, c, c, c, a],
    [a, d, d, d, e, e, e, a],
    [a, d, d, d, e, e, e, a],
    [a, d, d, d, e, e, e, a],
    [a, a, f, a, a, a, a, a],
  ]
)
export const house1_zone1 = new Pattern(
  [
    [g, g, f],
    [g, g, a],
    [f, a, a],
  ]
);
export const house1_zone2 = new Pattern(
  [
    [g, g, g],
    [g, g, g],
    [a, a, a],
  ]
);
export const house1_zone3 = new Pattern(
  [
    [g, g, f],
    [g, g, a],
    [g, g, a],
  ]
);
export const house1_zone4 = new Pattern(
  [
    [g, g, g],
    [g, g, g],
    [g, g, g],
  ]
);
