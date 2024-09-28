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
            return new method(...args, ...restArgs);
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

    return function (...restArgs) {
        if (new.target) {
            return new method(...args, ...restArgs);
        }
        const res = ctx[key](...args,...restArgs);
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
 * const res = obj[1][2][3] + 4;
 */

//todo 3.考察迭代器
/**
 * 使之成立
 * var [a, b] = { a: 1, b: 2 }
 * console.log(a, b) // 输出1 2
 */
