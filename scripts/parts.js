import { Part } from './part.js';

const metal_short_blade = new Part(
    'Metal Blade',
    'A Metal Blade',
    [ 'metal', 'blade' ],
    [
        { part: null, typeMatch: false, types: [ 'hilt' ] } // turn this into a class
    ]
);

const metal_hilt = new Part(
    'Metal Hilt',
    'A Metal Hilt',
    [ 'metal', 'hilt' ],
    [
        { part: null, typeMatch: false, types: [ 'blade' ] },
        { part: null, typeMatch: false, types: [ 'handle' ] }
    ]
);

const wooden_handle = new Part(
    'Wooden Handle',
    'A Wooden Handle',
    [ 'wooden', 'handle' ],
    [
        { part: null, typeMatch: false, types: [ 'hilt' ] },
        { part: null, typeMatch: false, types: [ 'pommel' ] }
    ]
);

const metal_pommel = new Part(
    'Metal Pommel',
    'A Metal Pommel',
    [ 'metal', 'pommel' ],
    [
        { part: null, typeMatch: false, types: [ 'handle' ] }
    ]
);