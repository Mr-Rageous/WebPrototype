import { Item } from './item.js';
import * as gptParse from './gptParse.js';

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
    part: Part;
    rules: Ruleset;
    constructor(whitelist = [], whiteRequiresAll = false, blacklist = [], blackRequiresAll = false, part = null) {
        this.part = part;
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

    attach(part) {
        if (this.canAttach(part)) {
            this.part = part;
            part.sockets.find(socket => socket.canAttach(this)).part = this;
        }
    }
}

export class Part {
    name: string;
    description: string;
    types: string[];
    sockets: Socket[];
    item?: Item;

    constructor(name: string, description: string, types: string[] = [], sockets: Socket[] = []) {
        this.name = name;
        this.description = description;
        this.types = types;
        this.sockets = sockets;
        this.item = null;
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

    detachSelfFromItemIfLonely() {
        if (this.item.parts.length < 2) {
            this.item = null;
        }
    }

    detach(part: Part) {
        if (part == null) { return; }
        part.getSocketWithPart(this).part = null;
        this.detachPartFromSharedItem(part); // maybe move ownership to Item
        this.getSocketWithPart(part).part = null;
        this.detachSelfFromItemIfLonely(); // maybe move ownership to Item
    }

    canAttach(part: Part) {
        let thisSocket = false;
        let otherSocket = false;
        let bothSockets = false;
        this.sockets.forEach(socket => {
            if (socket.canAttach(part)) {
                thisSocket = true;
            }
        });
        part.sockets.forEach(socket => {
            if (socket.canAttach(this)) {
                otherSocket = true;
            }
        });
        if (thisSocket && otherSocket) {
            bothSockets = true;
        }
        return bothSockets;
    }

    getFirstValidEmptySocket(part: Part): Socket | undefined {
        return this.sockets.find(socket => socket.canAttach(part));
        // myPart.getFirstValidEmptySocket() -> First empty socket, where part = null
        // myPart.getFirstValidEmptySocket(myOtherPart -> First Socket where part = myOtherPart
    }
    

    attachToFirstValidEmptySlot(part: Part) {
        if (this.canAttach(part)) {
            if (this.item == null) {
                const newItem = new Item([this]);
                this.item = newItem;
            }
            part.item = this.item;
            this.item.parts.push(part);
            // this.item.name = this.gptItemName();
            this.getFirstValidEmptySocket(part).attach(part);
            part.getFirstValidEmptySocket(this).attach(this);
        }
    }
}