export class Item {
    constructor(name, description, types = [], sockets = []) {
        this.name = name;
        this.functionDescription = description;
        this.types = types;
        this.sockets = sockets;
    }

    attach(item, socket) {
        if (this.canAttach(item)) {
            this.attachments.push(item);
            console.log(`${item.name} attached to ${this.name}.`);
        } else {
            console.log(`${item.name} cannot be attached to ${this.name}.`);
        }
    }

    detach(itemName) {
        const index = this.attachments.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (index !== -1) {
            const detachedPart = this.attachments.splice(index, 1)[0];
            console.log(`${detachedPart.name} detached from ${this.name}.`);
        } else {
            console.log(`Attachment ${itemName} not found on ${this.name}.`);
        }
    }

    canAttach(item, socket) {
        if (item.requireAllTypes) {
            return item.types.every(type => this.sockets.includes(type));
        } else {
            return item.types.some(type => this.sockets.includes(type));
        }
    }
}

const metal_short_blade = new Item(
    'Metal Blade',
    'A Metal Blade',
    [ 'metal', 'blade' ],
    [
        { types: [{ type: 'hilt' }], quantity: 1, item: null }
    ]
);

const metal_hilt = new Item(
    'Metal Hilt',
    'A Metal Hilt',
    [ 'metal', 'hilt' ],
    [
        { types: [{ type: 'blade' }], quantity: 1, item: null },
        { types: [{ type: 'handle' }], quantity: 1, item: null }
    ]
);

const wooden_handle = new Item(
    'Wooden Handle',
    'A Wooden Handle',
    [ 'wooden', 'handle' ],
    [
        { types: [{ type: 'hilt' }], quantity: 1, item: null },
        { types: [{ type: 'pommel' }], quantity: 1, item: null }
    ]
);

const metal_pommel = new Item(
    'Metal Pommel',
    'A Metal Pommel',
    [ 'metal', 'pommel' ],
    [
        { types: [{ type: 'handle' }], quantity: 1, item: null }
    ]
);

// working on sockets idea, probably gunna stick but unsure of limitations with it.
// This turns the problem into the 'strongly connected components problem', therefore solution is the infamous Dijkstra's Algorithm.