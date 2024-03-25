import { PlayerData } from './playerData.js';
import { settings, initialSettings } from './settings.js';
import { WebManager, checkObjectForProperty } from './utility.js';
import { sword_item } from './parts.js';
import { Part, Rarity, Socket } from './part.js';
import { Item } from './item.js';
import { PatternMapper, Pattern, PatternFacing, Tile } from './mapGenerator.js';
import * as HousePatterns from './patterns/house_patterns.js';
import * as ShopPatterns from './patterns/shop_patterns.js';
import { PixelMatrixRenderer } from './pixelMatrixRenderer.js';
import { WaveCollapseTilemapGenerator } from './waveCollapseTileMapGenerator.js';

const userData = new PlayerData('userData');

function addSettingToSettingPage(setting: any) { settings.push(setting); }
initialSettings.forEach(setting => { addSettingToSettingPage(setting); });

sword_item.forEach(part => { userData.inventory.parts.push(part); });

const tabs = document.querySelectorAll('.tabs li');
const mainContent = document.querySelector('.main-content');
const gameContent = document.querySelector('.game-content');

loadGameContent(); // on new game?

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        loadContent(this.textContent);
    });
});

let isHidden = false;
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        const sidebar = document.getElementById("sidebar");
        const mainContent = document.getElementById("main-content");
        const gameContent = document.getElementById("game-content");

        if (sidebar && mainContent && gameContent) {
            if (isHidden) {
                sidebar.classList.remove("hidden");
                mainContent.classList.remove("hidden");
                gameContent.classList.add("hidden");
            } else {
                sidebar.classList.add("hidden");
                mainContent.classList.add("hidden");
                gameContent.classList.remove("hidden");
            }

            // Toggle visibility state
            isHidden = !isHidden;
        }
    }
});

document.addEventListener("contextmenu", function(e) {
    // e.preventDefault(); // Prevent default context menu
    // provide right click method to rename items here...
    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    let itemPrefix = 'inventory-item-info-';
    let itemID = '';
    if (elementUnderCursor.id.startsWith(itemPrefix)) {
        itemID = elementUnderCursor.id.substring(itemPrefix.length);
    }
    if (itemID != '') {
        console.log(elementUnderCursor);
        console.log(itemID);
    }
});


function loadContent(tabName: string) {
    mainContent.innerHTML = '';

    switch (tabName) {
        case 'Home':
            loadHomePage();
            break;
        case 'World':
            loadWorldPage();
            break;
        case 'Player':
            loadPlayerPage();
            break;
        case 'Inventory':
            loadInventoryPage();
            break;
        case 'Research':
            loadResearchPage();
            break;
        case 'Settings':
            loadSettingsPage();
            break;
        default:
            break;
    }
}

function virtualClickOnTab(tabName: string) {
    tabs.forEach(tab => {
        if (tabName == tab.textContent) {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadContent(tabName);
        }
    });
}

virtualClickOnTab('World');

function loadGameContent() {
    // player on map ui, context actions list to the right
    // possibly contextmenu on right click on tile in the future
    const gamePage = WebManager.createWebElement('div', ['game-page'], 'game-page');
    gamePage.style.position = 'absolute';
    gamePage.style.top = '0';
    gamePage.style.left = '0';
    gamePage.style.userSelect = 'none';
    gameContent.appendChild(gamePage);

    // add ruleset to mapgenerator, and patterns, and tiles
    // use Ruleset class to whitelist blacklist valid tile stitching
}

// -- home --
function loadHomePage() {

}

function createMapTest(pageContent: HTMLElement, tileSize: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mapTestContainerWrapper: HTMLElement = createMapTestContainer(5, 15, tileSize);
            pageContent.appendChild(mapTestContainerWrapper);
            resolve();
        });
    });
}
// -- world --
function loadWorldPage(): void {
    const pageContent: HTMLElement = WebManager.createWebElement('div', ['world-page'], 'page-content');
    pageContent.style.userSelect = 'none';

    const tileSize: number = 15;

    // Append page content to the main content
    mainContent.appendChild(pageContent);

    // Define functions to create map containers
    const createMapShop = (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mapShopContainerWrapper: HTMLElement = createMapShopContainer(8, 13, tileSize);
                pageContent.appendChild(mapShopContainerWrapper);
                resolve();
            });
        });
    };

    const createMapHouse = (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mapHouseContainerWrapper: HTMLElement = createMapHouseContainer(8, 8, tileSize);
                pageContent.appendChild(mapHouseContainerWrapper);
                resolve();
            });
        });
    };

    const createMapTest = (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mapTestContainerWrapper: HTMLElement = createMapTestContainer(6, 6, tileSize);
                pageContent.appendChild(mapTestContainerWrapper);
                resolve();
            });
        });
    };

    // Load map containers asynchronously
    Promise.all([createMapShop(), createMapHouse(), createMapTest()]);
}



