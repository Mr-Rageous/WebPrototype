import { Resource } from './resource.js';

export const fiber = new Resource('Fiber', 0, 30, 0, 10, 0, 'basic');
export const sticks = new Resource('Sticks', 0, 120, 0, 10, 0, 'basic');
export const stones = new Resource('Stones', 0, 120, 0, 10, 0, 'basic');
export const berries = new Resource('Berries', 0, 60, 0, 10, 0, 'food');
export const herbs = new Resource('Herbs', 0, 60, 0, 10, 0, 'food');
export const water = new Resource('Water', 0, 180, 0, 10, 0, 'food');

export const berryJuice = new Resource('Berry Juice', 0, 120, 0, 20, 0, 'food');
export const herbalTea = new Resource('Herbal Tea', 0, 180, 0, 20, 0, 'food');
export const stoneAxe = new Resource('Stone Axe', 0, 120, 0, 20, 0, 'basic');
export const stonePickaxe = new Resource('Stone Pickaxe', 0, 120, 0, 20, 0, 'basic');