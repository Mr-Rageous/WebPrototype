import { Item } from './item.js';

// socket class here?

export class Part {
    constructor(name, description, types = [], sockets = []) {
        this.name = name;
        this.description = description;
        this.types = types;
        this.sockets = sockets;
        this.item = null;
    }

    isInItem() {
        if (this.item == null) { return false; }
        return true;
    }

    getSocketWithPart(part) {
        return this.sockets.find(socket => socket.part === part);
    }

    getSocketReflection(part) {
        return part.getSocketWithPart(this);
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

    detachFromSelf(part) {
        this.getSocketReflection(part).part = null;
        this.detachPartFromSharedItem(part);
        this.getSocketWithPart(part).part = null;
        this.detachSelfFromItemIfLonely();
    }

    canAttachToSocket(part, socket) {
        if (socket.part != null) { return false; }
        if (part.item == null) { return false; }
        if (socket.typeMatch) {
            return part.types.every(type => socket.types.includes(type));
        } else {
            return part.types.some(type => socket.types.includes(type));
        }
    }

    canAttachToSelf(part) {
        let thisSocket = false;
        let otherSocket = false;
        let bothSockets = false;
        this.sockets.forEach(socket => {
            if (this.canAttachToSocket(part, socket)) {
                thisSocket = true;
            }
        });
        part.sockets.forEach(socket => {
            if (part.canAttachToSocket(this, socket)) {
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
            if (this.canAttachToSocket(part, socket)) {
                return socket;
            }
        });
    }

    attachToSocket(part, socket) {
        if (this.canAttachToSocket(part, socket)) {
            socket.part = part;
        }
    }

    attachToSelf(part) {
        if (this.canAttachToSelf(part)) {
            if (this.item == null) {
                const newItem = new Item([this, part]);
                this.item = newItem;
            }
            part.item = this.item;
            this.attachToSocket(part, this.getFirstValidEmptySocket(part));
            part.attachToSocket(this, part.getFirstValidEmptySocket(this));
        }
    }
}