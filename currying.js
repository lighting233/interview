function curring(fn,arr = []) {
    const len = fn.length;
    return function(...args) {
        arr = [...arr,...args];
        if(arr.length < len) {
            return curring(fn,arr)
        }else {
            return fn(...args)
        }
    }
}