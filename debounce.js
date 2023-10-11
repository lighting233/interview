function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer)
        let context = this
        timer = setTimeout(() => {
            func.apply(context, args)
        }, delay)
    }
}

function throttle(func, delay) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                const context = this;
                func.applay(context, args);
                timer = null;
            }, delay)
        }
    }
}

function throttle(func,delay,shouldDelayFirstCall = true) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if(shouldDelayFirstCall || now - lastCall >= delay) {
            func.apply(context,args);
            lastCall = now;
        }
    }
}