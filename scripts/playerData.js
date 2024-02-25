export class PlayerData {
    constructor(id) {
      this.id = id;
      this.stats = [];
      this.recipes = [];
      this.resources = [];
      this.inventory = [];
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

    removeFromInventory(item) {
      const index = this.inventory.indexOf(item);
      if (index !== -1) {
        this.inventory.splice(index, 1);
      }
    }

    getItemsFromInventory() {
      // make a new array
      // for each part in inventory
      // if part.item is non-null, and the array doesnt include it
      // push part.item to array
      // return array of Items
    }
  }