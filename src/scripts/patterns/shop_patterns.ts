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

export const shop1_base = new Pattern(
    [
      [a, a, a, a, a, a, a, a],
      [a, b, b, b, b, b, b, a],
      [a, b, b, b, b, b, b, a],
      [a, a, a, a, a, f, a, a],
      [a, c, c, c, c, c, c, a],
      [a, c, c, c, c, c, c, a],
      [a, c, c, c, c, c, c, a],
      [a, d, d, d, d, d, d, a],
      [a, d, d, d, d, d, d, a],
      [a, d, d, d, d, d, d, a],
      [a, e, e, e, e, e, e, a],
      [a, e, e, e, e, e, e, a],
      [a, a, h, f, f, h, a, a],
    ]
  )
  export const shop1_zone1_0 = new Pattern(
    [
      [i, i, a, i, i, i],
      [i, g, f, g, g, i],
    ]
  );
  export const shop1_zone1_1 = new Pattern(
    [
      [i, g, a, g, g, i],
      [i, g, f, g, g, i],
    ]
  );
  export const shop1_zone1_2 = new Pattern(
    [
      [g, g, a, g, g, g],
      [g, g, f, g, g, g],
    ]
  );
  export const shop1_zone2_0 = new Pattern(
    [
      [g, g, g, g, g, g],
      [a, f, a, i, i, a],
      [i, g, g, g, g, i],
    ]
  );
  export const shop1_zone2_1 = new Pattern(
    [
      [g, g, g, g, g, g],
      [a, f, a, i, i, a],
      [g, g, g, g, g, g],
    ]
  );
  export const shop1_zone3_0 = new Pattern(
    [
      [i, g, i, i, g, i],
      [i, g, i, i, g, i],
      [i, g, i, i, g, i],
    ]
  );
  export const shop1_zone3_1 = new Pattern(
    [
      [i, g, i, i, g, i],
      [i, g, g, g, g, i],
      [i, g, i, i, g, i],
    ]
  );
  export const shop1_zone3_2 = new Pattern(
    [
      [i, i, g, g, i, i],
      [g, g, g, g, g, g],
      [i, i, g, g, i, i],
    ]
  );
  export const shop1_zone3_3 = new Pattern(
    [
      [g, i, i, i, i, g],
      [g, g, g, g, g, g],
      [i, i, g, g, i, i],
    ]
  );
  export const shop1_zone3_4 = new Pattern(
    [
      [i, g, g, g, g, i],
      [i, i, g, g, i, i],
      [i, g, g, g, g, i],
    ]
  );
  export const shop1_zone3_5 = new Pattern(
    [
      [i, g, g, g, g, i],
      [i, i, g, g, i, i],
      [i, g, g, g, g, i],
    ]
  );
  export const shop1_zone3_6 = new Pattern(
    [
      [g, i, g, g, i, g],
      [g, i, g, g, i, g],
      [g, g, g, g, g, g],
    ]
  );
  export const shop1_zone4_0 = new Pattern(
    [
      [g, g, g, g, g, g],
      [g, g, g, g, g, g],
    ]
  );
  export const shop1_zone4_1 = new Pattern(
    [
      [g, g, g, g, g, g],
      [i, g, g, g, g, i],
    ]
  );
  export const shop1_zone4_2 = new Pattern(
    [
      [g, g, g, g, g, g],
      [i, i, g, g, i, i],
    ]
  );