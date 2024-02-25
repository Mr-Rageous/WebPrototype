export class Resource {
    constructor(name, progress, progressSpeed, quantity, maxQuantity, value, type) {
      this.name = name;
      this.progress = progress;
      this.progressSpeed = progressSpeed;
      this.quantity = quantity;
      this.maxQuantity = maxQuantity;
      this.value = value;
      this.type = type;
    }
  }