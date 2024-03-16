// WaveCollapseTilemapGenerator.ts

import { Pattern, Tile } from "./mapGenerator.js";

export class WaveCollapseTilemapGenerator {
    private outputMap: Pattern;
    private patterns: Pattern[];
    private outputWidth: number;
    private outputHeight: number;
    private collapsed: boolean[][];

    constructor(patterns: Pattern[], outputWidth: number, outputHeight: number) {
        this.patterns = patterns;
        this.outputWidth = outputWidth;
        this.outputHeight = outputHeight;
        this.outputMap = new Pattern([]);
        this.collapsed = [];

        for (let i = 0; i < this.outputHeight; i++) {
            this.outputMap.content.push(new Array(this.outputWidth).fill(Tile.tiles['empty']));
            this.collapsed.push(new Array(this.outputWidth).fill(false));
        }
    }

    public generateTilemap(): Pattern {
        // Choose a random pattern as the initial state
        const initialPatternIndex = Math.floor(Math.random() * this.patterns.length);
        const initialPattern = this.patterns[initialPatternIndex];

        // Place the initial pattern in the center of the output tilemap
        const startY = Math.floor((this.outputHeight - initialPattern.content.length) / 2);
        const startX = Math.floor((this.outputWidth - initialPattern.content[0].length) / 2);
        console.log('0', initialPattern, 'x:'+startX, 'y:'+startY);
        this.placePattern(initialPattern, startX, startY);

        // Collapse the tilemap using wave collapse algorithm
        while (!this.isFullyCollapsed()) {
            const collapseCandidates = this.findCollapseCandidates();
            if (collapseCandidates.length === 0) {
                // If no candidates found, backtrack and restart
                this.backtrack();
                continue;
            }

            // Choose a random candidate and collapse it
            const { x, y } = collapseCandidates[Math.floor(Math.random() * collapseCandidates.length)];
            const patternIndex = this.choosePatternIndex(x, y);
            const pattern = this.patterns[patternIndex];
            this.placePattern(pattern, x, y); // breaks here
            console.log(patternIndex, pattern, 'x:'+x, 'y:'+y);
        }

        return this.outputMap;
    }

    private placePattern(pattern: Pattern, x: number, y: number) {
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
                        tx < 0 || tx >= this.outputWidth || ty < 0 || ty >= this.outputHeight ||
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
        // Restart the generation
        this.generateTilemap();
    }
}
