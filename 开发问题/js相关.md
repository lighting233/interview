## **代码问题**

### 1. 项目中有lodash，深拷贝建议使用lodash的deepClone，代码中很多地方是直接使用了`JSON.parse(JSON.stringify(...))`,JSON.stringify() 会将对象序列化为 JSON 格式，而函数无法被序列化。对表单的configRules进行JSON拷贝容易造成自定义校验规则丢失。或自己手写深拷贝,供参考：
```javascript {.line-numbers}
function getType(obj) {
    return Object.prototype.toString.call(obj);
};

const canTraverseList = ['[Object Array]', '[Object Object]', '[Object Map]', '[Object Set]', '[Object Arguments]',];

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
        clonedObj = obj.constructor ? new obj.constructor() : Object.create(null);
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

    Object.getOwnPropertyNames(obj).forEach((key) => {
        if (Object.getOwnPropertyDescriptor(obj, key).enumerable === false) {
            Object.defineProperty(clonedObj, key, {
                value: deepClone(obj[value], weekMap),
                enumerable: false // 设置为不可枚举
            });
        } else {
            clonedObj[key] = deepClone(obj[key], weekMap);
        }
    })

    return clonedObj;
};
```

### 2. 项目中使用`toFixed()`四舍五入保留小数问题
    - js使用64位双精度浮点数存储
    - 常用的库：Decimal.js，Big.js（功能更少，更轻量），Math.js
```javascript
function roundToDecimalPlaces(number, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((number + Number.EPSILON) * factor) / factor;
}
```