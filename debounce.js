function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer)
        // let context = this
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

function throttle(func, delay) {
    let timer = null;
    return function (...args) {
        // const context = this;
        if (!timer) {
            timer = setTimeout(() => {
                func.applay(this, args);
                timer = null;
            }, delay)
        }
    }
}

function throttle(func, delay, options = {}) {
    let timer;
    let prevTime = 0;
    let { leading = true, trailing = true } = options;

    return function (...args) {
        const currentTime = Date.now();

        if (leading && currentTime - prevTime >= delay) {
            prevTime = currentTime;
            func.apply(this, args);
        } else if (!timer) {
            timer = setTimeout(() => {
                if (trailing) {
                    prevTime = currentTime;
                    func.apply(this, args);
                    timer = null;
                }
            }, delay);
        }
    };
}


function throttle(fn, delay, options = {}) {
    let oldDate = 0;
    let timer;
    const { leading, traling } = options
    return function (...args) {
        let newDate = new Date()
        if (!leading && !oldDate) { // 如果进来之后不是立即执行的话  ， 注意这个地方要标记一下是第一次执行 ， 不然每次都会走这儿
            oldDate = new Date()
        }
        clearTimeout(timer)
        let remainingTime = delay - (newDate - oldDate)
        if (remainingTime <= 0) {
            // 说明可以执行了
            fn.apply(null, args)
            oldDate = newDate;
        } else {
            if (!traling) { // 最后一次不调用的话， 那么就直接return掉
                return
            }
            timer = setTimeout(fn, delay)
        }
    }

}

function throttle(fn, delay, executeFirst = false) {
    let lastExecuted = executeFirst ? 0 : Date.now();
    return function (...args) {
        const current = Date.now();
        const times = current - lastExecuted;

        if (times >= delay) {
            lastExecuted = current;
            return func.apply(this, args);
        } else {

        }
    }
}

function throttle(fn, wait, immediate) {
    let timer = null;
    let callNow = immediate;

    return function (...args) {
        let context = this;

        if (callNow) {
            fn.apply(context, args);
            callNow = false;
        }

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, wait);
        }
    };
}