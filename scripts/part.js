import { Item } from './item.js';

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

    detachFromSelf(partName) {
        const index = this.sockets.findIndex(part => part.name.toLowerCase() === partName.toLowerCase());
        if (index !== -1) {
            const detachedPart = this.sockets.splice(index, 1)[0];
            detachedPart.item = null;
            detachedPart.sockets.forEach(socket => {
                if (socket.part === this) {
                    socket.part = null;
                }
            });
        }
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
            if (this.isInItem()) {
                part.item = this.item;
            }else{
                const newItem = new Item([this, part]);
                this.item = newItem;
                this.part = newItem;
            }
            this.attachToSocket(part, this.getFirstValidEmptySocket(part));
            part.attachToSocket(this, part.getFirstValidEmptySocket(this));
        }
    }
}