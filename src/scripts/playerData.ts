import { Inventory } from './inventory.js';

export class PlayerData {
    constructor(id) {
      this.id = id;
      this.recipes = [];
      this.resources = [];
      this.inventory = new Inventory();
    }

    removeFromResources(resource) {
      const index = this.resources.indexOf(resource);
      if (index !== -1) {
        this.resources.splice(index, 1);
      }
    }

    removeFromRecipes(recipe) {
      const index = this.recipes.indexOf(recipe);
      if (index !== -1) {
        this.recipes.splice(index, 1);
      }
    }
  }