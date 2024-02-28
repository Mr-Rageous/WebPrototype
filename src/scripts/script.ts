import { PlayerData } from './playerData.js';
import { settings, initialSettings } from './settings.js';
import { WebManager, checkObjectForProperty } from './utility.js';
import { sword_item } from './parts.js';
import { Part, Socket } from './part.js';

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- USERDATA ------
const userData = new PlayerData('userData');
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- SETTINGS ------
function addSettingToSettingPage(setting: any) { settings.push(setting); }
initialSettings.forEach(setting => { addSettingToSettingPage(setting); });
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- CRAFTING ------
sword_item.forEach(part => { userData.inventory.parts.push(part); });
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- TABS ----------
const tabs = document.querySelectorAll('.tabs li');
const mainContent = document.querySelector('.main-content');

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        loadContent(this.textContent);
    });
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

virtualClickOnTab('Inventory');

function loadHomePage() {

}

function loadWorldPage() {

}

function loadPlayerPage() {

}

function loadGatherPage() {
    
}

function loadResearchPage() {

}

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

function loadInventoryPage() {
    const pageContent = createInventoryPageContent();

    const inventoryContainerWrapper = createInventoryContainerWrapper();
    const inventoryItemContainerWrapper = createInventorySocketsContainerWrapper();
    const inventorySocketContainerWrapper = createInventoryPartsContainerWrapper();

    pageContent.appendChild(inventoryContainerWrapper);
    pageContent.appendChild(inventoryItemContainerWrapper);
    pageContent.appendChild(inventorySocketContainerWrapper);

    mainContent.appendChild(pageContent);
}

function createInventoryPageContent(): HTMLElement {
    const pageContent = WebManager.createWebElement('div', ['inventory-page'], 'page-content');
    return pageContent;
}

function populateInventoryContainer(inventoryContainer: HTMLElement) {
    if (userData.inventory.parts.length !== 0) {
        userData.inventory.parts.forEach(part => {
            const listContainer = createInventoryCard(part);
            inventoryContainer.appendChild(listContainer);
        });
    }

}

function createInventoryContainerWrapper(): HTMLElement {
    const inventoryContainerWrapper = WebManager.createWebElement('div', ['inventory-container-wrapper'], 'inventory-container-wrapper');
    const headerContainer = createHeaderContainer('Stored Parts');
    const inventoryContainer = WebManager.createWebElement('div', ['inventory-container'], 'inventory-container');

    inventoryContainerWrapper.appendChild(headerContainer);
    inventoryContainerWrapper.appendChild(inventoryContainer);
    
    populateInventoryContainer(inventoryContainer);

    return inventoryContainerWrapper;
}

function createInventorySocketsContainerWrapper(): HTMLElement {
    const inventorySocketsContainerWrapper = WebManager.createWebElement('div', ['inventory-sockets-container-wrapper'], 'inventory-sockets-container-wrapper');
    const headerContainer = createHeaderContainer('Click a part to expose its sockets');
    const inventorySocketsContainer = WebManager.createWebElement('div', ['inventory-container'], 'inventory-sockets-container');
    inventorySocketsContainerWrapper.appendChild(headerContainer);
    inventorySocketsContainerWrapper.appendChild(inventorySocketsContainer);
    return inventorySocketsContainerWrapper;
}