// -- player --
function loadPlayerPage() {

}
// -- research --
function loadResearchPage() {

}
// -- settings --
function loadSettingsPage() {
    const settingsContent = WebManager.createWebElement('div', ['settings-content'], '');
    const settingsContainerWrapper = WebManager.createWebElement('div', ['settings-container-wrapper'], '');
    const headerContainer = WebManager.createWebElement('div', ['header-container'], '');
    const pageHeader = WebManager.createWebElement('h2', ['page-header'], '', `Settings`);

    headerContainer.appendChild(pageHeader);
    settingsContent.appendChild(headerContainer);

    settings.forEach(setting => {
        const settingsContainer = WebManager.createWebElement('div', ['settings-container'], '');
        const cardLong = WebManager.createWebElement('div', ['card-long'], '');
        const text = WebManager.createWebElement('h2', ['card-long-text'], '', setting.name);

        settingsContainer.addEventListener('click', function() {
            
        });
        
        cardLong.appendChild(text);
        settingsContainer.appendChild(cardLong);
        settingsContent.appendChild(settingsContainer);
    });

    mainContent.appendChild(settingsContent);
}
// -- inventory --
function loadInventoryPage() {
    const pageContent = createInventoryPageContent();

    const inventoryInfoContainerWrapper = createInventoryInfoContainerWrapper();
    const inventoryItemsContainerWrapper = createInventoryItemsContainerWrapper();
    const inventoryContainerWrapper = createInventoryContainerWrapper();
    const inventorySocketsContainerWrapper = createInventorySocketsContainerWrapper();
    const inventoryPartsContainerWrapper = createInventoryPartsContainerWrapper();

    pageContent.appendChild(inventoryInfoContainerWrapper);

    pageContent.appendChild(inventoryItemsContainerWrapper);
    pageContent.appendChild(inventoryContainerWrapper);
    pageContent.appendChild(inventorySocketsContainerWrapper);
    pageContent.appendChild(inventoryPartsContainerWrapper);

    mainContent.appendChild(pageContent);
}

function createInventoryPageContent(): HTMLElement {
    const pageContent = WebManager.createWebElement('div', ['inventory-page'], 'page-content');
    return pageContent;
}

function populateInventoryItemsContainer(inventoryContainer: HTMLElement) {
    if (userData.inventory.parts.length !== 0) {
        userData.inventory.getItems().forEach(item => {
            const card = createInventoryItemCard(item);
            inventoryContainer.appendChild(card);
            card.style.opacity = '0.4';
        });
    }
}

function createInventoryInfoContainerWrapper(): HTMLElement {
    const inventoryInfoContainerWrapper = WebManager.createWebElement('div', ['inventory-info-container-wrapper'], 'inventory-info-container-wrapper');
    const headerContainer = createHeaderContainer('Item Information');
    const inventoryInfoContainer = WebManager.createWebElement('div', ['inventory-info-container'], 'inventory-info-container');
    const nameProperty = WebManager.createWebElement('h2', ['card-info-text'], 'inventory-info-name', 'Name:');
    const nameEditProperty = WebManager.createWebElement('input', ['card-info-text-input'], 'inventory-info-name-input');

    inventoryInfoContainerWrapper.appendChild(headerContainer);
    inventoryInfoContainer.appendChild(nameProperty);
    inventoryInfoContainerWrapper.appendChild(inventoryInfoContainer);

    populateInventoryInfoContainer();

    return inventoryInfoContainerWrapper;
}

function populateInventoryInfoContainer(item: Item = null) {
    const nameProperty = document.getElementById('inventory-info-name');
    if (item) {
        nameProperty.textContent = 'Name: ' + item.name;
    }
}

