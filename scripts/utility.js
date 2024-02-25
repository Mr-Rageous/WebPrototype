function checkObjectForProperty(property, object) {
    if (object[property]) { return property; }
    
    object.values().forEach(property => {
        if (Array.isArray(object[property])) {
            object[property].forEach(element => {
                checkObjectForProperty(property, element);
            });
        }
    })
}