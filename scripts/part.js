import { Item } from './item.js';
import * as gptParse from './gptParse.js';

export class TypeList {
    constructor(types = [], requireAll = false) {
        this.types = types;
        this.requiresAll = requireAll;
    }
}

export class Ruleset {
    constructor(whitelist = [], whiteRequiresAll = false, blacklist = [], blackRequiresAll = false) {
        this.whitelist = new TypeList(whitelist, whiteRequiresAll);
        this.blacklist = new TypeList(blacklist, blackRequiresAll);;
    }
}

export class Socket {
    constructor(part, whitelist = [], whiteRequiresAll = false, blacklist = [], blackRequiresAll = false) {
        this.part = part;
        this.rules = new Ruleset(whitelist, whiteRequiresAll, blacklist, blackRequiresAll);
    }

    canAttach(part) {
        if (this.part != null) { return false; }
        if (part.item == null) { return false; }
        if (this.rules.whitelist.requiresAll) {
            return part.types.every(type => this.rules.whitelist.includes(type));
        } else {
            return part.types.some(type => this.rules.whitelist.includes(type));
        }
        // add support for blacklisting attach types here --
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

    getSocketWithPart(part) {
        return this.sockets.find(socket => socket.part === part);
    }
    
    detachPartFromSharedItem(part) {
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

    detach(part) {
        part.getSocketWithPart(this).part = null;
        this.detachPartFromSharedItem(part);
        this.getSocketWithPart(part).part = null;
        this.detachSelfFromItemIfLonely();
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

    getFirstValidEmptySocket(part) {
        this.sockets.forEach(socket => {
            if (socket.canAttach(part)) {
                return socket;
            }
        });
    }

    attachToSocket(part, socket) {
        if (socket.canAttach(part)) {
            socket.part = part;
        }
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