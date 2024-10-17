//todo 1.手写apply,call,bind
Function.prototype.myApply = function (ctx, args = []) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        enumerable: false,
        value: this,
        configurable: true;
    });
    const res = ctx[key](...args);
    delete ctx[key];
    return res;
}
Function.prototype.myCall = function (ctx, ...args) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        enumerable: false,
        value: this,
        configurable: true;
    });
    const res = ctx[key](...args);
    delete ctx[key];
    return res;
}
Function.prototype.myBind = function (ctx, ...args) {
    const _this = this;
    return function (...restArgs) {
        if (new.target) {
            return new _this(...args, ...restArgs);
        } else {
            return _this.apply(ctx, [...args, ...restArgs])
        }
    }
}
Function.prototype.myBind2 = function (ctx, ...args) {
    const _this = this;
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        enumerable: false,
        value: this,
        configurable: true;
    })
    return function (...restArgs) {
        if (new.target) {
            return new _this(...args, ...restArgs);
        } else {
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

//todo 3.考察迭代器
/**
 * 使之成立
 * var [a, b] = { a: 1, b: 2 }
 * console.log(a, b) // 输出1 2
 */

Function.prototype[Symbol.iterator] = function() {
    return Object.values(this)[Symbol.iterator]();
};
Function.prototype[Symbol.iterator] = function* () {
    yield* Object.values(this);
};

//todo 4.考察原型和call和apply
console.log.call.call.call.call.apply((a) => a, [1, 2]);
//((a) => a).call(1,2)

//todo 5.统计字符串出现的频率

const str = 'adasaasdxcxcaadfffgggfs';

function times(str) {
   return str.split('').reduce((prev,cur) => {
    //todo
    return (prev[cur]++ || (prev[cur] = 1), prev)
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
    n: 1,
    valueOf: function() {
        return this.n++;
    }
}

//todo 7.下面的代码输出结果是什么?(考察对象属性和顺序)
const obj = {
    a: 0
};
obj['1'] = 0;
obj[++obj.a] = obj.a++;
const values = Object.values(obj);
obj[values[1]] = obj.a;
console.log(obj);//{1:1,2:2,a:2}

//todo 8.下面的代码输出结果是什么?(考察连续赋值);
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x); //undefined
console.log(b.x); //{n:2}



//todo 9.判断传入的函数是否标记了async
function isAsyncFunction(func) {
    //todo
    // return func[Symbol.toStringTag] === 'AsyncFunction';
    return func instanceof (async () => {}).constructor
}