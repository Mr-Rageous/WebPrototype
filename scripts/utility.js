class WebManager {
    elements = [];

    static createDiv(type, className) {
        // do stuff

        this.elements.push(element)
    }
}

function checkObjectForProperty(object, property) {
    if (object[property]) { return property; }
    
    object.values().forEach(property => {
        if (Array.isArray(object[property])) {
            object[property].forEach(element => {
                checkObjectForProperty(property, element);
            });
        }
    })
}

export { WebManager, checkObjectForProperty }