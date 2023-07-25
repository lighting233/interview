Function.prototype.myApply = function(context,args) {
    context = context || window;
    const symbolKey = Symbol();
    context[symbolKey] = this;
    const res = context[symbolKey](...args);
    delete context[symbolKey];
    return res;
}

Function.prototype.myCall = function(context,...args) {
    context = context || window;
    const symbolKey = Symbol();
    context[symbolKey] = this;
    const res = context[symbolKey](...args);
    delete context[symbolKey];
    return res;
}

Function.prototype.bind = function(content,...outArgs) {
    const self = this;
    return function(...innerArgs) {
        return self.apply(content,[...outArgs,...innerArgs])
    }
}