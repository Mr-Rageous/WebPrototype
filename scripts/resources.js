
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- RESOURCES -----
// Initial Resources
const fiber = { name: 'Fiber', progress: 0, progressSpeed: 30, quantity: 0, maxQuantity: 10, value: 0, type: 'basic' };
const sticks = { name: 'Sticks', progress: 0, progressSpeed: 120, quantity: 0, maxQuantity: 10, value: 0, type: 'basic' };
const stones = { name: 'Stones', progress: 0, progressSpeed: 120, quantity: 0, maxQuantity: 10, value: 0, type: 'basic' };
const berries = { name: 'Berries', progress: 0, progressSpeed: 60, quantity: 0, maxQuantity: 10, value: 0, type: 'food' };
const herbs = { name: 'Herbs', progress: 0, progressSpeed: 60, quantity: 0, maxQuantity: 10, value: 0, type: 'food' };
const water = { name: 'Water', progress: 0, progressSpeed: 180, quantity: 0, maxQuantity: 10, value: 0, type: 'food' };
// Recipe Products
const berryJuice = { name: 'Berry Juice', progress: 0, progressSpeed: 120, quantity: 0, maxQuantity: 20, value: 0, type: 'food'};
const herbalTea = { name: 'Herbal Tea', progress: 0, progressSpeed: 180, quantity: 0, maxQuantity: 20, value: 0, type: 'food' };
const stoneAxe = { name: 'Stone Axe', progress: 0, progressSpeed: 120, quantity: 0, maxQuantity: 20, value: 0, type: 'basic' };
const stonePickaxe = { name: 'Stone Pickaxe', progress: 0, progressSpeed: 120, quantity: 0, maxQuantity: 20, value: 0, type: 'basic' };
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- RECIPES ------
// Recipes
const berryJuice_recipe = { 
    name: 'Berry Juice',
    quantity: 0,
    progress: 0,
    requirements: [
        { name: 'Berries', quantity: 3 },
        { name: 'Water', quantity: 1 },
    ],
    description: 'Some Berry Juice'
};
const herbalTea_recipe = {
    name: 'Herbal Tea',
    quantity: 0,
    progress: 0,
    requirements: [
        { name: 'Herbs', quantity: 2 },
        { name: 'Water', quantity: 1 }
    ],
    description: 'Some Herbal Tea'
};
const stoneAxe_recipe = {
    name: 'Stone Axe',
    quantity: 0,
    progress: 0,
    requirements: [
        { name: 'Sticks', quantity: 2 },
        { name: 'Stones', quantity: 2 },
        { name: 'Fiber', quantity: 4 }
    ],
    description: 'A Stone Axe'
};

const stonePickaxe_recipe = {
    name: 'Stone Pickaxe',
    quantity: 0,
    progress: 0,
    requirements: [
        { name: 'Sticks', quantity: 2 },
        { name: 'Stones', quantity: 4 },
        { name: 'Fiber', quantity: 6 }
    ],
    description: 'A Stone Pickaxe'
};

const allResources = [
     fiber, sticks, stones, berries, herbs, water,
     berryJuice, herbalTea, stoneAxe, stonePickaxe,
     berryJuice_recipe, herbalTea_recipe, stoneAxe_recipe, stonePickaxe_recipe
]

export { allResources }