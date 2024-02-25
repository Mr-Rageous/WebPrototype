class GunPart {
    constructor(name, functionDescription, type, attachableTypes = []) {
        this.name = name;
        this.functionDescription = functionDescription;
        this.type = type;
        this.attachableTypes = attachableTypes;
        this.attachments = [];
    }

    attach(part) {
        if (this.canAttach(part)) {
            this.attachments.push(part);
            console.log(`${part.name} attached to ${this.name}.`);
        } else {
            console.log(`${part.name} cannot be attached to ${this.name}.`);
        }
    }

    detach(partName) {
        const index = this.attachments.findIndex(part => part.name.toLowerCase() === partName.toLowerCase());
        if (index !== -1) {
            const detachedPart = this.attachments.splice(index, 1)[0];
            console.log(`${detachedPart.name} detached from ${this.name}.`);
        } else {
            console.log(`Attachment ${partName} not found on ${this.name}.`);
        }
    }

    canAttach(part) {
        return this.attachableTypes.includes(part.type);
    }
}