import { Part, Socket } from './part.js';

const blade_part = new Part('Metal Blade', 'A Metal Blade', [ 'blade' ]);
const blade_guardSocket = new Socket(blade_part, [ 'guard' ]);
const blade_handleSocket = new Socket(blade_part, [ 'handle' ]);
blade_part.sockets.push(blade_guardSocket);
blade_part.sockets.push(blade_handleSocket);

const guard_part = new Part('Metal Guard', 'A Metal Guard', [ 'guard' ]);

const handle_part = new Part('Wooden Handle', 'A Wooden Handle', [ 'handle' ]);
const handle_pommelSocket = new Socket(handle_part, [ 'pommel' ]);
handle_part.sockets.push(handle_pommelSocket);

const pommel_part = new Part('Metal Pommel', 'A Metal Pommel', [ 'pommel' ]);

export const sword_item = [ blade_part, guard_part, handle_part, pommel_part ];