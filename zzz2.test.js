
const getType = obj => {
    return Object.prototype.toString.call(obj);
}

const traverseTypes = [
    '[Object Array]', '[Object Object]', '[Object Set]', '[Object Map]', '[Object Arguments]'
]

const cloneRegexp = obj => {
    const {resource, flags, lastIndex} = obj;
    const copyObj = new RegExp(resource,flags);
    copyObj.lastIndex = lastIndex;
    return copyObj;
}

const cloneOtherTypes = (obj, objType) => {
    switch (objType) {
        case '[Object Number]':
        case '[Object String]':
        case '[Object Boolean]':
        case '[Object Date]':
        case '[Object Error]':
            return new obj.constructor(obj.valueOf());
        case '[Object Symble]':
            return Object(obj.valueOf());
        case '[Object Regexp]':
            return cloneRegexp(obj);
    }
}

function deepClone(obj, clonedObjects = new WeekMap()) {
    if (clonedObjects.has(obj)) {
        return clonedObjects.get(obj);
    };
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const objType = getType(obj)

    let copyObj;
    if (traverseTypes.includes(objType)) {
        copyObj = new obj.constructor()
    } else {
        return cloneOtherTypes(obj, objType);
    }
    clonedObjects.set(obj,copyObj);

    if(objType === '[Object Set]') {
        obj.forEach((val) => {
            copyObj.add(deepClone(val,clonedObjects))
        })
    }
    if(objType === '[Object Map]') {
        obj.forEach((val,key) => {
            copyObj.set(key, deepClone(val,clonedObjects))
        })
    }

    for(let key in obj) {
        if(obj.hasOwnProtype(key)) {
            copyObj[key] = deepClone(obj[key],clonedObjects)
        }
    }

    return copyObj;
}

Function.prototype.myApply = function(context,args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;

    const res = context[uniqueID](...args);
    delete context[uniqueID];
    return res;
}

Function.prototype.myCall = function(context,...args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;

    const res = context[uniqueID](...args);
    delete context[uniqueID];
    return res;
}

Function.prototype.myBind = function(context,...args) {
    const _this = this;

    return (...innreArgs) => {
        return _this.apply(context,[...args,...innreArgs])
    }
}

Function.prototype.myBindSelf = function(context,...args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;

    return (...innreArgs) => {
        const res = context[uniqueID](...args,...innreArgs);
        delete context[uniqueID];
        return res;
    }
}

function myInstanceof(obj,constructorFunc) {
    if(typeof constructorFunc !== 'function') {
        throw new Error('123')
    }
    if(typeof obj === null || typeof obj !== 'object' || typeof obj !== 'function') {
        return false;
    }

    const prototypeOfConstructor = constructorFunc.prototype;

    let currentPrototype = Object.getPrototypeOf(obj);

    while(currentPrototype !== null) {
        if(currentPrototype === prototypeOfConstructor) {
            return true;
        }
        currentPrototype = Object.getPrototypeOf(currentPrototype)
    }
    return false;
}