function createInventoryItemsContainerWrapper(): HTMLElement {
    const inventoryItemsContainerWrapper = WebManager.createWebElement('div', ['inventory-container-wrapper'], 'inventory-items-container-wrapper');
    const headerContainer = createHeaderContainer('Stored Items');
    const inventoryItemsContainer = WebManager.createWebElement('div', ['inventory-container'], 'inventory-items-container');

    inventoryItemsContainerWrapper.appendChild(headerContainer);
    inventoryItemsContainerWrapper.appendChild(inventoryItemsContainer);
    populateInventoryItemsContainer(inventoryItemsContainer);

    return inventoryItemsContainerWrapper;
}

function createInventoryContainerWrapper(): HTMLElement {
    const inventoryContainerWrapper = WebManager.createWebElement('div', ['inventory-container-wrapper'], 'inventory-container-wrapper');
    const headerContainer = createHeaderContainer('Item Parts');
    const inventoryContainer = WebManager.createWebElement('div', ['inventory-container'], 'inventory-container');

    inventoryContainerWrapper.appendChild(headerContainer);
    inventoryContainerWrapper.appendChild(inventoryContainer);

    return inventoryContainerWrapper;
}

function createInventorySocketsContainerWrapper(): HTMLElement {
    const inventorySocketsContainerWrapper = WebManager.createWebElement('div', ['inventory-container-wrapper'], 'inventory-sockets-container-wrapper');
    const headerContainer = createHeaderContainer('Part Sockets');
    const inventorySocketsContainer = WebManager.createWebElement('div', ['inventory-container'], 'inventory-sockets-container');
    inventorySocketsContainerWrapper.appendChild(headerContainer);
    inventorySocketsContainerWrapper.appendChild(inventorySocketsContainer);
    return inventorySocketsContainerWrapper;
}

function createInventoryPartsContainerWrapper(): HTMLElement {
    const inventoryPartsContainerWrapper = WebManager.createWebElement('div', ['inventory-container-wrapper'], 'inventory-parts-container-wrapper');
    const headerContainer = createHeaderContainer('Valid Parts');
    const inventoryPartsContainer = WebManager.createWebElement('div', ['inventory-container'], 'inventory-parts-container');
    inventoryPartsContainerWrapper.appendChild(headerContainer);
    inventoryPartsContainerWrapper.appendChild(inventoryPartsContainer);
    return inventoryPartsContainerWrapper;
}

function createHeaderContainer(headerText: string): HTMLElement {
    const headerContainer = WebManager.createWebElement('div', ['header-container'], 'header-container-' + headerText.toLowerCase());
    const pageHeader = WebManager.createWebElement('h2', ['page-header'], 'page-header-' + headerText.toLowerCase(), headerText);
    headerContainer.appendChild(pageHeader);
    return headerContainer;
}

function createInventoryItemCard(item: Item): HTMLElement {
    const cardContainer = WebManager.createWebElement('div', ['card-container'], 'inventory-item-card-' + item.id);
    const thisCardInfo = WebManager.createWebElement('div', ['card-info'], 'inventory-item-info-' + item.id);
    const thisCardInfoText = WebManager.createWebElement('h2', ['card-info-text'], 'inventory-item-text-' + item.id, item.name);

    thisCardInfo.appendChild(thisCardInfoText);
    cardContainer.appendChild(thisCardInfo);

    cardContainer.addEventListener('mouseover', () => mouseEvent_hoverItem(item));
    cardContainer.addEventListener('mouseout', () => mouseEvent_exitItem(item));
    cardContainer.addEventListener('click', () => mouseEvent_clickItem(item));

    return cardContainer;
}

function createInventoryCard(part: Part): HTMLElement {
    const cardContainer = WebManager.createWebElement('div', ['card-container'], 'inventory-card-' + part.id);
    const thisCardInfo = WebManager.createWebElement('div', ['card-info', part.rarity], 'inventory-info-' + part.id);
    const thisCardInfoText = WebManager.createWebElement('h2', ['card-info-text'], 'inventory-text-' + part.id, part.name);

    thisCardInfo.appendChild(thisCardInfoText);
    cardContainer.appendChild(thisCardInfo);
    thisCardInfoText.style.color = part.rarity;

    
    cardContainer.addEventListener('mouseover', () => mouseEvent_hoverCard(part, userData));
    cardContainer.addEventListener('mouseout', () => mouseEvent_exitCard(part, userData));
    cardContainer.addEventListener('click', () => mouseEvent_clickCard(part));

    return cardContainer;
}

