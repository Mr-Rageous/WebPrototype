export class WebManager {
    static createWebElement(type: string, classNames: string[] = [], id: string = '', textContent: string = '') {
        const procGenElement = document.createElement(type);
        if (id != '') { procGenElement.id = id; }
        if (classNames.length > 0) {
            classNames.forEach(className => {
                procGenElement.classList.add(className);
            });
        }
        procGenElement.textContent = textContent;
        return procGenElement;
    }
}

export function checkObjectForProperty(object: any, property: string) {
    if (object[property]) { return property; }
    
    object.values().forEach(property => {
        if (Array.isArray(object[property])) {
            object[property].forEach(element => {
                checkObjectForProperty(property, element);
            });
        }
    });
}