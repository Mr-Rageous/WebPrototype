import { Pattern, Tile } from "./mapGenerator.js";
import { WebManager } from "./utility.js";

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

        // Add mousemove event listener to the canvas
        this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = this.canvas.getBoundingClientRect(); // Get the bounding rectangle of the canvas
            const mouseX = e.clientX - rect.left; // Get the x-coordinate of the mouse relative to the canvas
            const mouseY = e.clientY - rect.top; // Get the y-coordinate of the mouse relative to the canvas

            // Calculate the row and column indices of the tile
            const y = Math.floor(mouseY / this.pixelSize);
            const x = Math.floor(mouseX / this.pixelSize);
            if (x < 0 || y < 0) { return; }
            // Do something with the row and column indices, such as highlighting the tile
            const thisTile = mapOutput.content[y][x];
            if (!thisTile) { return; }
            const tileToolTip: HTMLElement = this.createTileTooltip(thisTile, e);
            const pageContent = document.getElementById('page-content');
            pageContent.appendChild(tileToolTip);
        });
    }

    public setTilemap(pattern: Pattern) {
        this.drawPixelMatrix(pattern);
        this.genTileTooltip(pattern);
    }

    private genTileTooltip(pattern: Pattern) {
        this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = this.canvas.getBoundingClientRect(); // Get the bounding rectangle of the canvas
            const mouseX = e.clientX - rect.left; // Get the x-coordinate of the mouse relative to the canvas
            const mouseY = e.clientY - rect.top; // Get the y-coordinate of the mouse relative to the canvas

            // Calculate the row and column indices of the tile
            const y = Math.floor(mouseY / this.pixelSize);
            const x = Math.floor(mouseX / this.pixelSize);
            if (x < 0 || y < 0) { return; }
            // Do something with the row and column indices, such as highlighting the tile
            const thisTile = pattern.content[y][x];
            if (!thisTile) { return; }
            const tileToolTip: HTMLElement = this.createTileTooltip(thisTile, e);

            const container = document.querySelector('.container');
            container.appendChild(tileToolTip);
        });
    }

    private createTileTooltip(tile: Tile, e: MouseEvent) {
        let tooltipContainer = document.getElementById('tooltip-container');
        if (tooltipContainer) { tooltipContainer.remove(); }
        tooltipContainer = WebManager.createWebElement('div', ['tooltip-container'], 'tooltip-container');
        tooltipContainer.style.position = 'absolute';
        tooltipContainer.style.left = `${e.clientX}px`;
        tooltipContainer.style.top = `${e.clientY}px`;
        tooltipContainer.addEventListener('mousemove', () => {
            tooltipContainer.remove(); // <-- update location and info instead of destroy, remember to prevent create if created.
        })

        let headerText = tile.name;
        const tooltipHeaderContainer = WebManager.createWebElement('div', ['tooltip-header-container'], 'tooltip-header-container');
        const tooltipHeader = WebManager.createWebElement('h2', ['tooltip-header'], 'tooltip-header', headerText);
    
        tooltipHeaderContainer.style.background = 'url(https://vidcdn.123rf.com/450nwm/vectorv/vectorv2208/vectorv220827703.jpg)';
        tooltipHeaderContainer.style.backgroundSize = 'cover';
        tooltipHeaderContainer.style.backgroundPosition = 'center';
    
        tooltipHeader.style.border = '1mm ridge rgba(189, 189, 189, 0.3)';
        tooltipHeader.style.fontSize = '15px';
        tooltipHeader.style.paddingLeft = '10px';
        tooltipHeader.style.paddingRight = '10px';
    
        tooltipHeaderContainer.appendChild(tooltipHeader);
        tooltipContainer.appendChild(tooltipHeaderContainer);
        return tooltipContainer;
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
        // if larger than max size (should be default size normally), set overflow: hidden on container of canvas
        // build a move on left click drag method to allow the player to traverse while scaled
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