function createInventorySocket(part: Part, socket: Socket): HTMLElement {
    const cardContainer = WebManager.createWebElement('div', ['card-container'], 'socket-card-' + socket.id);
    const thisCardInfo = WebManager.createWebElement('div', ['card-info'], 'socket-info-' + socket.id);
    const thisCardInfoText = WebManager.createWebElement('h2', ['card-info-text'], 'socket-text-' + socket.id,
    socket.rules.whitelist.types + ' | ' + socket.getPartName());

    thisCardInfo.appendChild(thisCardInfoText);
    cardContainer.appendChild(thisCardInfo);

    cardContainer.addEventListener('mouseover', () => mouseEvent_hoverSocket(part, socket));
    cardContainer.addEventListener('mouseout', () => mouseEvent_exitSocket(part, socket));
    cardContainer.addEventListener('click', () => mouseEvent_clickSocket(part, socket));

    return cardContainer;
}

function createInventoryPart(part: Part, socket: Socket): HTMLElement {
    const cardContainer = WebManager.createWebElement('div', ['card-container'], 'part-card-' + part.id);
    const thisCardInfo = WebManager.createWebElement('div', ['card-info'], 'part-info-' + part.id);
    const thisCardInfoText = WebManager.createWebElement('h2', ['card-info-text'], 'part-text-' + part.id, part.name);

    thisCardInfo.appendChild(thisCardInfoText);
    cardContainer.appendChild(thisCardInfo);

    cardContainer.addEventListener('mouseover', () => mouseEvent_hoverPart(part));
    cardContainer.addEventListener('mouseout', () => mouseEvent_exitPart(part));
    cardContainer.addEventListener('click', () => mouseEvent_clickPart(part, socket));

    return cardContainer;
}

function handleItemOpacity(item: Item, opacityUnderCursor: string, textColor: string) {
    const itemCardText = document.getElementById('inventory-item-text-' + item.id);
    const itemCard = document.getElementById('inventory-item-card-' + item.id);
    itemCard.style.opacity = opacityUnderCursor;
    itemCardText.style.color = textColor;
}

function handleCardOpacity(part: Part, playerData: PlayerData, opacityUnderCursor: string, otherOpacity: string, textColor: string) {
    const partCardText = document.getElementById('inventory-text-' + part.id);
    const partCard = document.getElementById('inventory-card-' + part.id);
    partCard.style.opacity = opacityUnderCursor;
    partCardText.style.color = textColor;

    playerData.inventory.parts.forEach(otherPart => {
        if (otherPart === part) return;
        const getSocket = otherPart.getSocketWithPart(part);
        const otherCard = document.getElementById('inventory-card-' + otherPart.id);
        if (!otherCard) { return; }
        if (getSocket) {
            partCardText.style.color = textColor;
            otherCard.style.opacity = opacityUnderCursor;
        }else{
            otherCard.style.opacity = otherOpacity;
        }
    });
}

function handleSocketOpacity(part: Part, socket: Socket, opacityUnderCursor: string, otherOpacity: string, textColor: string) {
    const socketText = document.getElementById('socket-text-' + socket.id);
    const socketCard = document.getElementById('socket-card-' + socket.id);
    socketText.style.color = textColor;
    socketCard.style.opacity = opacityUnderCursor;
    
    part.sockets.forEach(otherSocket => {
        if (otherSocket.id === socket.id) return;
        const otherSocketText = document.getElementById('socket-text-' + otherSocket.id);
        const otherSocketCard = document.getElementById('socket-card-' + otherSocket.id);
        otherSocketText.style.color = textColor;
        otherSocketCard.style.opacity = otherOpacity;
    });
}

function handlePartOpacity(part: Part, opacityUnderCursor: string, otherOpacity: string, textColor: string) {
    const partText = document.getElementById('part-text-' + part.id);
    const partCard = document.getElementById('part-card-' + part.id);
    partText.style.color = textColor;
    partCard.style.opacity = opacityUnderCursor;
}
// -- mouse events --
function mouseEvent_hoverItem(item: Item) {
    handleItemOpacity(item, '1', '#fff');
}

function mouseEvent_exitItem(item: Item) {
    handleItemOpacity(item, '0.4', '#777');
}

