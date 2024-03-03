import { Item } from './item.js';
import { v4 as uuidv4 } from 'uuid';

export enum Rarity {
    Zero = 'Black',
    Common = 'Gray',
    Uncommon = 'Green',
    Rare = 'Cyan',
    Epic = 'Purple',
    Legendary = 'Orange',
    Unique = 'Gold'
}

class TypeList {
    types: string[];
    requiresAll: boolean;
    constructor(types: string[] = [], requiresAll = false) {
        this.types = types;
        this.requiresAll = requiresAll;
    }

    getSharedTypesWith(types: string[]) {
        const sharedTypes = [];

        this.types.forEach(type => {
            if (types.includes(type)) {
                sharedTypes.push(type);
            }
        });
        
        return sharedTypes;
    }
}

class Ruleset {
    whitelist: TypeList;
    blacklist: TypeList;
    constructor(whitelist = [], whiteRequiresAll = false, blacklist = [], blackRequiresAll = false) {
        this.whitelist = new TypeList(whitelist, whiteRequiresAll);
        this.blacklist = new TypeList(blacklist, blackRequiresAll);
    }
}

export class Socket {
    id: string;
    part: Part;
    parent: Part;
    rules: Ruleset;
    constructor(parent: Part, whitelist = [], whiteRequiresAll = false, blacklist = [], blackRequiresAll = false, part = null) {
        this.id = generateRandomUuid();
        this.part = part;
        this.parent = parent;
        this.rules = new Ruleset(whitelist, whiteRequiresAll, blacklist, blackRequiresAll);
    }

    getPartName() {
        if (this.part == null) { return 'Empty'; }
        return this.part.name;
    }

    canAttach(part: Part) {
        if (this.rules.whitelist.requiresAll) {
            return part.types.every(type => this.rules.whitelist.types.includes(type));
        } else {
            return part.types.some(type => this.rules.whitelist.types.includes(type));
        }
        // add support for blacklisting attach types here using same method--
    }

    detach(emptyReflectedSocket: boolean = false) {
        this.part.sockets.forEach(otherSocket => {
            if (emptyReflectedSocket) {
                if (otherSocket.part === this.parent) {
                    otherSocket.part = null;
                    const otherSocketText = document.getElementById('socket-text-' + otherSocket.id);
                    otherSocketText.textContent = this.rules.whitelist.types + ' | ' + this.getPartName();
                }
            }
        });
        this.part = null;
        const thisSocketText = document.getElementById('socket-text-' + this.id);
        thisSocketText.textContent = this.rules.whitelist.types + ' | ' + this.getPartName();
    }

    attach(part: Part, fillReflectedSocket: boolean = false) {
        if (this.canAttach(part)) {
            this.part = part;
            part.item = this.parent.item;
            if (fillReflectedSocket) {
                part.sockets.find(socket => socket.canAttach(this.parent)).part = this.parent;
                const thisSocketText = document.getElementById('socket-text-' + this.id);
                thisSocketText.textContent = (this.rules.whitelist.getSharedTypesWith(part.types) + ' | ' + this.getPartName())
            }
            const thisSocketText = document.getElementById('socket-text-' + this.id);
            thisSocketText.textContent = (this.rules.whitelist.getSharedTypesWith(part.types) + ' | ' + this.getPartName())
        }
    }
}

export class Part {
    id: string;
    name: string;
    description: string;
    types: string[];
    sockets: Socket[];
    item?: Item;
    rarity: Rarity;

    constructor(name: string, description: string, rarity: Rarity, types: string[] = [], sockets: Socket[] = []) {
        this.id = generateRandomUuid();
        this.name = name;
        this.description = description;
        this.types = types;
        this.sockets = sockets;
        this.item = null;
        this.rarity = rarity;
    }

    isInItem(item: Item = null): boolean {
        if (item != null) {
            if (this.item === item) { return true; }
        }
        if (this.item == null) { return false; }
        return true;
    }

    getSocketWithPart(part: Part): Socket {
        return this.sockets.find(socket => socket.part === part);
    }
    
    detachPartFromSharedItem(part: Part) {
        const partIndex = this.item.parts.indexOf(this.getSocketWithPart(part).part);
        if (partIndex !== -1) {
            return this.item.parts.splice(partIndex, 1);
        }
    }
}

export function generateRandomUuid(): string {
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);

    // Set the version bits (bits 12-15 of the time_hi_and_version field to 0010)
    randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
    // Set the variant bits (bits 6 and 7 of the clock_seq_hi_and_reserved to 10)
    randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;

    // Convert UUID byte array to string representation
    const hex = Array.from(randomBytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');

    // Format the UUID according to the UUID standard format
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
