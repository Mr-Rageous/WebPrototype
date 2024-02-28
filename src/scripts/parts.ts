import { Part, Socket } from './part.js';

const metal_blade = new Part(
    'Metal Blade',
    'A Metal Blade',
    [ 'metal', 'blade' ],
    [
        new Socket([ 'guard' ]),
        new Socket([ 'handle' ])
    ]
);

const metal_guard = new Part(
    'Metal Guard',
    'A Metal Guard',
    [ 'metal', 'guard' ],
    [
        new Socket([ 'blade' ])
    ]
);

const wooden_handle = new Part(
    'Wooden Handle',
    'A Wooden Handle',
    [ 'wooden', 'handle' ],
    [
        new Socket([ 'blade' ]),
        new Socket([ 'pommel' ])
    ]
);

const metal_pommel = new Part(
    'Metal Pommel',
    'A Metal Pommel',
    [ 'metal', 'pommel' ],
    [
        new Socket([ 'handle' ])
    ]
);

export const testSword = [ metal_blade, metal_guard, wooden_handle, metal_pommel ];