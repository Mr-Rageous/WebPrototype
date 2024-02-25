import { Item } from './item.js';

const metal_short_blade = new Item(
    'Metal Blade',
    'A Metal Blade',
    [ 'metal', 'blade' ],
    [
        { item: null, typeMatch: false, types: [ 'hilt' ] }
    ]
);

const metal_hilt = new Item(
    'Metal Hilt',
    'A Metal Hilt',
    [ 'metal', 'hilt' ],
    [
        { item: null, typeMatch: false, types: [ 'blade' ] },
        { item: null, typeMatch: false, types: [ 'handle' ] }
    ]
);

const wooden_handle = new Item(
    'Wooden Handle',
    'A Wooden Handle',
    [ 'wooden', 'handle' ],
    [
        { item: null, typeMatch: false, types: [ 'hilt' ] },
        { item: null, typeMatch: false, types: [ 'pommel' ] }
    ]
);

const metal_pommel = new Item(
    'Metal Pommel',
    'A Metal Pommel',
    [ 'metal', 'pommel' ],
    [
        { item: null, typeMatch: false, types: [ 'handle' ] }
    ]
);