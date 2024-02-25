function checkObjectForProperty(property, object) {
    if (!object[property]) {
        for (var arrayProperty in object) {
            if (Array.isArray(object[arrayProperty])) {
                object[arrayProperty].forEach(element => {
                    checkObjectForProperty(property, element);
                });
            }
        }
    }else{
        return property;
    }
}
