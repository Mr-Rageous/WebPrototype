import { PlayerData } from './playerData.js';
import { settings, initialSettings } from './settings.js';
import { WebManager, checkObjectForProperty } from './utility.js';
import { testSword } from './parts.js';
import { mouseEvent_hoverPart, mouseEvent_exitPart } from './webEvents.js'; // move to utility?
import { Part } from './part.js';

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- USERDATA ------
const userData = new PlayerData('userData');
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- SETTINGS ------
function addSettingToSettingPage(setting: any) { settings.push(setting); }
initialSettings.forEach(setting => { addSettingToSettingPage(setting); });
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- CRAFTING ------
testSword.forEach(part => { userData.inventory.parts.push(part); });
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
        case 'Gather':
            loadGatherPage();
            break;
        case 'Player':
            loadPlayerPage();
            break;
        case 'Market':
            loadMarketPage();
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

function loadMarketPage() {
    
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
    const pageContent = WebManager.createWebElement('div', ['inventory-page'], '');
    return pageContent;
}

function populateInventoryContainer(inventoryContainer) {
    // Populate inventory parts if userData is available
    if (userData.inventory.parts.length !== 0) {
        userData.inventory.parts.forEach(part => {
            const listContainer = createListContainer(part);
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

function createListContainer(part: Part): HTMLElement {
    const listContainer = WebManager.createWebElement('div', ['list-container'], part.name.toLowerCase() + '-card');
    const thisCardInfo = WebManager.createWebElement('div', ['card-info'], part.name.toLowerCase() + '-info');
    const thisCardInfoText = WebManager.createWebElement('h2', ['card-info-text'], part.name.toLowerCase() + '-text', part.name);

    thisCardInfo.appendChild(thisCardInfoText);
    listContainer.appendChild(thisCardInfo);

    listContainer.addEventListener('mouseover', () => mouseEvent_hoverPart(part, userData));
    listContainer.addEventListener('mouseout', () => mouseEvent_exitPart(part, userData));
    listContainer.addEventListener('click', () => handlePartClick(part));

    return listContainer;
}

function handlePartClick(part: Part): void {
    const inventoryContainerWrapper2 = document.getElementById('inventory-sockets-container-wrapper');
    const inventoryContainerWrapper3 = document.getElementById('inventory-parts-container-wrapper');

    // Handle the rest of the logic for the clicked part
    // ...
}

