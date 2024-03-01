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
        let thisItemArray = [];
        this.parts.forEach(part => {
            if (part.item != null && !thisItemArray.includes(part.item)) {
                thisItemArray.push(part.item);
            }
        });
        this.getUnattachedParts().forEach(part => {
            const itemWrapper = new Item([ part ], part.name, part.description)
            part.item = itemWrapper;
            thisItemArray.push(itemWrapper);
        })
        thisItemArray.sort((itemA, itemB) => itemB.parts.length - itemA.parts.length);
        return thisItemArray;
    }

    removePartFromList(part) {
      const indexParts = this.parts.indexOf(part);
      if (indexParts !== -1) {
        this.parts.splice(indexParts, 1);
      }
    }
}