function mouseEvent_clickItem(item: Item): void {
    const inventoryContainer = document.getElementById('inventory-container');
    const inventorySocketsContainer = document.getElementById('inventory-sockets-container');
    const inventoryPartsContainer = document.getElementById('inventory-parts-container');

    inventoryContainer.innerHTML = '';
    inventorySocketsContainer.innerHTML = '';
    inventoryPartsContainer.innerHTML = '';
    item.parts.forEach(part => {
        const card = createInventoryCard(part) as HTMLElement;
        inventoryContainer.append(card);
        card.style.opacity = '0.4';
    });
    populateInventoryInfoContainer(item);
}

function mouseEvent_hoverCard(part: Part, playerData: PlayerData) {
    handleCardOpacity(part, playerData, '1', '0.4', 'white');
}

function mouseEvent_exitCard(part: Part, playerData: PlayerData) {
    handleCardOpacity(part, playerData, '0.4', '0.4', part.rarity);
}

function mouseEvent_clickCard(part: Part): void {
    const inventorySocketsContainer = document.getElementById('inventory-sockets-container');
    const inventoryPartsContainer = document.getElementById('inventory-parts-container');

    inventorySocketsContainer.innerHTML = '';
    inventoryPartsContainer.innerHTML = '';
    part.sockets.forEach(socket => {
        const card = createInventorySocket(part, socket);
        inventorySocketsContainer.append(card);
        card.style.opacity = '0.4';
    });
}

function mouseEvent_hoverSocket(part: Part, socket: Socket) {
    handleSocketOpacity(part, socket, '1', '0.4', '#d3d3d3');
}

function mouseEvent_exitSocket(part: Part, socket: Socket) {
    handleSocketOpacity(part, socket, '0.4', '0.4', '#777');
}

function mouseEvent_clickSocket(part: Part, socket: Socket): void {
    const inventoryPartsContainer = document.getElementById('inventory-parts-container');
    const inventoryItemsContainer = document.getElementById('inventory-items-container');

    if (socket.part) {
        // remove item and all parts which are attached through it from this item
        socket.parent.item.parts.forEach(otherPart => { // for each part in the same item as this one
            let arrayOfNewItemParts: Part[] = []; // make a new array to hold items for detaching
            if (socket.part === otherPart) { // if the part in this socket is (in the same item as this one)
                arrayOfNewItemParts.push(otherPart); // add it to the array
                otherPart.sockets.forEach(connectedSocket => { // then for each socket in that part
                    if (connectedSocket.part !== null) { // if it isnt empty
                        arrayOfNewItemParts.push(connectedSocket.part); // add it to the array also
                    }
                }) // the array now contains the part you want to detach, and the parts in its sockets
                console.log(arrayOfNewItemParts);
                arrayOfNewItemParts.forEach(newItemPart => { // for each item in the array
                    newItemPart.item = null; // set its item to null so it is wrapped by the inventory
                    if (socket.parent.item.parts.includes(newItemPart)) { // if this part is in the old item
                        const partIndex = socket.parent.item.parts.indexOf(newItemPart); // find its index
                        if (partIndex !== -1) { // if you can find it
                            socket.parent.item.parts.splice(partIndex, 1); // remove it
                        }
                    }
                })
            }
        })
        socket.detach(); // detach the part from this socket
        inventoryItemsContainer.innerHTML = ''; // clear the inventory container
        populateInventoryItemsContainer(inventoryItemsContainer); // repopulate it -- should rewrap the parts with no item
    }
    inventoryPartsContainer.innerHTML = '';
    userData.inventory.parts.forEach(part => {
        if (socket.canAttach(part)) {
        const card = createInventoryPart(part, socket);
        inventoryPartsContainer.appendChild(card);
    }
    });
}

function mouseEvent_hoverPart(part: Part) {
    handlePartOpacity(part, '1', '0.4', '#d3d3d3');
}

function mouseEvent_exitPart(part: Part) {
    handlePartOpacity(part, '1', '1', '#777');
}

