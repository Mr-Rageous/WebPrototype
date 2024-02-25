function checkObjectForProperty(property, object) {
    if (object[property]) { return property; }
    
    object.values().forEach(property => {
        if (Array.isArray(object[arrayProperty])) {
            object[arrayProperty].forEach(element => {
                checkObjectForProperty(property, element);
            });
        }
    })
}