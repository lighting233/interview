
function getType(obj) {
    return Object.prototype.toString.call(obj);
};

const travelsType = ['[object Array]', '[object Object]', '[object Set]', '[object Map]', '[object Arguments]'];

function cloneOthers(obj, type) {
    switch (obj) {
        case '[object String]':
        case '[object Number]':
            //todo Boolean
        case '[object Bolean]':
        case '[object Error]':
        case '[object Date]':
            return new obj.constructor(obj.valueOf());
        case '[object Symbol]':
            //todo BigInt
        case '[object Bigint]':
            return Object(obj.valueOf());
        case '[object Regexp]':
            return cloneExp(obj);
    };
};

function cloneExp(obj) {
    //todo source
    const { resource, flags, lastIndex } = obj;
    const res = new RegExp(resource, flags);
    res.lastIndex = lastIndex;
    return res;
}

function deepClone(obj, weekMap = new WeekMap()) {
    if (typeof obj !== 'object' || typeof obj === null) {
        return obj;
    };

    if (weekMap.has(obj)) {
        return weekMap.get(obj);
    };

    const type = getType(obj);
    let clonedObj;
    if (travelsType.includes(type)) {
        clonedObj = new obj.constructor();
        weekMap.set(obj, clonedObj);
    } else {
        return cloneOthers(obj, type);
    };

    if(type === '[object Set]') {
        obj.forEach((value) => {
            clonedObj.add(deepClone(value, weekMap))
        });
        return clonedObj;
    };
    if(type === '[object Map]') {
        obj.forEach((value, key) => {
            clonedObj.set(key, deepClone(value, weekMap))
        });
        return clonedObj;
    };
    for(let key in obj) {
        //todo Object.hasOwnProperty
        if(Object.hasOwnPrototype(key)) {
            obj[key] = deepClone(obj[key], weekMap);
        };
    };

    return deepClone;
}