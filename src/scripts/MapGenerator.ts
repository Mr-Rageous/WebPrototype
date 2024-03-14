import { generateRandomUuid } from "./part.js";


export class Tile {
  static tiles: { [key: string]: Tile } = {};

  static addTile(tile: Tile, key: string) {
    this.tiles[key] = tile;
  }

  constructor(public name: string, public color: string) {
    this.color = color;
    Tile.addTile(this, name);
  }
}
// --- default empty tile ---
export const empty = new Tile('empty', 'silver');
// -- default tiles module -- 
export const zone1 = new Tile('zone1', 'black');
export const zone2 = new Tile('zone2', 'black');
export const zone3 = new Tile('zone3', 'black');
export const zone4 = new Tile('zone4', 'black');
export const wall = new Tile('wall', 'silver');
export const floor = new Tile('floor', 'gray');
export const door = new Tile('door', 'fuchsia');
export const window = new Tile('window', 'cyan');
export const shelf = new Tile('shelf', 'olive');
// -- end of main tile module --
export enum PatternFacing {
  None,
  Right,
  Down,
  Left
}

export class Pattern {
  id: string;
  content: Tile[][];
  rotation: PatternFacing;
  
  constructor(pattern: Tile[][]) {
    this.content = pattern;
  }
}

export class PatternMapper {
  static maps: { [key: string]: PatternMapper } = {};

  static addMap(map: PatternMapper, key: string) {
    this.maps[key] = map;
  }

  width: number;
  height: number;
  outputMap: Pattern;
  
  constructor(public name: string, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.outputMap = this.initializeOutputMap(empty);
    PatternMapper.addMap(this, this.name);
  }
  
  // Initialize the output map with -1 to represent unset cells
  initializeOutputMap(baseTile: Tile): Pattern {
    const outputPattern = new Pattern(new Array(this.height).fill(null).map(() => new Array(this.width).fill(baseTile)));
    return outputPattern;
  }
  
  // Generate the map using wave collapse algorithm
  applyCollapseToMap(patterns: Pattern[], zone: Tile): Pattern {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.outputMap.content[y][x] === zone) {
          this.collapseWaveState(x, y, patterns, zone);
        }
      }
    }
    return this.outputMap;
  }
  
  // Collapse probability moment at the given position
  collapseWaveState(x: number, y: number, patterns: Pattern[], zone: Tile): void {
    const pattern = this.selectRandomPattern(patterns);
    const rotatedPattern = this.rotatePattern(pattern); // Rotate the pattern randomly
    this.applyPattern(rotatedPattern, x, y, zone);
  }

  // Select a random pattern from available patterns
  selectRandomPattern(patterns: Pattern[]): Pattern {
    const patternIndex = Math.floor(Math.random() * patterns.length);
    return patterns[patternIndex];
  }

  // Rotate the pattern randomly
  rotatePattern(pattern: Pattern): Pattern {
    let rotatedPattern = pattern;
    for (let i = 0; i < pattern.rotation; i++) {
      rotatedPattern = this.rotate90Degrees(rotatedPattern);
    }
    return rotatedPattern;
  }

  // Rotate the pattern by 90 degrees clockwise
  rotate90Degrees(pattern: Pattern): Pattern {
    const n = pattern.content.length;
    const rotatedPattern: Pattern = new Pattern(new Array(n).fill(empty).map(() => new Array(n).fill(empty)));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotatedPattern.content[j][n - 1 - i] = pattern.content[i][j];
      }
    }
    return rotatedPattern;
  }

  // Apply the chosen pattern to the output map at the given position
  applyPattern(pattern: Pattern, x: number, y: number, zone: Tile): void {
    for (let py = 0; py < pattern.content.length; py++) {
      for (let px = 0; px < pattern.content[py].length; px++) {
        const mapX = x + px;
        const mapY = y + py;
  
        if (this.isWithinBounds(mapX, mapY) && this.outputMap.content[mapY][mapX] === zone) {
          this.outputMap.content[mapY][mapX] = pattern.content[py][px];
        }
      }
    }
  }
  
  // Check if the given coordinates are within the bounds of the output map
  isWithinBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}