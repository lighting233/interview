function throttle(func,delay) {
    let timer;
    return function(...args) {
        if(!timer) {
            let context = this;
            timer = setTimeout(() => {
                func.apply(context,args);
                clearTimeout(timer)
            },delay)
        }
    }
}