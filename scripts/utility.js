export class WebManager {
    static createWebElement(type, classNames = [], id = '', attributes = []) {
        const procGenElement = document.createElement(type);
        if (id != '') { procGenElement.id = id; }
        if (classNames.length > 0) {
            classNames.forEach(className => {
                procGenElement.classList.add(className);
            });
        }
        if (attributes.length > 0) {
            attributes.forEach(attribute => {
                procGenElement.setAttribute(attribute.name, attribute.value);
            });
        }
        return procGenElement;
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