import { Part, Socket } from './part.js';

const blade_part = new Part('Metal Blade', 'A Metal Blade', [ 'metal', 'blade' ]);
const blade_guardSocket = new Socket(blade_part, [ 'guard' ]);
const blade_handleSocket = new Socket(blade_part, [ 'handle' ]);
blade_part.sockets.push(blade_guardSocket);
blade_part.sockets.push(blade_handleSocket);

const guard_part = new Part('Metal Guard', 'A Metal Guard', [ 'metal', 'guard' ]);
const bladeSocket = new Socket(guard_part, [ 'blade' ]);
guard_part.sockets.push(bladeSocket);

const handle_part = new Part('Wooden Handle', 'A Wooden Handle', [ 'wooden', 'handle' ]);
const handle_bladeSocket = new Socket(handle_part, [ 'blade' ]);
const handle_pommelSocket = new Socket(handle_part, [ 'pommel' ]);
handle_part.sockets.push(handle_bladeSocket);
handle_part.sockets.push(handle_pommelSocket);

const pommel_part = new Part('Metal Pommel', 'A Metal Pommel', [ 'metal', 'pommel' ]);
const pommel_handleSocket = new Socket(pommel_part, [ 'handle' ]);
pommel_part.sockets.push(pommel_handleSocket);

export const sword_item = [ blade_part, guard_part, handle_part, pommel_part ];