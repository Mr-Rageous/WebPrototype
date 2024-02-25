class PlayerData {
    constructor(id) {
      this.id = id;
      this.stats = [];
      this.recipes = [];
      this.resources = [];
    }
  
    // Resource methods
    addToResources(resource) {
      this.resources.push(resource);
    }

    removeFromResources(resource) {
      const index = this.resources.indexOf(resource);
      if (index !== -1) {
        this.resources.splice(index, 1);
      }
    }

    addToRecipes(recipe) {
      this.recipes.push(recipe);
    }

    removeFromRecipes(recipe) {
      const index = this.recipes.indexOf(recipe);
      if (index !== -1) {
        this.recipes.splice(index, 1);
      }
    }
  
    // Stats methods
    updateStats(newStats) {
      this.stats = { ...this.stats, ...newStats };
    }
  }

  export { PlayerData }