export enum TileFacing {
  None,
  Right,
  Down,
  Left
}

export class Pattern {
  content: number[][];
  rotation: TileFacing;
  
  constructor(pattern: number[][]) {
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
    this.outputMap = this.initializeOutputMap(-1);
  }
  
  // Initialize the output map with -1 to represent unset cells
  initializeOutputMap(baseFilter: number): Pattern {
    const outputPattern = new Pattern(new Array(this.height).fill(null).map(() => new Array(this.width).fill(baseFilter)));
    return outputPattern;
  }
  
  // Generate the map using wave collapse algorithm
  applyGeneration(patterns: Pattern[], bandFilter: number = -1): Pattern {
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
  collapseWave(x: number, y: number, patterns: Pattern[], bandFilter: number = -1): void {
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
  applyPattern(pattern: Pattern, x: number, y: number, outputFilter: number): void {
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
    
  applyRules(): void {
    // Implement rules here
    // Example: Ensure there is at least one path from top to bottom of the map
    const startCol = Math.floor(Math.random() * this.width);
    const startRow = 0;
    this.outputMap.content[startRow][startCol] = 0;

    for (let col = 1; col < this.width; col++) {
      const prevCol = col - 1;
      const possibleMoves = [];

      // Check adjacent cells
      if (prevCol - 1 >= 0 && this.outputMap.content[startRow][prevCol - 1] === 0) {
        possibleMoves.push(-1);
      }
      if (this.outputMap[startRow][prevCol] === 0) {
        possibleMoves.push(0);
      }
      if (prevCol + 1 < this.width && this.outputMap.content[startRow][prevCol + 1] === 0) {
        possibleMoves.push(1);
      }

      // Choose a random move
      const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

      // Apply the move
      this.outputMap.content[startRow][col] = move;
    }
  }
}