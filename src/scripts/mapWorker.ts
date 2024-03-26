// This script will handle the map generation
self.onmessage = function(event: MessageEvent) {
    const { generator } = event.data;
    // Perform the map generation here
    const generatedMap = generator.generateTilemap();
    console.log('[!] Worker Thread: Ending Generation, Returning Tilemap');
    // Send the generated map back to the main thread
    postMessage(generatedMap);
    console.log('[!] Worker Thread: Map Returned');
};