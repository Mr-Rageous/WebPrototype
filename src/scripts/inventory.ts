export class Inventory {
    constructor(parts = [], locked = false) {
        this.parts = parts;
        this.locked = locked;
    }

    getUnattachedParts() {
        let thisArray = [];
        this.parts.forEach(part => {
            if (part.item == null) {
                thisArray.push(part.item);
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
        return thisArray;
    }

    removePartFromList(part) {
      const indexParts = this.parts.indexOf(part);
      if (indexParts !== -1) {
        this.parts.splice(indexParts, 1);
      }
    }
}