//todo 1.手写apply,call,bind
Function.prototype.apply = function (ctx, args = []) {//todo args要有默认值
    //todo
    // ctx = ctx || globalThis;
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        value: this,
        enumerable: false,
        configurable: true
    });

    const res = ctx[key](...args);
    delete ctx[key];
    return res;
};

Function.prototype.call = function (ctx, ...args) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        value: this,
        enumerable: false,
        configurable: true
    });

    const res = ctx[key](...args);
    delete ctx[key];
    return res;
};

Function.prototype.bind = function (ctx, ...args) {
    //todo
    // ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    //todo
    _this = this;
    // return (...restArgs) => {
    //     if(new.target) {
    //         return new this(...args, ...restArgs);
    //     }else {
    //         return this.apply(ctx, [...args, ...restArgs])
    //     }
    // }

    return function (...restArgs) {
        if (new.target) {
            return new _this(...args, ...restArgs);
        } else {
            return _this.apply(ctx, [...args, ...restArgs])
        }
    }
};

Function.prototype.bind = function (ctx, ...args) {
    //todo
    // ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    _this = this;

    return function (...restArgs) {
        if (new.target) {
            return new _this(...args, ...restArgs);
        } else {
            ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
            const key = Symbol('temp');
            Object.defineProperty(ctx, key, {
                value: _this,
                enumerable: false,
                configurable: true
            });
            const res = ctx[key](...args, ...restArgs);
            delete ctx[key];
            return res;
        }
    }
}

//todo 2.考察proxy
/**
 * 请你实现一下这个 obj 对象,使得最后的输出结果为 10 (1+2+3+4)
 * const res = obj[1][2][3] + 4;
 */
function createObj(sum = 0) {
    return new Proxy({}, {
        get(target, key) {
            if (key === Symbol.toPrimitive) {
                return function (hint) {
                    switch (hint) {
                        //todo
                        // case 'number':
                        case 'default'
                            return sum;
                    }
                }
            };
            //todo
            // return createObj(sum + Number(target[key]))
            return createObj(sum + Number(key))
        }
    })
};
const obj = createObj();
//todo 3.考察迭代器
/**
 * 使之成立
 * var [a, b] = { a: 1, b: 2 }
 * console.log(a, b) // 输出1 2
 */
Object.prototype[Symbol.iterator] = function() {
    return Object.keys(this)[Symbol.iterator]();
};

Object.prototype[Symbol.iterator] = function* () {
    //todo
    yield* Object.values(this);
};
//todo 4.考察原型和call和apply
console.log.call.call.call.call.apply((a) => a, [1, 2]);



//todo 5.统计字符串出现的频率

const str = 'adasaasdxcxcaadfffgggfs';

function times(str) {
    return str.split('').reduce((prev,cur) => {
        return ((prev[cur]++ || prev[cur] = 1), prev)
    },{})
};

//todo 6.?位置写什么才能输出true(考察隐式转换)
let a = '?';

console.log(
    a == 1 &&
    a == 2 &&
    a == 3
)

a = {
    num: 1,
    valueOf() {
        //todo
        // const val = this.num;
        // this.num++;
        // return val;
        return this.num++;
    }
}

//todo 7.下面的代码输出结果是什么?(考察对象属性和顺序)
const obj = {
    a: 0
};
obj['1'] = 0;
//{'1': 1, a: 2}
obj[++obj.a] = obj.a++;
const values = Object.values(obj);
obj[values[1]] = obj.a;
console.log(obj);
//{1:1,2:2,a:2}
//todo 8.下面的代码输出结果是什么?(考察连续赋值);
var a = { n: 1 };
var b = a;
//b = {n:1,x:{n:2}}
//a = {n:2}
a.x = a = { n: 2 };
console.log(a.x); //undefined
console.log(b.x); //{n:2}



//todo 9.判断传入的函数是否标记了async
function isAsyncFunction(func) {
    return func instanceof (async () => {}).constructor

}