import * as allResources from './resources.js';
import { PlayerData } from './playerData.js';
import { settings, initialSettings } from './settings.js';
import { WebManager, checkObjectForProperty } from './utility.js';
import { testSword } from './parts.js';

document.addEventListener('DOMContentLoaded', function() {
    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------- USERDATA ------
    const userData = new PlayerData('userData');
    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------- SETTINGS ------
    function addSettingToSettingPage(setting) { settings.push(setting); }
    initialSettings.forEach(setting => { addSettingToSettingPage(setting); });
    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------- RESOURCES -----
    const initialResources = [ allResources.berries, allResources.fiber, allResources.herbs, allResources.sticks, allResources.stones, allResources.water, ];
    initialResources.forEach(resource => { userData.resources.push(resource); });
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
        const gatherContent = WebManager.createWebElement('div', ['gather-content'], '');
        const resourceContainerWrapper = WebManager.createWebElement('div', ['resource-container-wrapper'], '');

        const headerContainer = WebManager.createWebElement('div', ['header-container'], '');
        const pageHeader = WebManager.createWebElement('h2', ['page-header'], '', 'Gather');
        
        headerContainer.appendChild(pageHeader);
        gatherContent.appendChild(headerContainer);
        
        userData.resources.forEach(resource => {
            const resourceContainer = WebManager.createWebElement('div', ['resource-container'], '');
            const box = WebManager.createWebElement('div', ['box'], '');
            const percent = WebManager.createWebElement('div', ['percent'], '');
            const h2 = WebManager.createWebElement('h2', ['text'], '', resource.quantity);
            
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '150');
            svg.setAttribute('height', '150');
            
            const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle1.setAttribute('cx', '55');
            circle1.setAttribute('cy', '55');
            circle1.setAttribute('r', '55');
            
            const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle2.style.transform = 'rotate(-90deg) translateX(-115px) translateY(5px)';
            circle2.setAttribute('cx', '55');
            circle2.setAttribute('cy', '55');
            circle2.setAttribute('r', '55');
            
            const card = WebManager.createWebElement('div', ['card'], '');
            
            resourceContainer.addEventListener('click', function() {
              gatherResource(resource, circle2, h2);
            });

            svg.appendChild(circle1);
            svg.appendChild(circle2);
            
            const num = WebManager.createWebElement('div', ['num'], '');
            
            num.appendChild(h2);
            
            const text = WebManager.createWebElement('h2', ['text'], '', resource.name);
            
            updateProgress(circle2, resource.progress);
            
            percent.appendChild(svg);
            percent.appendChild(num);
            box.appendChild(percent);
            box.appendChild(text);
            card.appendChild(box);
            resourceContainer.appendChild(card);

            resourceContainerWrapper.appendChild(resourceContainer);
        });
    
        gatherContent.appendChild(resourceContainerWrapper);
        mainContent.appendChild(gatherContent);
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
            const thisCardInfoText = WebManager.createWebElement('h2', ['card-info-text'], '', part.name);

            thisCardInfo.appendChild(thisCardInfoText);
            thisCardInfo.addEventListener('mouseover', function() {
                userData.inventory.parts.forEach(similarPart => {
                    if (similarPart != null) {
                        if (similarPart.isInItem(part.item)) {
                            listContainer.style.color = "yellow";
                        }else{
                            listContainer.style.color = "";
                        }
                    }
                });
            });

            listContainer.appendChild(thisCardInfo);
            listContainer.addEventListener('click', function() {
                inventoryContainerWrapper2.innerHTML = '';

                const genHeaderContainer = WebManager.createWebElement('div', ['header-container'], '');
                const genPageHeader = WebManager.createWebElement('h2', ['page-header'], '', `Sockets`);
                genHeaderContainer.appendChild(genPageHeader);
                inventoryContainerWrapper2.appendChild(genHeaderContainer);
                part.sockets.forEach(socket => {
                    const genListContainer = WebManager.createWebElement('div', ['list-container'], '');
                    const genCardInfo = WebManager.createWebElement('div', ['card-info'], '');
                    const genCardInfoText = WebManager.createWebElement('h2', ['card-info-text'], '', (socket.rules.whitelist.types + ' | ' + socket.getPartName()));
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

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------- METHODS -------
    function updateRecipeRequirementsPanel(recipe, cardInfo) {
        cardInfo.innerHTML = '';
        recipe.requirements.forEach(requirement => {
            const text_gen1 = WebManager.createWebElement('h4', ['card-info-text'], '', '[' + requirement.quantity + '] ' + requirement.name);
            text_gen1.style.color = 'green';
            userData.resources.forEach(resource => {
                if (resource.name == requirement.name) {
                    if (resource.quantity < requirement.quantity) {
                        text_gen1.style.color = 'red';
                    }
                }
            });
            cardInfo.appendChild(text_gen1);
        });
    }

    function gatherResource(resource, circle, h2) {
        if (circle.dataset.animationInProgress === 'true') { return; }
    
        circle.dataset.animationInProgress = 'true';
    
        const duration = resource.progressSpeed; // default = 60
        const increment = 1 / (duration / 100);
    
        const container = document.querySelector('.card');
        container.style.pointerEvents = 'none';
    
        const interval = setInterval(() => {
            resource.progress += increment;
    
            if (resource.progress >= 100) {
                clearInterval(interval);
                resource.progress = 0;
                resource.quantity++;
                h2.textContent = resource.quantity;
                circle.dataset.animationInProgress = 'false';
                container.style.pointerEvents = 'auto';
            }
    
            updateProgress(circle, resource.progress);
        }, 10);
    }

    function craftRecipe(recipe, circle = null, h2 = null) {
        if (circle.dataset.animationInProgress === 'true') { return; }
    
        circle.dataset.animationInProgress = 'true';
    
        const duration = 60;
        const increment = 1 / (duration / 100);
    
        const container = document.querySelector('.card');
        container.style.pointerEvents = 'none';
    
        const interval = setInterval(() => {
            recipe.progress += increment;
    
            if (recipe.progress >= 100) {
                clearInterval(interval);
                recipe.progress = 0;
                // -- todo -- modify user resources.quantity
                recipe.requirements.forEach(requirement => {
                    userData.resources[requirement.name].quantity -= requirement.quantity;
                });
                recipe.quantity++;
                h2.textContent = recipe.quantity;
                circle.dataset.animationInProgress = 'false';
                container.style.pointerEvents = 'auto';
            }
    
            updateProgress(circle, recipe.progress);
        }, 10);
    }
    
    function updateProgress(circle, progress) {
        const percentage = progress;
    
        const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r"));
        const offset = circumference - (circumference * percentage) / 100;
    
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
    }
});
