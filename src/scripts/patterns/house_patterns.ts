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
    [a, e, e, e, d, d, d, a],
    [a, e, e, e, d, d, d, a],
    [a, e, e, e, d, d, d, a],
    [a, a, f, a, a, a, a, a],
  ]
)
export const house1_zone1_0 = new Pattern(
  [
    [g, g, f],
    [g, g, a],
    [f, a, a],
  ]
);
export const house1_zone1_1 = new Pattern(
  [
    [g, g, f],
    [g, g, a],
    [a, a, a],
  ]
);
export const house1_zone1_2 = new Pattern(
  [
    [g, g, a],
    [g, g, a],
    [f, a, a],
  ]
);
export const house1_zone1_3 = new Pattern(
  [
    [g, a, g],
    [g, f, g],
    [a, a, g],
  ]
);
export const house1_zone2_0 = new Pattern(
  [
    [g, g, g],
    [g, g, g],
    [a, f, a],
  ]
);
export const house1_zone2_1 = new Pattern(
  [
    [g, g, g],
    [g, g, g],
    [a, a, f],
  ]
);
export const house1_zone2_2 = new Pattern(
  [
    [g, g, g],
    [g, g, g],
    [f, a, a],
  ]
);
export const house1_zone2_3 = new Pattern(
  [
    [g, a, g],
    [g, f, g],
    [g, a, a],
  ]
);
export const house1_zone2_4 = new Pattern(
  [
    [g, a, g],
    [g, a, f],
    [g, g, g],
  ]
);
export const house1_zone3_0 = new Pattern(
  [
    [g, g, g],
    [a, f, a],
    [a, g, g],
  ]
);
export const house1_zone3_1 = new Pattern(
  [
    [g, g, g],
    [a, f, a],
    [a, g, g],
  ]
);
export const house1_zone3_2 = new Pattern(
  [
    [g, g, g],
    [g, g, g],
    [g, g, g],
  ]
);
export const house1_zone4_0 = new Pattern(
  [
    [g, g, g],
    [g, g, g],
    [g, g, g],
  ]
);
export const house1_zone4_1 = new Pattern(
  [
    [g, g, f],
    [g, g, a],
    [g, g, g],
  ]
);
