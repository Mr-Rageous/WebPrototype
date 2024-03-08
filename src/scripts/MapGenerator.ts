

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

export const empty = new Tile('empty', 'white');
export const water = new Tile('water', 'blue');
export const grass = new Tile('grass', 'green');
export const wall = new Tile('wall', 'grey');
export const hidden = new Tile('hidden', 'black');
export const wood = new Tile('wood', 'brown');

export enum PatternFacing {
  None,
  Right,
  Down,
  Left
}

export class Pattern {
  content: Tile[][];
  rotation: PatternFacing;
  
  constructor(pattern: Tile[][]) {
    this.content = pattern;
  }
}

export class MapGenerator {
  width: number;
  height: number;
  outputMap: Pattern;
  
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.outputMap = this.initializeOutputMap(empty);
  }
  
  // Initialize the output map with -1 to represent unset cells
  initializeOutputMap(baseFilter: Tile): Pattern {
    const outputPattern = new Pattern(new Array(this.height).fill(null).map(() => new Array(this.width).fill(baseFilter)));
    return outputPattern;
  }
  
  // Generate the map using wave collapse algorithm
  applyGeneration(patterns: Pattern[], bandFilter: Tile): Pattern {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.outputMap.content[y][x] === bandFilter) {
          this.collapseWave(x, y, patterns, bandFilter);
        }
      }
    }
    return this.outputMap;
  }
  
  // Collapse wave at the given position
  collapseWave(x: number, y: number, patterns: Pattern[], bandFilter: Tile): void {
    const pattern = this.selectRandomPattern(patterns);
    const rotatedPattern = this.rotatePattern(pattern); // Rotate the pattern randomly
    this.applyPattern(rotatedPattern, x, y, bandFilter);
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
    const rotatedPattern: Pattern = new Pattern(new Array(n).fill(0).map(() => new Array(n).fill(0)));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotatedPattern.content[j][n - 1 - i] = pattern.content[i][j];
      }
    }
    return rotatedPattern;
  }

  // Apply the chosen pattern to the output map at the given position
  applyPattern(pattern: Pattern, x: number, y: number, outputFilter: Tile): void {
    for (let py = 0; py < pattern.content.length; py++) {
      for (let px = 0; px < pattern.content[py].length; px++) {
        const mapX = x + px;
        const mapY = y + py;
  
        if (this.isWithinBounds(mapX, mapY) && this.outputMap.content[mapY][mapX] === outputFilter) {
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