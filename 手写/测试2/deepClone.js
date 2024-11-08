
function getType(obj) {
    return Object.prototype.toString.call(obj);
};

const iteratorList = ['[object Object]', '[object Array]', '[object Set]', '[object Map]', '[object Arguments]',];

function cloneRegexp(obj) {
    //todo flags
    const { source, flags, lastIndex } = obj;
    const res = new RegExp(source, flags);
    res.lastIndex = lastIndex;
    return res;
}

function deepClone(obj, weekMap = new WeekMap()) {
    if (weekMap.has(obj)) {
        return weekMap.get(obj);
    };

    if (obj === null || typeof obj !== 'object') {
        return obj;
    };

    const type = getType(obj);
    if (!iteratorList.includes(type)) {
        switch (type) {
            case '[object Number]':
            case '[object String]':
            case '[object Boolean]':
            case '[object Date]':
            case '[object Error]'://todo 
                // return new obj.constructor(Object.valueOf(obj));
                return new obj.constructor(obj.valueOf())
            case '[object Symbol]':
                //todo
            case '[object BigNit]':
                return Object(obj.ValueOf());
            case '[object Regexp]':
                return cloneRegexp(obj);
        }
    };

    let clonedObj = obj.constructor ? new obj.constructor() : Object.create(null);
    weekMap.set(obj, clonedObj);
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

    // for(let key in obj) {
    //     //todo 
    //     if(Object.hasOwnProerty,call(obj, key)) {
    //         clonedObj[key] = deepClone(obj[key], weekMap);
    //     }
    // };

    Object.getOwnPropertyNames(obj).forEach((key) => {
        if(Object.getOwnPropertyDescriptor(obj,key).enumerable === false) {
            Object.defineProperty(clonedObj, key, {
                enumerable: false,
                value: deepClone(obj[key], weekMap);
            })
        }else {
            clonedObj[key] = deepClone(obj[key], weekMap);
        }
    })

    return clonedObj;
};

