import { settings, initialSettings } from './settings.js'

document.addEventListener('DOMContentLoaded', function() {
    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------- USERDATA ------
    const userData = new PlayerData('userData');
    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------- SETTINGS ------
    function addSettingToSettingPage(setting) { settings.push(setting); }
    initialSettings.forEach(setting => { addSettingToSettingPage(setting); });
    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------- RESOURCES -----
    const initialResources = [ berries, fiber, herbs, sticks, stones, water, ];
    initialResources.forEach(resource => { userData.getResources().push(resource); });
    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------- CRAFTING ------
    const initialRecipes = [ berryJuice_recipe, herbalTea_recipe, stoneAxe_recipe, stonePickaxe_recipe ];
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
        const gatherContent = document.createElement('div');
        gatherContent.classList.add('gather-content');
    
        const resourceContainerWrapper = document.createElement('div');
        resourceContainerWrapper.classList.add('resource-container-wrapper');

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('header-container');

        const pageHeader = document.createElement('h2');
        pageHeader.textContent = `Gather`;
        pageHeader.classList.add('page-header');

        headerContainer.appendChild(pageHeader);
        gatherContent.appendChild(headerContainer);
        
        userData.resources.forEach(resource => {
            // Create container element
            const resourceContainer = document.createElement('div');
            resourceContainer.classList.add('resource-container');
            
            // Create box element
            const box = document.createElement('div');
            box.classList.add('box');
            
            // Create percent element
            const percent = document.createElement('div');
            percent.classList.add('percent');
            
            // Create h2 element
            const h2 = document.createElement('h2');
            h2.textContent = resource.quantity;

            // Create SVG element
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '150');
            svg.setAttribute('height', '150');
            
            // Create circle elements
            const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle1.setAttribute('cx', '55');
            circle1.setAttribute('cy', '55');
            circle1.setAttribute('r', '55');
            
            const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle2.style.transform = 'rotate(-90deg) translateX(-115px) translateY(5px)';
            circle2.setAttribute('cx', '55');
            circle2.setAttribute('cy', '55');
            circle2.setAttribute('r', '55');
            
            // Create card element
            const card = document.createElement('div');
            card.classList.add('card');

            // Add a click event listener to the container
            resourceContainer.addEventListener('click', function(event) {
              // Your click event handling code here
              gatherResource(resource, circle2, h2);
            });

            svg.appendChild(circle1);
            svg.appendChild(circle2);
            
            // Create num element
            const num = document.createElement('div');
            num.classList.add('num');
            
            num.appendChild(h2);
            
            // Create text element
            const text = document.createElement('h2');
            text.classList.add('text');
            text.textContent = resource.name;
            
            updateProgress(circle2, resource.progress);
            // Append elements to their respective parent elements
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
        const craftingContent = document.createElement('div');
        craftingContent.classList.add('crafting-content');

        const craftingContainerWrapper = document.createElement('div');
        craftingContainerWrapper.classList.add('crafting-container-wrapper');

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('header-container');
        const pageHeader = document.createElement('h2');
        pageHeader.textContent = `Crafting`;
        pageHeader.classList.add('page-header');
        headerContainer.appendChild(pageHeader);
        craftingContent.appendChild(headerContainer);

        if (userData.getRecipes().length != 0) {
            userData.getRecipes().forEach(recipe => {
            const craftingContainer = document.createElement('div');
            craftingContainer.classList.add('info-container');
            // --
            
            const cardLong = document.createElement('div');
            cardLong.classList.add('card-info');
            // --
            const text = document.createElement('h2');
            text.classList.add('card-info-text');
            text.textContent = recipe.name;

            cardLong.appendChild(text);
            cardLong.addEventListener('mouseover', function(event) {
                updateRecipeRequirementsPanel(recipe, cardInfo);
            });

            craftingContainer.appendChild(cardLong);
            
            craftingContainer.addEventListener('click', function(event) {
              if (hasRecipeRequirements(recipe)) {
                craftRecipe(recipe, circle2, h2);
              }
            });
            craftingContainerWrapper.appendChild(craftingContainer);
        })}

        const headerInfoContainer = document.createElement('div');
        headerInfoContainer.classList.add('header-container');
        const pageInfoHeader = document.createElement('h2');
        pageInfoHeader.textContent = `Information`;
        pageInfoHeader.classList.add('page-header');

        const craftingContainerWrapper2 = document.createElement('div');
        craftingContainerWrapper2.classList.add('crafting-container-wrapper');

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');

        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');
        const text_name = document.createElement('h4');
        text_name.classList.add('card-info-text');
        text_name.textContent = 'Hover a recipe to see its info.';

        craftingContainerWrapper2.appendChild(infoContainer);

        cardInfo.appendChild(text_name);

        craftingContent.appendChild(craftingContainerWrapper);
        headerInfoContainer.appendChild(pageInfoHeader);
        craftingContent.appendChild(headerInfoContainer);
        infoContainer.appendChild(cardInfo)
        craftingContent.appendChild(craftingContainerWrapper2);
        mainContent.appendChild(craftingContent);
    }

    function loadResearchPage() {

    }

    function loadMarketPage() {
        
    }

    function loadSettingsPage() {
        const settingsContent = document.createElement('div');
        settingsContent.classList.add('settings-content');
    
        const settingsContainerWrapper = document.createElement('div');
        settingsContainerWrapper.classList.add('settings-container-wrapper');

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('header-container');

        const pageHeader = document.createElement('h2');
        pageHeader.textContent = `Settings`;
        pageHeader.classList.add('page-header');

        headerContainer.appendChild(pageHeader);
        settingsContent.appendChild(headerContainer);

        settings.forEach(setting => {
            const settingsContainer = document.createElement('div');
            settingsContainer.classList.add('settings-container');
            
            const cardLong = document.createElement('div');
            cardLong.classList.add('card-long');
    
            settingsContainer.addEventListener('click', function(event) {
                
            });
            
            const text = document.createElement('h2');
            text.classList.add('card-long-text');
            text.textContent = setting.name;
            
            cardLong.appendChild(text);
            settingsContainer.appendChild(cardLong);
            settingsContent.appendChild(settingsContainer)
        })

        mainContent.appendChild(settingsContent);
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------- METHODS -------
    function updateRecipeRequirementsPanel(recipe, cardInfo) {
        cardInfo.innerHTML = '';
        recipe.requirements.forEach(requirement => {
            const text_gen1 = document.createElement('h4');
            text_gen1.classList.add('card-info-text');
            text_gen1.textContent = '[' + requirement.quantity + '] ' + requirement.name;
            text_gen1.style.color = 'green';
            if (userData.getResource(requirement.name).quantity < requirement.quantity) {
                text_gen1.style.color = 'red';
            }
            cardInfo.appendChild(text_gen1);
        })
    }

    function hasRecipeRequirements(recipe) {
        let doThing = true;

        recipe.requirements.forEach(requirement => {
            userData.getResources().forEach(resource => {
                if (requirement.name == resource.name) {
                    if (resource.quantity >= requirement.quantity) {
                        
                    }else{
                        doThing = false;
                    }
                }
            })
        })

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

    function craftRecipe(recipe, circle, h2) {
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
                    userData.getResource(requirement.name).quantity -= requirement.quantity;
                })
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
