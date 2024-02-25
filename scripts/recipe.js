export class Recipe {
    constructor(name, description, requirements) {
      this.name = name;
      this.progress = 0;
      this.description = description;
      this.requirements = requirements;
    }
  }