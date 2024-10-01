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
