function checkObjectForProperty(property, object) {
    if (object[property]) { return property; }
    
    for (var arrayProperty in object) {
        if (Array.isArray(object[arrayProperty])) {
            object[arrayProperty].forEach(element => {
                checkObjectForProperty(property, element);
            });
        }
    }
}