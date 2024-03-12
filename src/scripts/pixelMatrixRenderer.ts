import { Pattern, Tile } from "./mapGenerator.js";

export class PixelMatrixRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private pixelSize: number;
    private rows: number;
    private cols: number;
    private zoomLevel: number;
    private scrollFactor: number;

    constructor(rows: number, cols: number, pixelSize: number, zoomLevel: number, scrollFactor: number, parentNode: HTMLElement, mapOutput: Pattern) {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'pixelCanvas';
        
        parentNode.appendChild(this.canvas); // Append canvas to parent

        // Get canvas 2D context
        this.ctx = this.canvas.getContext('2d');

        // Set properties
        this.rows = rows;
        this.cols = cols;
        this.pixelSize = pixelSize;
        this.zoomLevel = zoomLevel;
        this.scrollFactor = scrollFactor;

        // Initialize canvas size and initial scale
        this.initCanvas();

        // Draw pixel matrix
        this.drawPixelMatrix(mapOutput);

        // Set up zoom functionality
        this.setupZoom();
    }

    // Initialize canvas size and initial scale
    private initCanvas() {
        const canvasWidth = this.cols * this.pixelSize;
        const canvasHeight = this.rows * this.pixelSize;
        
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.width = canvasWidth + 'px';
        this.canvas.style.height = canvasHeight + 'px';
        this.canvas.style.transformOrigin = 'top left'; // Set transform origin to top-left corner
        this.canvas.style.transform = `scale(${this.zoomLevel})`;
    }

    // Function to draw the pixel matrix
    private drawPixelMatrix(mapOutput: Pattern) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let thisTile: Tile = mapOutput.content[y][x]; // Get the tile at this iteration
                this.ctx.fillStyle = thisTile.color; // Tile color -- !!
                this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize); // Draw pixel
            }
        }
    }

    // Set up zoom functionality
    private setupZoom() {
        window.addEventListener('wheel', (e: WheelEvent) => {
            e.preventDefault(); // Prevent default scroll behavior
            const delta: number = e.deltaY; // Get scroll delta

            if (delta > 0) {
                // Zoom out
                this.zoomLevel -= this.scrollFactor;
            } else {
                // Zoom in
                this.zoomLevel += this.scrollFactor;
            }

            // Limit zoom level
            this.zoomLevel = Math.max(0.1, Math.min(100, this.zoomLevel));

            // Update canvas style to scale
            this.canvas.style.transform = `scale(${this.zoomLevel})`;
        }, { passive: false }); // Specify active listener
    }
}
