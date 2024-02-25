export class Item {
    constructor(name, description, types = [], sockets = []) {
        this.name = name;
        this.description = description;
        this.types = types;
        this.sockets = sockets;
    }

    detachFromSelf(itemName) {
        const index = this.sockets.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (index !== -1) {
            const detachedItem = this.sockets.splice(index, 1)[0];
            detachedItem.sockets.forEach(socket => {
                if (socket.item === this) {
                    socket.item = null;
                }
            });
        }
    }

    canAttachToSocket(item, socket) {
        if (socket.item != null) { return false; }
        if (socket.typeMatch) {
            return item.types.every(type => socket.types.includes(type));
        } else {
            return item.types.some(type => socket.types.includes(type));
        }
    }

    canAttachToSelf(item) {
        let thisSocket = false;
        let otherSocket = false;
        let bothSockets = false;
        this.sockets.forEach(socket => {
            if (this.canAttachToSocket(item, socket)) {
                thisSocket = true;
            }
        });
        item.sockets.forEach(socket => {
            if (item.canAttachToSocket(this, socket)) {
                otherSocket = true;
            }
        });
        if (thisSocket && otherSocket) {
            bothSockets = true;
        }
        return bothSockets;
    }

    getFirstValidEmptySocket(item) {
        this.sockets.forEach(socket => {
            if (this.canAttachToSocket(item, socket)) {
                return socket;
            }
        });
    }

    attachToSocket(item, socket) {
        if (this.canAttachToSocket(item, socket)) {
            socket.item = item;
        }
    }

    attachToSelf(item) {
        if (this.canAttachToSelf(item)) {
            this.attachToSocket(item, this.getFirstValidEmptySocket(item));
            item.attachToSocket(this, item.getFirstValidEmptySocket(this));
        }
    }
}

// working on sockets idea, probably gunna stick but unsure of limitations with it.
// This turns traversal into the 'strongly connected components problem'
// therefore the solution is the infamous Dijkstra's Algorithm.