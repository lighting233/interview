//todo 1.手写apply,call,bind

//1.apply
function method(a, b) {
    console.log('method内部:', this, a, b);
    return a + b;
};
const obj = { c: 3 };
// const res = method.apply(obj, [1, 2]);
// console.log("%c Line:10 🌰 res", "color:#2eafb0", res);
// console.log(method.apply(undefined, [1, 2]));

/**
 * 传入的对象是preventExtentions, seal, freeze函数处理过的对象就没法办了，
 * 而且严格模式和非严格模式传入非对象的时候时候 call bind apply处理规则不一样。
 * 自己实现的call bind apply函数没办法知道目标函数是否是出处于严格模式之下。
 */
Function.prototype.myApply = function (ctx, args = []) {
    //0.args需要给默认值后边才能解构
    //1.this即指向method
    //2.一个对象的的方法中的this指向这个对象
    //3.随意给对象指定key可能会重名
    //4.Symbol()函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述。这主要是为了在控制台显示，或者转为字符串时，比较容易区分。
    //5.由于给ctx上添加了属性,在method方法调用时打印ctx时能够看见这个属性,所以需要处理
    //6.enumerable让这个属性不可枚举
    //7.configurable不设置的话默认值为false,不可配置的话,不能使用delete删除
    //8.ctx可能为空,根据不同环境给定初始值;
    //9.ctx是原始类型的值,需要用Object包裹转成普通对象
    //10.别忘了返回值
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);//Object 构造函数可以接受一个参数，如果这个参数是一个对象，它会返回该对象的引用；如果参数是 null 或 undefined，则返回一个空对象 {}。
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        enumerable: false,
        value: this,
        configurable: true
    });
    const res = ctx[key](...args);
    delete ctx[key];

    return res;
}
// console.log(method.myApply('233', [1, 2]));
//2.call
Function.prototype.myCall = function (ctx, ...args) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        enumerable: false,
        value: this,
        configurable: true
    });
    const res = ctx[key](...args);
    delete ctx[key];
    return res;
}
//3.bind
// const newFn = method.bind(obj, 1);
// const bindres = newFn(2);
// console.log("%c Line:18 🌰 bindres", "color:#42b983", bindres);
// console.log(new newFn(3))

Function.prototype.myBind = function (ctx, ...args) {
    //或者不写...args;
    //var args = Array.prototype.slice,call(arguments,1);
    //1.调用newFn的时候相当于调用method
    //2. this指向的就是method
    const _outerThis = this;
    return function (...restArgs) {
        //3.调用这个函数时,让originFn的this指向ctx
        //4.如果method有返回值,bindres有值
        //5.new.target:如果通过new来调用这个函数,new.target指向这个函数,否则为undefined
        if (new.target) {
            return new _outerThis(...args, ...restArgs);
        }
        return _outerThis.apply(ctx, [...args, ...restArgs]);
    }
};

Function.prototype.myBind2 = function (ctx, ...args) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        enumerable: false,
        value: this,
        configurable: true
    });
    //todo
    const _outerThis = this;
    return function (...restArgs) {
        if (new.target) {
            //todo
            return new _outerThis(...args, ...restArgs);
        }
        const res = ctx[key](...args, ...restArgs);
        delete ctx[key];

        return res;
    }
}
const newFn = method.myBind2(obj, 1);
const bindres = newFn(2);
// console.log("%c Line:101 🍞 bindres", "color:#33a5ff", bindres);
console.log(new newFn(3))
//todo 2.考察proxy
/**
 * 请你实现一下这个 obj 对象,使得最后的输出结果为 10 (1+2+3+4)
 */
const res = obj[1][2][3] + 4;
//obj执行get后递归返回一个对象
//需要一个闭包来实现key的记录累加
//隐式转化
/**
 * 对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
 */
const createObj = (sum = 0) => {
    return new Proxy({}, {
        get(target, key) {
            if (key === Symbol.toPrimitive) {
                // return (hint) => {
                //     switch (hint) {
                //         case 'default':
                //             return sum;
                //     }
                // };
                return () => sum;
            };
            return createObj(sum + Number(key))
        }
    })
};
const obj = createObj();


//todo 3.考察迭代器和生成器
/**
 * 使之成立
 * var [a, b] = { a: 1, b: 2 }
 * console.log(a, b) // 输出1 2
 */

//1.一个对象能够解构,要满足对象上有可迭代协议:即[Symbol.iterator]属性是一个没有参数的函数,并返回一个迭代器(这个函数意味着是一个生成器)
//Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
//执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
//2.迭代器(遍历器)是一个对象,并且有next()方法,调用一次next()返回一个对象{value:xxx,done: true/false}
//3.相当于如下代码
// const iterator = {a: 1, b: 2}[Symbol.iterator]();
// const a = iterator.next().value;
// const b = iterator.next().value;
Object.prototype[Symbol.iterator] = function () {
    return Object.values(this)[Symbol.iterator]();
}

//4.如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。
//5. ES6 提供了yield*表达式，作为解决办法.yield* 后面跟的是一个可迭代对象（在这个例子中是由 Object.values(this) 返回的数组）。
//yield* 会依次将可迭代对象的每个值“委托”给调用者，允许生成器函数从其他可迭代对象中获取值并返回。
Object.prototype[Symbol.iterator] = function* () {
    yield* Object.values(this);
}

//todo 4.考察原型和call和apply
console.log.call.call.call.call.apply((a) => a, [1, 2]);
//1. a.b.c.d()的调用,最后调用的是d方法
//2. console.log是一个函数;console.log.call也是一个函数,即到console.log的Function上去找call;所以最终落脚点是call.apply(xxxx)
//3. 所以等于((a) => a).call(1,2)
//4. call绑定上下文1,执行(2) => 2


//todo 5.统计字符串出现的频率

const str ='adasaasdxcxcaadfffgggfs';

function times(str) {
    return str.split('').reduce((prev,cur) => {
        //括号运算符:一次计算每个表达式,最后返回最后一个逗号后的项
        return (prev[cur]++ || (prev[cur] = 1),prev)
    }, {})
};

//todo 6.?位置写什么才能输出true
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