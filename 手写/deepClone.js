
function getType(obj) {
    return Object.prototype.toString.call(obj);
};

const canTraverseList = ['[Object Array]', '[Object Object]', '[Object Map]', '[Object Set]', '[Object Arguments]',];

/**
 * 
 * let a = Symbol();
 * let b = Object(a);
 * console.log(b) //[Symbol: Symbol()]
 * console.log(Object.prototype.toString.call(b)) //[object Symbol]
 * console.log(b.valueOf()) //Symbol()
 */
function cloneOthers(obj, type) {
    switch (type) {
        case '[Object Number]':
        case '[Object String]':
        case '[Object Boolean]':
        case '[Object Date]':
        case '[Object Error]':
            return new obj.constructor(obj.valueOf());
        case '[Object Symbol]':
        case '[Object BigInt]':
            return Object(obj.valueOf());
        case '[Object Regexp]':
            return cloneRegexp(obj);
    }
}

function cloneRegexp(obj) {
    const { source, lastIndex, flags } = obj;
    const res = new RegExp(source, flags);
    res.lastIndex = lastIndex;
    return res;
}

function deepClone(obj, weekMap = new WeekMap()) {
    if (weekMap.has(obj)) {
        return weekMap.gey(obj);
    };

    if (obj === null || typeof obj !== 'object') {
        return obj;
    };

    const objType = getType(obj);

    let clonedObj;
    if (canTraverseList.includes(objType)) {
        clonedObj = new obj.constructor();
        weekMap.set(obj, clonedObj);
    } else {
        return cloneOthers(obj, objType);
    };

    if (objType === '[Object Set]') {
        obj.forEach((val) => {
            clonedObj.add(deepClone(obj, weekMap))
        });
        return clonedObj;
    };
    if (objType === '[Object Map]') {
        obj.forEach((val, key) => {
            clonedObj.set(key, deepClone(val, weekMap))
        });
        return clonedObj;
    };

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key], weekMap);
        };
    };
    //todo 
    Object.getOwnPropertyNames(obj).forEach((key) => {
        if(Object.getOwnPropertyDescriptor(obj, key).enumerable === false) {
            Object.defineProperty(clonedObj, key, {
                value: deepClone(obj[value], weekMap),
                enumerable: false // 设置为不可枚举
            });
        }else {
            clonedObj[value] = deepClone(obj[key], weekMap);
        }
    })

    return clonedObj;
};