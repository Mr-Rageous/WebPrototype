export class WebManager {
    elements = [];

    static createDiv() {
        // do stuff
    }
}

export function checkObjectForProperty(object, property) {
    if (object[property]) { return property; }
    
    object.values().forEach(property => {
        if (Array.isArray(object[property])) {
            object[property].forEach(element => {
                checkObjectForProperty(property, element);
            });
        }
    });
}