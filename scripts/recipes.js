import { Recipe } from './recipe.js';

export const berryJuice_recipe = new Recipe(
    'Berry Juice',
    'Some Berry Juice',
    [
        { name: 'Berries', quantity: 3 },
        { name: 'Water', quantity: 1 },
    ]
);

export const herbalTea_recipe = new Recipe(
    'Herbal Tea',
    'Some Herbal Tea',
    [
        { name: 'Herbs', quantity: 2 },
        { name: 'Water', quantity: 1 }
    ]
);

export const stoneAxe_recipe = new Recipe(
    'Stone Axe',
    'A Stone Axe',
    [
        { name: 'Sticks', quantity: 2 },
        { name: 'Stones', quantity: 2 },
        { name: 'Fiber', quantity: 4 }
    ]
);

export const stonePickaxe_recipe = new Recipe(
    'Stone Pickaxe',
    'A Stone Pickaxe',
    [
        { name: 'Sticks', quantity: 2 },
        { name: 'Stones', quantity: 4 },
        { name: 'Fiber', quantity: 6 }
    ]
);