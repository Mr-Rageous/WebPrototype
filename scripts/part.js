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
        const socketOfPartName = this.sockets.find(socket => socket.part.name.toLowerCase() === partName.toLowerCase());
        if (!socketOfPartName) return;
        
        const reflectedPartSocketIndex = socketOfPartName.part.sockets.findIndex(socket => socket.part === this);
        if (reflectedPartSocketIndex !== -1) {
            socketOfPartName.part.sockets[reflectedPartSocketIndex].part = null;
        }

        const partIndex = this.item.parts.indexOf(socketOfPartName.part);
        if (partIndex !== -1) {
            this.item.parts.splice(partIndex, 1);
        }
        
        if (this.item.parts.length < 2) {
            this.item = null;
        }
        
        socketOfPartName.Part = null;
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