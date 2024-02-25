export class Item {
    constructor(parts, name = 'Nameless Item', description = 'A Collection of Parts') {
        this.name = name;
        this.description = description;
        this.parts = parts;
    }
}

// create item when attaching parts together
// allow renaming of items in crafting interface