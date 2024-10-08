
function debounce(fn, delay, immediate) {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        if (immediate && !timer) {
            fn.apply(context, args)
        }
        timer = setTimeout(() => {
            if(!immediate) {
                fn.apply(context, args);
            }
            timer = null;
        }, delay);
    }
}

function throttle(fn, delay, options = {}) {
    const { leading = false, trailing = true } = options;
    let prevTime = 0;
    let timer;

    return function (...args) {
        const context = this;
        const currentTime = Date.now();

        if (leading && currentTime - prevTime >= delay && !timer) {
            prevTime = currentTime;
            fn.apply(context, args);
        } else if (!timer && trailing) {
            timer = setTimeout(() => {
                prevTime = currentTime;
                fn.apply(context, args);
                timer = null;
            },delay)
        }
    }
}

function debounce(func, wait, immediate) {
    let timer;
    return function (...args) {
        // 保存上下文和参数，以便后面使用
        const context = this;
        // 如果满足立即调用的条件，则调用函数
        if (immediate && !timer) func.apply(context, args);
        // 清除之前的延时调用
        clearTimeout(timer);
        // 重新设置延时调用
        timer = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}


// 使用示例
const myEfficientFn = debounce(function () {
    // 需要防抖的操作
    console.log('Function debounced');
}, 250);

window.addEventListener('resize', myEfficientFn);


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