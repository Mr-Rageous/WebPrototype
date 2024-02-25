
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- RESOURCES -----
// Initial Resources
export const fiber = { name: 'Fiber', progress: 0, progressSpeed: 30, quantity: 0, maxQuantity: 10, value: 0, type: 'basic' };
export const sticks = { name: 'Sticks', progress: 0, progressSpeed: 120, quantity: 0, maxQuantity: 10, value: 0, type: 'basic' };
export const stones = { name: 'Stones', progress: 0, progressSpeed: 120, quantity: 0, maxQuantity: 10, value: 0, type: 'basic' };
export const berries = { name: 'Berries', progress: 0, progressSpeed: 60, quantity: 0, maxQuantity: 10, value: 0, type: 'food' };
export const herbs = { name: 'Herbs', progress: 0, progressSpeed: 60, quantity: 0, maxQuantity: 10, value: 0, type: 'food' };
export const water = { name: 'Water', progress: 0, progressSpeed: 180, quantity: 0, maxQuantity: 10, value: 0, type: 'food' };
// Recipe Products
export const berryJuice = { name: 'Berry Juice', progress: 0, progressSpeed: 120, quantity: 0, maxQuantity: 20, value: 0, type: 'food'};
export const herbalTea = { name: 'Herbal Tea', progress: 0, progressSpeed: 180, quantity: 0, maxQuantity: 20, value: 0, type: 'food' };
export const stoneAxe = { name: 'Stone Axe', progress: 0, progressSpeed: 120, quantity: 0, maxQuantity: 20, value: 0, type: 'basic' };
export const stonePickaxe = { name: 'Stone Pickaxe', progress: 0, progressSpeed: 120, quantity: 0, maxQuantity: 20, value: 0, type: 'basic' };
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------- RECIPES ------
// Recipes
export const berryJuice_recipe = { 
    name: 'Berry Juice',
    quantity: 0,
    progress: 0,
    requirements: [
        { name: 'Berries', quantity: 3 },
        { name: 'Water', quantity: 1 },
    ],
    description: 'Some Berry Juice'
};
export const herbalTea_recipe = {
    name: 'Herbal Tea',
    quantity: 0,
    progress: 0,
    requirements: [
        { name: 'Herbs', quantity: 2 },
        { name: 'Water', quantity: 1 }
    ],
    description: 'Some Herbal Tea'
};
export const stoneAxe_recipe = {
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

export const stonePickaxe_recipe = {
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