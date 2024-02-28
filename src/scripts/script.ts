import { PlayerData } from './playerData.js';
import { settings, initialSettings } from './settings.js';
import { WebManager, checkObjectForProperty } from './utility.js';
import { testSword } from './parts.js';

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- USERDATA ------
const userData = new PlayerData('userData');
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- SETTINGS ------
function addSettingToSettingPage(setting) { settings.push(setting); }
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

function loadContent(tabName) {
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

function virtualClickOnTab(tabName) {
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

function loadInventoryPage() {
    const pageContent = WebManager.createWebElement('div', ['inventory-page'], '');

    const inventoryContainerWrapper = WebManager.createWebElement('div', ['inventory-container-wrapper'], '');
    const headerContainer = WebManager.createWebElement('div', ['header-container'], '');
    const pageHeader = WebManager.createWebElement('h2', ['page-header'], '', 'Stored Parts');

    const inventoryContainerWrapper2 = WebManager.createWebElement('div', ['inventory-item-container-wrapper'], '');
    const headerContainer2 = WebManager.createWebElement('div', ['header-container'], '');
    const pageHeader2 = WebManager.createWebElement('h2', ['page-header'], '', `Click a part to expose its sockets`);

    const inventoryContainerWrapper3 = WebManager.createWebElement('div', ['inventory-container-wrapper'], '');
    const headerContainer3 = WebManager.createWebElement('div', ['header-container'], '');
    const pageHeader3 = WebManager.createWebElement('h2', ['page-header'], '', 'Click a socket');

    headerContainer.appendChild(pageHeader);
    inventoryContainerWrapper.appendChild(headerContainer);

    if (userData.inventory.parts.length !== 0) {
        userData.inventory.parts.forEach(part => {
        const listContainer = WebManager.createWebElement('div', ['list-container'], '');
        const thisCardInfo = WebManager.createWebElement('div', ['card-info'], '');
        const thisCardInfoText = WebManager.createWebElement('h2', ['card-info-text'], part.name, part.name);

        thisCardInfo.appendChild(thisCardInfoText);
        listContainer.addEventListener('mouseover', function() {
            part.sockets.forEach(socket => {
                try {
                    const genCardInfoText = document.getElementById('genCardInfoText' + part.sockets.indexOf(socket));
                    const cardInfoText = document.getElementById(part.name);
                    if (genCardInfoText) {
                        // if part is in sockets of any other part
                        userData.inventory.parts.forEach(otherPart => {
                            if (otherPart === part) { return; }
                            if (otherPart.getSocketWithPart(part.name)) {
                                socket.part = otherPart;
                                const otherCardInfoText = document.getElementById(otherPart.name);
                                cardInfoText.parentNode.parentNode.style.opacity = "1";
                                otherCardInfoText.parentNode.parentNode.style.opacity = "1";
                            }
                        });
                        genCardInfoText.textContent = (socket.rules.whitelist.types + ' | ' + socket.getPartName());
                    } else {
                        // Element not found
                    }
                } catch (error) {
                    // Handle the exception
                }
            });
        });
        listContainer.addEventListener('mouseout', function() {
            part.sockets.forEach(socket => {
                try {
                    const genCardInfoText = document.getElementById('genCardInfoText' + part.sockets.indexOf(socket));
                    const cardInfoText = document.getElementById(part.name);
                    if (genCardInfoText) {
                        // if part is in sockets of any other part
                        userData.inventory.parts.forEach(otherPart => {
                            if (otherPart === part) { return; }
                            if (otherPart.getSocketWithPart(part.name)) {
                                socket.part = otherPart;
                                const otherCardInfoText = document.getElementById(otherPart.name);
                                cardInfoText.parentNode.parentNode.style.opacity = "0.6";
                                otherCardInfoText.parentNode.parentNode.style.opacity = "0.6";
                            }
                        });
                        genCardInfoText.textContent = (socket.rules.whitelist.types + ' | ' + socket.getPartName());
                    } else {
                        // Element not found
                    }
                } catch (error) {
                    // Handle the exception
                }
            });
        });

        listContainer.appendChild(thisCardInfo);
        listContainer.addEventListener('click', function() {
            inventoryContainerWrapper2.innerHTML = '';
            inventoryContainerWrapper3.innerHTML = '';

            headerContainer3.appendChild(pageHeader3);
            inventoryContainerWrapper3.appendChild(headerContainer3);

            const genHeaderContainer = WebManager.createWebElement('div', ['header-container'], '');
            const genPageHeader = WebManager.createWebElement('h2', ['page-header'], '', `Sockets`);
            genHeaderContainer.appendChild(genPageHeader);
            inventoryContainerWrapper2.appendChild(genHeaderContainer);
            part.sockets.forEach(socket => {
                const genListContainer = WebManager.createWebElement('div', ['list-container'], '');
                const genCardInfo = WebManager.createWebElement('div', ['card-info'], '');
                const genCardInfoText = WebManager.createWebElement('h2', ['card-info-text'], 'genCardInfoText' + part.sockets.indexOf(socket), (socket.rules.whitelist.types + ' | ' + socket.getPartName()));
                genCardInfo.appendChild(genCardInfoText);
                genListContainer.appendChild(genCardInfo);
                inventoryContainerWrapper2.appendChild(genListContainer);
                
                genListContainer.addEventListener('click', function() {
                    // present valid parts if slot is empty
                    if (socket.part == null) {
                        inventoryContainerWrapper3.innerHTML = '';

                        const genHeaderContainer2 = WebManager.createWebElement('div', ['header-container'], '');
                        const genPageHeader2 = WebManager.createWebElement('h2', ['page-header'], '', `Valid Parts`);
                        genHeaderContainer2.appendChild(genPageHeader2);
                        inventoryContainerWrapper3.appendChild(genHeaderContainer2);
                        userData.inventory.parts.forEach(validPart => {
                            if (socket.canAttach(validPart)) {
                                const genListContainer2 = WebManager.createWebElement('div', ['list-container'], '');
                                const genCardInfo2 = WebManager.createWebElement('div', ['card-info'], '');
                                const genCardInfoText2 = WebManager.createWebElement('h2', ['card-info-text'], '', validPart.name);
                                genCardInfo2.appendChild(genCardInfoText2);
                                genListContainer2.appendChild(genCardInfo2);
                                genListContainer2.addEventListener('click', function() {
                                    inventoryContainerWrapper3.removeChild(genListContainer2);
                                    socket.attach(validPart);
                                    genPageHeader2.textContent = 'Click a socket';
                                    genListContainer2.innerHTML = '';
                                    genCardInfoText.textContent = (socket.rules.whitelist.getSharedTypesWith(validPart.types) + ' | ' + socket.getPartName());
                                });
                                inventoryContainerWrapper3.appendChild(genListContainer2);
                            }
                        });
                    }else{
                        inventoryContainerWrapper3.innerHTML = '';

                        const genHeaderContainer2 = WebManager.createWebElement('div', ['header-container'], '');
                        const genPageHeader2 = WebManager.createWebElement('h2', ['page-header'], '', `Valid Parts`);
                        genHeaderContainer2.appendChild(genPageHeader2);
                        inventoryContainerWrapper3.appendChild(genHeaderContainer2);
                        userData.inventory.parts.forEach(validPart => {
                            if (socket.canAttach(validPart)) {
                                const genListContainer2 = WebManager.createWebElement('div', ['list-container'], '');
                                const genCardInfo2 = WebManager.createWebElement('div', ['card-info'], '');
                                const genCardInfoText2 = WebManager.createWebElement('h2', ['card-info-text'], '', validPart.name);
                                userData.inventory.parts.forEach(otherPart => {
                                    if (otherPart == part) { return; }
                                    if (otherPart.canAttach(part)) {
                                        otherPart.getSocketWithPart(part.name).part = null;
                                    }
                                });
                                socket.part = null;
                                genCardInfoText.textContent = (socket.rules.whitelist.types + ' | ' + socket.getPartName());
                                genCardInfo2.appendChild(genCardInfoText2);
                                genListContainer2.appendChild(genCardInfo2);
                                genListContainer2.addEventListener('click', function() {
                                    inventoryContainerWrapper3.removeChild(genListContainer2);
                                    socket.attach(validPart);
                                    genPageHeader2.textContent = 'Click a socket';
                                    genCardInfoText.textContent = (socket.rules.whitelist.getSharedTypesWith(validPart.types) + ' | ' + socket.getPartName());
                                });
                                inventoryContainerWrapper3.appendChild(genListContainer2);
                            }
                        });
                    }
                });

                inventoryContainerWrapper2.appendChild(genListContainer);
            });

            if (part.item !== null) {
                const genHeaderContainer2 = WebManager.createWebElement('div', ['header-container'], '');
                const genPageHeader2 = WebManager.createWebElement('h2', ['page-header'], '', (`Item Information - ` + part.item.name));
                genHeaderContainer2.appendChild(genPageHeader2);
                inventoryContainerWrapper2.appendChild(genHeaderContainer2);
            }

            // bring inventoryContainerWrapper2 from 0% width to 100%, ease-in-out transition
        });

        inventoryContainerWrapper.appendChild(listContainer);
    });}

    pageContent.appendChild(inventoryContainerWrapper);
    headerContainer2.appendChild(pageHeader2);
    inventoryContainerWrapper2.appendChild(headerContainer2);
    pageContent.appendChild(inventoryContainerWrapper2);
    headerContainer3.appendChild(pageHeader3);
    inventoryContainerWrapper3.appendChild(headerContainer3);
    pageContent.appendChild(inventoryContainerWrapper3);
    mainContent.appendChild(pageContent);
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