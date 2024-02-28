import { Inventory } from './inventory.js';

export class PlayerData {
  id: string;
  inventory: Inventory;
    constructor(id: string) {
      this.id = id;
      this.inventory = new Inventory();
    }
  }