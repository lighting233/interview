//todo 1.手写apply,call,bind
Function.prototype.apply = function (ctx, args = []) {//todo args要有默认值
    //todo
    // ctx = ctx || globalThis;
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        enumerable: false,
        configurable: true,
        value: this
    });
    const res = ctx[key](...args);
    delete ctx[key];
    return res;
};

Function.prototype.call = function (ctx, ...args) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const key = Symbol(temp);
    Object.defineProperty(ctx, key, {
        enumerable: false,
        configurable: true,
        value: this
    });
    const res = ctx[key](...args);
    delete ctx[key];
    return res;
};

Function.prototype.bind = function (ctx, ...args) {
    //todo
    // ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const _this = this;
    return function (...restArgs) {
        //todo
        if (new.target) {
            return new _this(...args, ...restArgs)
        }
        //todo
        return this.apply(ctx, [...args, ...restArgs]);
    }
};

Function.prototype.bind = function (ctx, ...args) {
    const _this = this;
    return function (...restArgs) {
        if (new.target) {
            return new _this(...args, ...restArgs);
        };
        ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
        const key = Symbol();
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

//todo 2.考察proxy
/**
 * 请你实现一下这个 obj 对象,使得最后的输出结果为 10 (1+2+3+4)
 * const res = obj[1][2][3] + 4;
 */
function createObj(sum = 0) {
    //todo
    return new Proxy({}, {
        //todo
        get(target, key) {
            //todo
            if (key === Symbol.toPrimitive) {
                //todo
                return (hint) {
                    switch (hint) {
                        case 'default':
                            return sum;
                    }
                }
            };
            return createObj(sum + Number(key))
        };
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
    return Object.values(this)[Symbol.iterator]();
};
//todo
Object.prototype[Symbol.iterator] = function* () {
    yield* Object.values(this);
};
//todo 4.考察原型和call和apply
console.log.call.call.call.call.apply((a) => a, [1, 2]);



//todo 5.统计字符串出现的频率

const str = 'adasaasdxcxcaadfffgggfs';

function times(str) {

};

//todo 6.?位置写什么才能输出true(考察隐式转换)
let a = '?';

console.log(
    a == 1 &&
    a == 2 &&
    a == 3
)

a =

//todo 7.下面的代码输出结果是什么?(考察对象属性和顺序)
const obj = {
    a: 0
};
obj['1'] = 0;
obj[++obj.a] = obj.a++;
const values = Object.values(obj);
obj[values[1]] = obj.a;
console.log(obj);

//todo 8.下面的代码输出结果是什么?(考察连续赋值);
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);



//todo 9.判断传入的函数是否标记了async
function isAsyncFunction(func) {


}