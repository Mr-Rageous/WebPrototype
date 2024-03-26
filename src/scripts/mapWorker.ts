import { Pattern, Tile } from "./mapGenerator.js";
import { WaveCollapseTilemapGenerator } from "./waveCollapseTileMapGenerator.js";

// This script will handle the map generation
self.onmessage = function(event: MessageEvent) {
    const { width, height } = event.data;
    // Perform the map generation here
    const generatedMap = generateMap(width, height);
    // Send the generated map back to the main thread
    postMessage(generatedMap);
    console.log('[!] Worker Thread: Map Returned');
};

function generateMap(w: number = 10, h: number = 10, tileSize: number = 15): Pattern {
    console.log('[!] Worker Thread: Beginning Generation');
    const a = Tile.tiles['wall'];
    const b = Tile.tiles['floor'];
    const c = Tile.tiles['door'];
    const d = Tile.tiles['window'];
    const e = Tile.tiles['shelf'];

    const pattern1 = new Pattern([
        [a, a],
        [e, a]
    ]);
    const pattern2 = new Pattern([
        [a, c],
        [b, e]
    ]);
    const pattern3 = new Pattern([
        [c, a], 
        [a, b]
    ]);
    const pattern4 = new Pattern([
        [e, b], 
        [b, b]
    ]);
    const pattern5 = new Pattern([
        [a, b],
        [c, d]
    ]);
    const pattern6 = new Pattern([
        [a, d],
        [b, a]
    ]);
    const pattern7 = new Pattern([
        [b, a], 
        [c, d]
    ]);
    const pattern8 = new Pattern([
        [b, d], 
        [c, e]
    ]);

    // Example usage
    const patterns: Pattern[] = [
        pattern1,
        pattern2,
        pattern3,
        pattern4,
        pattern5,
        pattern6,
        pattern7,
        pattern8,
    ];
    const outputSizeX = w; // Size of the tilemap
    const outputSizeY = h; // Size of the tilemap
    const generator = new WaveCollapseTilemapGenerator(patterns, outputSizeX, outputSizeY, tileSize);
    const tilemap = generator.generateTilemap();
    console.log('[!] Worker Thread: Ending Generation, Returning Tilemap');
    return tilemap;
}
