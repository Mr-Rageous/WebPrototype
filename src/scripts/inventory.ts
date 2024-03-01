import { Item } from './item.js';
import { Part } from './part.js';

export class Inventory {
    parts: Part[];
    locked: boolean;
    constructor(parts = [], locked = false) {
        this.parts = parts;
        this.locked = locked;
    }

    getUnattachedParts() {
        let thisArray = [];
        this.parts.forEach(part => {
            if (part.item == null) {
                thisArray.push(part);
            }
        });
        return thisArray;
    }

    getItems() {
        let thisArray = [];
        this.parts.forEach(part => {
            if (part.item != null && !thisArray.includes(part.item)) {
                thisArray.push(part.item);
            }
        });
        this.getUnattachedParts().forEach(part => {
            const itemWrapper = new Item([ part ], part.name, part.description)
            part.item = itemWrapper;
            thisArray.push(itemWrapper);
        })
        return thisArray;
    }

    removePartFromList(part) {
      const indexParts = this.parts.indexOf(part);
      if (indexParts !== -1) {
        this.parts.splice(indexParts, 1);
      }
    }
}