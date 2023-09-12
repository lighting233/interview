function debounce (fn,delay) {
    let timer = null;
    return function(...args) {
        if(timer) {
            clearTimeout(timer)
        }
        let _this = this
        timer = setTimeout(() => {
            fn.apply(_this,args)
        }, delay)
    }
}

function throttle(func,delay) {
    let timer = null;
    return function(...args) {
        if(!timer) {
            const _this = this;
            func.applay(_this,args);
            timer = null;
        }
    }
}