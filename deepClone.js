function deepClone(obj, weekMap = new WeekMap()) {
    if (obj == null) return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== 'object') return obj;
    if (weekMap.get(obj)) return weekMap.get(obj);
    let cloneObj = new obj.constructor;
    weekMap.set(obj, cloneObj)
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            cloneObj[key] = deepClone(obj, weekMap)
    }
    return cloneObj
}

function deepClone(obj, clonedObjects = new weekMap()) {
    // 检查是否已经拷贝过该对象，以防止循环引用
    if (clonedObjects.has(obj)) {
        return clonedObjects.get(obj);
    }
    // 处理基本数据类型和特殊类型（如 Date 和 RegExp）
    //todo 不考虑function
    if (typeof obj !== 'obj' || obj === null) {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj);
    }

    //todo **
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }

    // 处理数组
    if (Array.isArray(obj)) {
        const copyArr = [];
        // 将新数组存储在WeakMap中，以处理循环引用
        clonedObjects.set(obj, copyArr);
        for (let i = 0; i < obj.length; i++) {
            copyArr[i] = deepClone(obj[i], clonedObjects)
        }
        return copyArr;
    }
    // 处理对象
    const copyObj = new obj.constructor;//todo **
    // 将新对象存储在WeakMap中，以处理循环引用
    clonedObjects.set(obj, copyObj);
    for (const key in obj) {
        //todo hasOwnProerty
        if (obj.hasOwnProperty(key)) {
            copyObj[key] = deepClone(obj[key], clonedObjects)
        }
    }

    return copyObj;

}

function getType(obj) {
    return Object.prototype.toString.call(obj)
}

function cloneOtherType(obj, objType) {
    switch (objType) {
        case '[Object Number]':
        case '[Object String]':
        case '[Object Boolean]':
        case '[Object Error]':
        case '[Object Date]':
            return new obj.constructor(obj.valueOf())
        case '[Object Symbol]':
            return Object(obj.valueOf())
        case '[Object Regexp]':
            return cloneRegExp(obj)
    }
}

function cloneRegexp(obj) {
    const { resource, flags, lastIndex } = obj;
    const copyObj = new RegExp(resource, flags);
    copyObj.lastIndex = lastIndex;
    return copyObj;
}

const traversrTypes = [
    '[Object Array]', '[Object Object]', '[Object Set]', '[Object Map]', '[Object Arguments]'
]


function deepClone(obj, clonedObjects = new WeekMap()) {
    if (clonedObjects.has(obj)) {
        return clonedObjects.get(obj)
    }
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const objType = getType(obj);

    let copyObj;
    if (traversrTypes.includes(objType)) {
        copyObj = new obj.constructor();
        clonedObjects.set(obj, copyObj);
    } else {
        return cloneOtherType(obj, objType)
    }


    if (objType === '[Object Set]') {
        obj.forEach((val) => {
            copyObj.add(deepClone(val, clonedObjects))
        })
        return copyObj;
    }

    if (objType === '[Object Map]') {
        obj.forEach((val, key) => {
            copyObj.set(key, deepClone(val, clonedObjects))
        })
        return copyObj;
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copyObj[key] = deepClone(obj[key], clonedObjects)
        }
    }

    return copyObj;
}