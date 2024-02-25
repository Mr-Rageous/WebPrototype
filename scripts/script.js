import * as allResources from './resources.js';
// import { Location } from './location.js';
// import * as allLocations from './locations.js';
import { PlayerData } from './playerData.js';
import { settings, initialSettings } from './settings.js';
import { WebManager, checkObjectForProperty } from './utility.js';

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
    const initialRecipes = [ allResources.berryJuice_recipe, allResources.herbalTea_recipe, allResources.stoneAxe_recipe, allResources.stonePickaxe_recipe ];
    initialRecipes.forEach(recipe => { userData.addToRecipes(recipe); });
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

    loadContent('Home');

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
            case 'Crafting':
                loadCraftingPage();
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

    function loadCraftingPage() {
        const craftingContent = WebManager.createWebElement('div', ['crafting-content'], '');
        const craftingContainerWrapper = WebManager.createWebElement('div', ['crafting-container-wrapper'], '');
        const headerContainer = WebManager.createWebElement('div', ['header-container'], '');
        const pageHeader = WebManager.createWebElement('h2', ['page-header'], '', 'Crafting');

        headerContainer.appendChild(pageHeader);
        craftingContent.appendChild(headerContainer);

        if (userData.recipes.length != 0) {
            userData.recipes.forEach(recipe => {
            const craftingContainer = WebManager.createWebElement('div', ['info-container'], '');
            const cardLong = WebManager.createWebElement('div', ['card-info'], '');
            const text = WebManager.createWebElement('h2', ['card-info-text'], '', recipe.name);

            cardLong.appendChild(text);

            cardLong.addEventListener('mouseover', function() {
                updateRecipeRequirementsPanel(recipe, cardInfo);
            });

            craftingContainer.appendChild(cardLong);
            
            craftingContainer.addEventListener('click', function() {
              if (hasRecipeRequirements(recipe)) {
                craftRecipe(recipe);
              }
            });

            craftingContainerWrapper.appendChild(craftingContainer);
        });}

        const headerInfoContainer = WebManager.createWebElement('div', ['header-container'], '');
        const pageInfoHeader = WebManager.createWebElement('h2', ['page-header'], '', `Information`);

        const craftingContainerWrapper2 = WebManager.createWebElement('div', ['crafting-container-wrapper'], '');

        const infoContainer = WebManager.createWebElement('div', ['info-container'], '');
        infoContainer.classList.add('info-container');

        const cardInfo = WebManager.createWebElement('div', ['card-info'], '');
        const text_name = WebManager.createWebElement('h4', ['card-info-text'], '', 'Hover a recipe to see its info.');

        craftingContainerWrapper2.appendChild(infoContainer);

        cardInfo.appendChild(text_name);

        craftingContent.appendChild(craftingContainerWrapper);
        headerInfoContainer.appendChild(pageInfoHeader);
        craftingContent.appendChild(headerInfoContainer);
        infoContainer.appendChild(cardInfo);
        craftingContent.appendChild(craftingContainerWrapper2);
        mainContent.appendChild(craftingContent);
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
    
            settingsContainer.addEventListener('click', function() {
                
            });
            
            const text = WebManager.createWebElement('h2', ['card-long-text'], '', setting.name);
            
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

    function hasRecipeRequirements(recipe) {
        let doThing = true;

        recipe.requirements.forEach(requirement => {
            userData.resources.forEach(resource => {
                if (requirement.name == resource.name) {
                    if (resource.quantity >= requirement.quantity) {
                        // do stuff
                    }else{
                        doThing = false;
                    }
                }
            });
        });

        return doThing;
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
