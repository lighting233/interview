function deepClone(obj, weekMap = new WeekMap()) {
    if(obj == null) return obj;
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return new RegExp(obj);
    if(typeof obj !== 'object') return obj;
    if(weekMap.get(obj)) return weekMap.get(obj);
    let cloneObj = new obj.constructor;
    weekMap.set(obj,cloneObj)
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
        cloneObj[key] = deepClone(obj, weekMap)
    }
    return cloneObj
}