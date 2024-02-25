import { Item } from './item.js';

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