function mouseEvent_clickPart(part: Part, socket: Socket): void {
    const inventoryPartsContainer = document.getElementById('inventory-parts-container');
    inventoryPartsContainer.innerHTML = '';
    // check if (the part to socket) is in a different item
    if (part.name == part.item.name) {
        // - if it is in an item
        // - - move the (the part to socket).item.parts to item.parts
        socket.parent.item.parts = socket.parent.item.parts.concat(part.item.parts);
        // - - set each otherPart.item to item
        part.item.parts.forEach(part => {
            part.item = socket.parent.item;
        });
    } else {
        // - if it isnt in an item
    }
    socket.attach(part);

    // maybe clear and repopulate items container
    const inventoryItemsContainer = document.getElementById('inventory-items-container');
    inventoryItemsContainer.innerHTML = '';
    populateInventoryItemsContainer(inventoryItemsContainer);
}
// -- mapping --
function buildHouse(w: number = 10, h: number = 10): Pattern {
    const width = w;
    const height = h;
    const mapGenerator = new PatternMapper('house', width, height);
    
    // randomly rotate the direction of the front door
    const house_pattern_base_1 = mapGenerator.rotate90Degrees(HousePatterns.house1_base);
    const house_pattern_base_2 = mapGenerator.rotate90Degrees(house_pattern_base_1);
    const house_pattern_base_3 = mapGenerator.rotate90Degrees(house_pattern_base_2);

    // procedurally add the rotations to the base layer, this should be done more elegantly.
    const basePatterns = [
        HousePatterns.house1_base
    ];
    // the following is top left area (9 on base template)
    const passOne = [
        HousePatterns.house1_zone1_0, HousePatterns.house1_zone1_1, HousePatterns.house1_zone1_2,
         HousePatterns.house1_zone1_3,
    ];
    // the following is top right area (8 on base template)
    const passTwo = [
        HousePatterns.house1_zone2_0, HousePatterns.house1_zone2_1, HousePatterns.house1_zone2_2,
        HousePatterns.house1_zone2_3, HousePatterns.house1_zone2_4,
    ];
    // the following is bottom right area (7 on base template)
    const passThree = [
        HousePatterns.house1_zone3_0, HousePatterns.house1_zone3_1, HousePatterns.house1_zone3_2,
    ];
    // the following is bottom left area (6 on base template)
    const passFour = [
        HousePatterns.house1_zone4_0, HousePatterns.house1_zone4_1,
    ];
    // run the base pattern list over the entire map size
    mapGenerator.applyCollapseToMap(basePatterns, Tile.tiles['empty']);
    // pass for each room, though this can be achieved with
    // turning the bandFilter into an array, and then checking
    // the array instead of just the single filter number.
    mapGenerator.applyCollapseToMap(passOne, Tile.tiles['zone1']);
    mapGenerator.applyCollapseToMap(passTwo, Tile.tiles['zone2']);
    mapGenerator.applyCollapseToMap(passThree, Tile.tiles['zone3']);
    mapGenerator.applyCollapseToMap(passFour, Tile.tiles['zone4']);
    // grab the map for logging purposes, otherwise dont cache.
    const generatedMap = mapGenerator.outputMap;
    // console.log(generatedMap);
    return generatedMap;
}

function buildCityShop(w: number = 10, h: number = 10): Pattern {
    const width = w;
    const height = h;
    const mapGenerator = new PatternMapper('shop', width, height);
    
    const shop1_base_90deg = mapGenerator.rotate90Degrees(ShopPatterns.shop1_base);
    const shop1_base_180deg = mapGenerator.rotate90Degrees(shop1_base_90deg);
    const shop1_base_270deg = mapGenerator.rotate90Degrees(shop1_base_180deg);

    const basePatterns = [
        ShopPatterns.shop1_base,
    ];
    const passOne = [
        ShopPatterns.shop1_zone1_0, ShopPatterns.shop1_zone1_1, ShopPatterns.shop1_zone1_2
    ];
    const passTwo = [
        ShopPatterns.shop1_zone2_0, ShopPatterns.shop1_zone2_1
    ];
    const passThree = [
        ShopPatterns.shop1_zone3_0, ShopPatterns.shop1_zone3_1, ShopPatterns.shop1_zone3_2,
        ShopPatterns.shop1_zone3_3, ShopPatterns.shop1_zone3_4, ShopPatterns.shop1_zone3_5,
        ShopPatterns.shop1_zone3_6
    ];
    const passFour = [
        ShopPatterns.shop1_zone4_0, ShopPatterns.shop1_zone4_1, ShopPatterns.shop1_zone4_2
    ];
    mapGenerator.applyCollapseToMap(basePatterns, Tile.tiles['empty']);
    mapGenerator.applyCollapseToMap(passOne, Tile.tiles['zone1']);
    mapGenerator.applyCollapseToMap(passTwo, Tile.tiles['zone2']);
    mapGenerator.applyCollapseToMap(passThree, Tile.tiles['zone3']);
    mapGenerator.applyCollapseToMap(passFour, Tile.tiles['zone4']);
    const generatedMap = mapGenerator.outputMap;
    // console.log(generatedMap);
    return generatedMap;
}

