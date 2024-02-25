class Location {
    constructor(name, description, config) {
      this.name = name;
      this.description = description;
      this.config = config;
    }
  
    getName() {
      return this.name;
    }
  
    getDescription() {
      return this.description;
    }
  
    getConfig() {
      return this.config;
    }
  
    setName(name) {
      this.name = name;
    }
  
    setDescription(description) {
      this.description = description;
    }
  
    setConfig(config) {
      this.config = config;
    }
  }
  