Function.prototype.myApply = function(context,args = []) {
    context = context || window;
    const symbolKey = Symbol();
    console.log("%c Line:5 🍖 this", "color:#ea7e5c", this);
    context[symbolKey] = this;
    
    const res = context[symbolKey](...args);
    console.log("%c Line:8 🍐 res", "color:#33a5ff", res);
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

Function.prototype.myBind = function(context,...args) {
    context = context || window;
    const uniqueID = Symbol();
    context[uniqueID] = this;

    return (...innerArgs) => {
        //todo 返回值
        const res = context[uniqueID](...args,...innerArgs);
        delete context[uniqueID]
        return res;
    }
}

function say(age) {
    console.log(this.name);
}

const a = {
    name: '123'
}
say.myApply(a,[18]);