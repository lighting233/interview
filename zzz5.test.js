function myNew(constructor, ...args) {
    const obj = Object.create(constructor.prototype);
    const res = constructor.apply(obj, args);
    return res instanceof Object ? res : obj;
}

function myCreate(prototype) {
    function F() { };
    F.prototype = prototype;
    return new F();
}

Function.prototype.myApply = function (context, args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;
    try {
        const res = context[uniqueID](...args);
    } catch (e) {
        throw new Error(e);
    } finally {
        delete context[uniqueID];
    }
    return res;
}

Function.prototype.myCall = function (context, ...args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;
    try {
        const res = context[uniqueID](...args);
    } catch (e) {
        throw new Error(e);
    } finally {
        delete context[uniqueID];
    }
    return res;
}

Function.prototype.myBind = function (content,..args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;

    return (...innerArgs) => {
        try {
            const res = context[uniqueID](...args);
        } catch (e) {
            throw new Error(e);
        } finally {
            delete context[uniqueID];
        }
        return res;
    }
}

function extends (child, _super) {
    Object.setPrtotypeOf(child, _super);
    Function() {
        this.conctructor = child;
    }
    F.prototype = _super.prototype;
    child.prototype = new F();
}

var Student = (function (_super) {
    extends (Stunent, _super);
function Student(name) {
    var _this = _super.call(this, name) || this;
    _this.name = name;
    return _this;
}
Student.prototype.sayName = function () {
    console.log(this.name);
}
return Student;
}(Parent))


function myInstanceof(instance, conctructor) {
    if (typeof instance !== 'object' || typeof instance === 'null' || typeof instance !== 'function') {
        return false
    }
    if (typeof conctructor !== 'function') {
        throw new Error('....')
    }
    const prototypeOfConstructor = conctructor.prototype;
    let currentPrototype = Object.getPrototypeOf(instance);
    while (currentPrototype) {
        if (currentPrototype === prototypeOfConstructor) {
            return true;
        }
        currentPrototype = Object.getPrototypeOf(currentPrototype);
    }
    return false;
}

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        let context = this;
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}

function throttle(fn, delay, options) {
    let prevTimes = 0;
    let timer;
    let { leading = true, trailing = true } = options;

    return function (...args) {
        let currentTimes = Date.now();
        if (leading && currentTimes - prevTimes >= delay) {
            prevTimes = currentTimes;
            fn.apply(this, args);
        } else if (!timer) {
            timer = setTimeout(() => {
                if (trailing) {
                    prevTimes = currentTimes;
                    fn.apply(this.args);
                    timer = null;
                }
            }, delay)
        }
    }
}
