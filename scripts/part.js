import { Item } from './item.js';
import * as gptParse from './gptParse.js';

class TypeList {
    constructor(types = [], requiresAll = false) {
        this.types = types;
        this.requiresAll = requiresAll;
    }

    getSharedTypesWith(types) {
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
    constructor(whitelist = [], whiteRequiresAll = false, blacklist = [], blackRequiresAll = false) {
        this.whitelist = new TypeList(whitelist, whiteRequiresAll);
        this.blacklist = new TypeList(blacklist, blackRequiresAll);;
    }
}

export class Socket {
    constructor(whitelist = [], whiteRequiresAll = false, blacklist = [], blackRequiresAll = false, part = null) {
        this.part = part;
        this.rules = new Ruleset(whitelist, whiteRequiresAll, blacklist, blackRequiresAll);
    }

    getPartName() {
        if (this.part == null) { return 'Empty'; }
        return this.part.name;
    }

    canAttach(part) {
        if (this.rules.whitelist.requiresAll) {
            return part.types.every(type => this.rules.whitelist.types.includes(type));
        } else {
            return part.types.some(type => this.rules.whitelist.types.includes(type));
        }
        // add support for blacklisting attach types here using same method--
    }

    attach(part) {
        this.part = part;
    }
}

export class Part {
    constructor(name, description, types = [], sockets = []) {
        this.name = name;
        this.description = description;
        this.types = types;
        this.sockets = sockets;
        this.item = null;
    }

    // do not use - backend not implemented
    gptItemName() {
        gptParse.getItemNameFromChatGPT(this.item.parts).then((itemName) => { return itemName; });
    }

    isInItem(item = null) {
        if (item != null) {
            if (this.item === item) { return true; }
        }
        if (this.item == null) { return false; }
        return true;
    }

    getSocketWithPart(partName) {
        return this.sockets.find(socket => socket.part.name === partName);
    }
    
    detachPartFromSharedItem(part) {
        const partIndex = this.item.parts.indexOf(this.getSocketWithPart(part.name).part);
        if (partIndex !== -1) {
            return this.item.parts.splice(partIndex, 1);
        }
    }

    detachSelfFromItemIfLonely() {
        if (this.item.parts.length < 2) {
            this.item = null;
        }
    }

    detach(part) {
        if (part == null) { return; }
        part.getSocketWithPart(this.name).part = null;
        this.detachPartFromSharedItem(part); // maybe move ownership to Item
        this.getSocketWithPart(part.name).part = null;
        this.detachSelfFromItemIfLonely(); // maybe move ownership to Item
    }

    canAttach(part) {
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

    getFirstValidEmptySocket(part = null) {
        this.sockets.forEach(socket => {
            let condition = (socket.part == null);
            if (part != null) { condition = (socket.canAttach(part)); }
            if (condition) { return socket; }
        });
    }

    attachToFirstValidEmptySlot(part) {
        if (this.canAttach(part)) {
            if (this.item == null) {
                const newItem = new Item([this]);
                this.item = newItem;
            }
            part.item = this.item;
            this.item.parts.push(part);
            // this.item.name = this.gptItemName();
            this.attachToSocket(part, this.getFirstValidEmptySocket(part));
            part.attachToSocket(this, part.getFirstValidEmptySocket(this));
        }
    }
}