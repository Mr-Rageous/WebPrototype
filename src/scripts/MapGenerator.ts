export class MapGenerator {
  width: number;
  height: number;
  terrainPatterns: number[][][];
  buildingPatterns: number[][][];
  treePatterns: number[][][];
  outputMap: number[][];
  
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.outputMap = this.initializeOutputMap();
  }
  
  // Initialize the output map with -1 to represent unset cells
  initializeOutputMap(): number[][] {
    return new Array(this.height).fill(null).map(() => new Array(this.width).fill(-1));
  }
  
  // Generate the map using wave collapse algorithm
  generateMap(patterns: number[][][], outputFilter: number = -1): number[][] {
    // terrain pass
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.outputMap[y][x] === outputFilter) {
          this.collapseWave(x, y, patterns, outputFilter);
        }
      }
    }
    return this.outputMap;
  }
  
  // Collapse wave at the given position
  collapseWave(x: number, y: number, patterns: number[][][], outputFilter: number = -1): void {
    const pattern = this.selectRandomPattern(patterns);
    this.applyPattern(pattern, x, y, outputFilter);
  }
  
  // Select a random pattern from available patterns
  selectRandomPattern(patterns: number[][][]): number[][] {
    const patternIndex = Math.floor(Math.random() * patterns.length);
    return patterns[patternIndex];
  }
  
  // Apply the chosen pattern to the output map at the given position
  applyPattern(pattern: number[][], x: number, y: number, outputFilter: number = -1): void {
    for (let py = 0; py < pattern.length; py++) {
      for (let px = 0; px < pattern[py].length; px++) {
        const mapX = x + px;
        const mapY = y + py;
  
        if (this.isWithinBounds(mapX, mapY) && this.outputMap[mapY][mapX] === outputFilter) {
          this.outputMap[mapY][mapX] = pattern[py][px];
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
    this.outputMap[startRow][startCol] = 0;

    for (let col = 1; col < this.width; col++) {
      const prevCol = col - 1;
      const possibleMoves = [];

      // Check adjacent cells
      if (prevCol - 1 >= 0 && this.outputMap[startRow][prevCol - 1] === 0) {
        possibleMoves.push(-1);
      }
      if (this.outputMap[startRow][prevCol] === 0) {
        possibleMoves.push(0);
      }
      if (prevCol + 1 < this.width && this.outputMap[startRow][prevCol + 1] === 0) {
        possibleMoves.push(1);
      }

      // Choose a random move
      const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

      // Apply the move
      this.outputMap[startRow][col] = move;
    }
  }
}