function createInventoryPartsContainerWrapper(): HTMLElement {
    const inventoryPartsContainerWrapper = WebManager.createWebElement('div', ['inventory-container-wrapper'], 'inventory-parts-container-wrapper');
    const headerContainer = createHeaderContainer('Click a socket');
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

function createInventoryCard(part: Part): HTMLElement {
    const cardContainer = WebManager.createWebElement('div', ['card-container'], 'inventory-card-' + part.id);
    const thisCardInfo = WebManager.createWebElement('div', ['card-info'], 'inventory-info-' + part.id);
    const thisCardInfoText = WebManager.createWebElement('h2', ['card-info-text'], 'inventory-text-' + part.id, part.name);

    thisCardInfo.appendChild(thisCardInfoText);
    cardContainer.appendChild(thisCardInfo);

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

    cardContainer.addEventListener('mouseover', () => mouseEvent_hoverPart(part, userData));
    cardContainer.addEventListener('mouseout', () => mouseEvent_exitPart(part, userData));
    cardContainer.addEventListener('click', () => mouseEvent_clickPart(part, socket));

    return cardContainer;
}

function handleCardOpacity(part: Part, playerData: PlayerData, opacityUnderCursor: string, otherOpacity: string, textColor: string) {
    const partCardText = document.getElementById('inventory-text-' + part.id);
    const partCard = document.getElementById('inventory-card-' + part.id);
    partCard.style.opacity = opacityUnderCursor;
    partCardText.style.color = textColor;
    
    let firstSocket = part.sockets[0];
    const socketExists = document.getElementById('socket-card-' + firstSocket.id);
    playerData.inventory.parts.forEach(otherPart => {
        if (otherPart === part) return;
        const getSocket = otherPart.getSocketWithPart(part);
        const otherCard = document.getElementById('inventory-card-' + otherPart.id);
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
        const socketText = document.getElementById('socket-text-' + otherSocket.id);
        const socketCard = document.getElementById('socket-card-' + otherSocket.id);
        socketText.style.color = textColor;
        socketCard.style.opacity = otherOpacity;
    });
}

function mouseEvent_hoverCard(part: Part, playerData: PlayerData) {
    handleCardOpacity(part, playerData, '1', '0.4', '#fff');
}

function mouseEvent_exitCard(part: Part, playerData: PlayerData) {
    handleCardOpacity(part, playerData, '0.4', '0.4', '#777');
}

function mouseEvent_clickCard(part: Part): void {
    const inventorySocketsContainer = document.getElementById('inventory-sockets-container');
    const inventoryPartsContainer = document.getElementById('inventory-parts-container');

    inventorySocketsContainer.innerHTML = '';
    inventoryPartsContainer.innerHTML = '';
    part.sockets.forEach(socket => {
        const card = createInventorySocket(part, socket);
        inventorySocketsContainer.append(card);
    });
}

function mouseEvent_hoverSocket(part: Part, socket: Socket) {
    handleSocketOpacity(part, socket, '1', '0.4', '#d3d3d3');
}

function mouseEvent_exitSocket(part: Part, socket: Socket) {
    handleSocketOpacity(part, socket, '1', '1', '#777');
}

function mouseEvent_clickSocket(part: Part, socket: Socket): void {
    const inventoryPartsContainer = document.getElementById('inventory-parts-container');
    const socketText = document.getElementById('socket-text-' + socket.id);

    if (socket.part) {
        socket.part.sockets.forEach(otherSocket => {
            if (otherSocket.part === socket.parent) {
                otherSocket.part = null;
                const otherSocketText = document.getElementById('socket-text-' + socket.id);
                otherSocketText.textContent = socket.rules.whitelist.types + ' | ' + socket.getPartName();
            }
        });
        socket.part = null;
        socketText.textContent = socket.rules.whitelist.types + ' | ' + socket.getPartName();
    }
    inventoryPartsContainer.innerHTML = '';
    userData.inventory.parts.forEach(part => {
        if (socket.canAttach(part)) {
        const card = createInventoryPart(part, socket);
        inventoryPartsContainer.appendChild(card);
    }
    });
}

function mouseEvent_hoverPart(part: Part, playerData: PlayerData) {
    handleCardOpacity(part, playerData, '1', '0.4', '#d3d3d3');
}

function mouseEvent_exitPart(part: Part, playerData: PlayerData) {
    handleCardOpacity(part, playerData, '1', '1', '#777');
}

function mouseEvent_clickPart(part: Part, socket: Socket): void {
    const inventoryPartsContainer = document.getElementById('inventory-parts-container');
    const socketText = document.getElementById('socket-text-' + socket.id);
    inventoryPartsContainer.innerHTML = '';
    socket.part = part;
    socket.part.sockets.forEach(otherSocket => {
        otherSocket.part = socket.parent;
        socketText.textContent = (socket.rules.whitelist.getSharedTypesWith(part.types) + ' | ' + socket.getPartName())
    });
}

