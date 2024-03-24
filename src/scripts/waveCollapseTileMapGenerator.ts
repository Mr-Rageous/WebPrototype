// WaveCollapseTilemapGenerator.ts

import { Pattern, Tile } from "./mapGenerator.js";

export class WaveCollapseTilemapGenerator {
    private outputMap: Pattern;
    private patterns: Pattern[];
    private outputWidth: number;
    private outputHeight: number;
    private collapsed: boolean[][];
    private tileSize: number; // Assuming each tile is 32x32 pixels

    constructor(patterns: Pattern[], outputWidth: number, outputHeight: number, tileSize: number) {
        if (!Array.isArray(patterns) || patterns.length === 0) {
            throw new Error("Patterns array must be a non-empty array of Pattern objects.");
        }
        this.patterns = patterns;
        this.outputWidth = outputWidth;
        this.outputHeight = outputHeight;
        this.outputMap = new Pattern([]);
        this.collapsed = [];

        for (let i = 0; i < this.outputHeight; i++) {
            this.outputMap.content.push(new Array(this.outputWidth).fill(Tile.tiles['empty']));
            this.collapsed.push(new Array(this.outputWidth).fill(false));
        }
        
        this.tileSize = tileSize;
    }

    public generateTilemap(): Pattern {
        let tilemapGenerated = false; // Flag to track if the tilemap has been successfully generated
       
        // Choose a random pattern as the initial state
        const initialPatternIndex = Math.floor(Math.random() * this.patterns.length);
        const initialPattern = this.patterns[initialPatternIndex];

        // Place the initial pattern in the center of the output tilemap
        const startY = Math.floor((this.outputHeight - initialPattern.content.length) / 2);
        const startX = Math.floor((this.outputWidth - initialPattern.content[0].length) / 2);
        console.log('0', initialPattern, 'x:'+startX, 'y:'+startY);
        this.placePattern(initialPattern, startX, startY);

        let noProgressCount = 0;
        const maxNoProgressIterations = 100; // Adjust as needed
    
        // Collapse the tilemap using wave collapse algorithm
        while (!this.isFullyCollapsed()) {
            const collapseCandidates = this.findCollapseCandidates();
            if (collapseCandidates.length === 0) {
                // If no candidates found, handle the situation appropriately
                console.log("No collapse candidates found. Continuing generation.");
    
                // Fill un-generated tiles with a single tile type
                for (let y = 0; y < this.outputHeight; y++) {
                    for (let x = 0; x < this.outputWidth; x++) {
                        if (!this.collapsed[y][x]) {
                            // Fill un-generated tile with a specific type (e.g., empty)
                            this.outputMap.content[y][x] = Tile.tiles['empty'];
                        }
                    }
                }
    
                noProgressCount++;
                if (noProgressCount >= maxNoProgressIterations) {
                    console.log("Max no progress iterations reached. Exiting generation.");
                    break;
                }
            } else {
                noProgressCount = 0; // Reset no progress count
            }
    
            // Choose a random candidate and collapse it
            const { x, y } = collapseCandidates[Math.floor(Math.random() * collapseCandidates.length)];
            const patternIndex = this.choosePatternIndex(x, y);
            if (patternIndex === -1) {
                console.log("No valid pattern index found. Backtracking..."); // limit this
                this.backtrack(); // Handle the situation by backtracking
                continue;
            }
            const pattern = this.patterns[patternIndex];
            this.placePattern(pattern, x, y);
        }

        return this.outputMap;
    }

    private placePattern(pattern: Pattern, x: number, y: number) {
        if (!pattern || !pattern.content || !Array.isArray(pattern.content)) {
            console.log("Invalid pattern object or content: ", pattern);
        }
        for (let i = 0; i < pattern.content.length; i++) {
            for (let j = 0; j < pattern.content[0].length; j++) {
                this.outputMap.content[y + i][x + j] = pattern.content[i][j];
                this.collapsed[y + i][x + j] = true;
            }
        }
    }

    private findCollapseCandidates(): { x: number; y: number }[] {
        const candidates: { x: number; y: number }[] = [];
        for (let y = 0; y < this.outputHeight; y++) {
            for (let x = 0; x < this.outputWidth; x++) {
                if (!this.collapsed[y][x]) {
                    candidates.push({ x, y });
                }
            }
        }
        return candidates;
    }
    
    private choosePatternIndex(x: number, y: number): number {
        const validPatternIndices: number[] = [];
        for (let i = 0; i < this.patterns.length; i++) {
            const pattern = this.patterns[i];
            let valid = true;
            for (let dy = 0; dy < pattern.content.length; dy++) {
                for (let dx = 0; dx < pattern.content[0].length; dx++) {
                    const tx = x + dx;
                    const ty = y + dy;
                    if (
                        (tx < 0 || tx >= this.outputWidth || ty < 0 || ty >= this.outputHeight) || // Check if pattern exceeds tilemap bounds
                        (this.outputMap.content[ty][tx] !== Tile.tiles['empty'] && this.outputMap.content[ty][tx] !== pattern.content[dy][dx])
                    ) {
                        valid = false;
                        break;
                    }
                }
                if (!valid) break;
            }
            if (valid) validPatternIndices.push(i);
        }
        if (validPatternIndices.length === 0) return -1; // Return -1 if no valid pattern indices found
        return validPatternIndices[Math.floor(Math.random() * validPatternIndices.length)];
    }

    private isFullyCollapsed(): boolean {
        for (let y = 0; y < this.outputHeight; y++) {
            for (let x = 0; x < this.outputWidth; x++) {
                if (!this.collapsed[y][x]) return false;
            }
        }
        return true;
    }

    private backtrack() {
        // Reset the tilemap and collapsed status
        for (let y = 0; y < this.outputHeight; y++) {
            for (let x = 0; x < this.outputWidth; x++) {
                this.outputMap.content[y][x] = Tile.tiles['empty'];
                this.collapsed[y][x] = false;
            }
        }
        // Don't restart generation here; instead, let the current generation loop continue
    }
}
