class Gun {
    constructor() {
        this.parts = {
            rifle: null,
        };
    }

    addPart(part) {
        const partName = part.name.toLowerCase();
        
        // Check if the part can be attached to the gun
        if (!this.parts.hasOwnProperty(partName)) {
            console.log(`Cannot attach ${partName} to the gun.`);
            return;
        }

        // Check if the part is already attached
        if (this.parts[partName] !== null) {
            console.log(`${partName} is already attached to the gun.`);
            return;
        }

        // Additional validation for specific parts
        if (partName === 'trigger' && Object.values(this.parts).some(p => p && p.name === 'Trigger')) {
            console.log(`The gun can only have one trigger.`);
            return;
        }

        // Attach the part to the gun
        this.parts[partName] = part;
        console.log(`${partName} attached to the gun.`);
    }

    assemble() {
        let assembledGun = "Assembling gun with the following parts:\n";
        for (const partName in this.parts) {
            if (this.parts.hasOwnProperty(partName) && this.parts[partName] !== null) {
                assembledGun += `${this.parts[partName].name}: ${this.parts[partName].functionDescription}\n`;
            }
        }
        return assembledGun;
    }
}
