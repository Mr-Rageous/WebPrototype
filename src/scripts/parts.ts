import { Part, Socket, Rarity } from './part.js';

const blade_part = new Part('Blade', 'A Metal Blade', Rarity.Legendary, [ 'blade' ]);
const blade_guardSocket = new Socket(blade_part, [ 'guard' ]);
const blade_handleSocket = new Socket(blade_part, [ 'handle' ]);
blade_part.sockets.push(blade_guardSocket);
blade_part.sockets.push(blade_handleSocket);

const guard_part = new Part('Guard', 'A Metal Guard', Rarity.Rare, [ 'guard' ]);

const handle_part = new Part('Handle', 'A Wooden Handle', Rarity.Epic, [ 'handle' ]);
const handle_pommelSocket = new Socket(handle_part, [ 'pommel' ]);
handle_part.sockets.push(handle_pommelSocket);

const pommel_part = new Part('Pommel', 'A Metal Pommel', Rarity.Uncommon, [ 'pommel' ]);

export const sword_item = [ blade_part, guard_part, handle_part, pommel_part ];