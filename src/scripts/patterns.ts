import { Pattern, Tile } from "./mapGenerator.js";

const a = Tile.tiles['wall'];
const b = Tile.tiles['hidden'];
const c = Tile.tiles['grass'];
const d = Tile.tiles['water'];
const e = Tile.tiles['wood'];

export const house_pattern_base = new Pattern(
  [
    [a, a, a, a, a, a, a, a],
    [a, b, b, b, c, c, c, a],
    [a, b, b, b, c, c, c, a],
    [a, b, b, b, c, c, c, a],
    [a, d, d, d, e, e, e, a],
    [a, d, d, d, e, e, e, a],
    [a, d, d, d, e, e, e, a],
    [a, a, a, a, a, a, a, a],
  ]
)
export const house_int_topleft = new Pattern(
  [
    [b, b, d],
    [b, b, a],
    [d, a, a],
  ]
);
export const house_int_topright = new Pattern(
  [
    [b, b, b],
    [b, b, b],
    [a, a, a],
  ]
);
export const house_int_botleft = new Pattern(
  [
    [b, b, d],
    [b, b, a],
    [b, b, a],
  ]
);
export const house_int_botright = new Pattern(
  [
    [b, b, b],
    [b, b, b],
    [b, b, b],
  ]
);