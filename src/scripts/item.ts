import { Part } from './part.js';

export class Item {
    id: string;
    name: string;
    description: string;
    parts: Part[];

    constructor(parts: Part[], name: string = 'Nameless Item', description: string = 'A Collection of Parts') {
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.parts = parts;
    }
}

// create item when attaching parts together
// allow renaming of items in crafting interface