function displayPattern(mapWidth: number, mapHeight: number, tileSize: number, mapContainer: HTMLElement, pattern: Pattern) {
    const mapActual = pattern; // Assuming this function returns the map data

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            let thisTile = mapActual.content[y][x];
            const mapTile = WebManager.createWebElement('h2', ['map-tile'], 'mapTile-' + x +'-' + y, ' ');
            // addTooltipEvents(mapTile);
            mapTile.style.backgroundColor = `${thisTile.color}`;
            mapTile.style.fontSize = `${tileSize}px`;
            mapTile.style.color = thisTile.color;
            mapContainer.appendChild(mapTile);
        }
    }
}

function createMapTestContainer(mapWidth: number, mapHeight: number, tileSize: number) {
    const mapContainerWrapper = WebManager.createWebElement('div', ['map-container-wrapper'], 'map-test-container-wrapper');
    const mapContainer = WebManager.createWebElement('div', ['map-container'], 'map-test');
    mapContainerWrapper.style.marginLeft = '2%';
    const mapHeader = createHeaderContainer('Test');
    
    // displayPattern(mapWidth, mapHeight, tileSize, mapContainer, buildHouse(mapWidth, mapHeight));
    
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
    const outputSizeX = mapWidth; // Size of the tilemap
    const outputSizeY = mapHeight; // Size of the tilemap
    const generator = new WaveCollapseTilemapGenerator(patterns, outputSizeX, outputSizeY, tileSize);
    const tilemap = generator.generateTilemap();
    const displayPattern = new PixelMatrixRenderer(mapHeight, mapWidth, tileSize, 1, 0.1, mapContainer, tilemap);

    mapContainerWrapper.appendChild(mapHeader);
    mapContainerWrapper.appendChild(mapContainer);

    return mapContainerWrapper;
}

function createMapHouseContainer(mapWidth: number, mapHeight: number, tileSize: number) {
    const mapContainerWrapper = WebManager.createWebElement('div', ['map-container-wrapper'], 'map-house-container-wrapper');
    const mapContainer = WebManager.createWebElement('div', ['map-container'], 'map-house');
    mapContainerWrapper.style.marginLeft = '2%';
    const mapHeader = createHeaderContainer('Random Houses (8x8)');
    
    // displayPattern(mapWidth, mapHeight, tileSize, mapContainer, buildHouse(mapWidth, mapHeight));
    const displayPattern = new PixelMatrixRenderer(mapHeight, mapWidth, tileSize, 1, 0.1, mapContainer, buildHouse(mapWidth, mapHeight));

    mapContainer.style.display = 'grid';
    mapContainer.style.gridTemplateColumns = `repeat(${mapWidth}, ${tileSize}px)`;
    mapContainer.style.gridTemplateRows = `repeat(${mapHeight}, ${tileSize}px)`;

    mapContainerWrapper.appendChild(mapHeader);
    mapContainerWrapper.appendChild(mapContainer);

    return mapContainerWrapper;
}

function createMapShopContainer(mapWidth: number, mapHeight: number, tileSize: number) {
    const mapContainerWrapper = WebManager.createWebElement('div', ['map-container-wrapper'], 'map-shop-container-wrapper');
    mapContainerWrapper.style.marginLeft = '2%';
    const mapContainer = WebManager.createWebElement('div', ['map-container'], 'map-shop');
    const mapHeader = createHeaderContainer('Random City Shops');

    // displayPattern(mapWidth, mapHeight, tileSize, mapContainer, buildCityShop(mapWidth, mapHeight));
    const displayPattern = new PixelMatrixRenderer(mapHeight, mapWidth, tileSize, 1, 0.1, mapContainer, buildCityShop(mapWidth, mapHeight));

    mapContainerWrapper.appendChild(mapHeader);
    mapContainerWrapper.appendChild(mapContainer);

    return mapContainerWrapper;
}