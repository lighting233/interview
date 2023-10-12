const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      if(value instanceof Promise) {
        return value.then(resolve,reject)
      }
      if (this.state === PENDING) {
        this.value = value;
        this.state = FULFILLED;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason;
        this.state = REJECTED;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled !== "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected !== "function"
        ? onRejected
        : (r) => {
            throw r;
          };
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
    });
    return promise2;
  }

  catch(errorFn) {
    return this.then(null, errorFn);
  }

  // Promise.prototype.finally 无论如何都会执行，但是可以继续向下执行
  finally(cb) {
    return this.then(
      (v) => {
        return Promise.resolve(cb()).then(() => v);
      },
      (err) => {
        return Promise.resolve(cb()).then(() => {
          throw err;
        });
      }
    );
  }

  static resolve(value) {
    return new Promise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(value);
    });
  }

  // Promise.race 有一个成功或失败就采用他的结果  超时处理
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const p = promises[i];
        if (p && typeof p.then === "function") {
          p.then(resolve, reject);
        } else {
          resolve(p);
        }
      }
    });
  }

  static any(promises) {
    return new Promise((resolve, reject) => {
      let len = promises.length;
      let errors = [];
      if (len === 0) return reject("123");
      promises.forEach((p) => {
        p.then(
          (data) => {
            resolve(data);
          },
          (err) => {
            len--;
            errors.push(err);
            if (len === 0) {
              reject(errors);
            }
          }
        );
      });
    });
  }

  static allSettled(promises) {
    return new Promisee((resolve, reject) => {
      let res = [];
      let count = 0;
      const len = promises.length;
      for (let i = 0; i < len; i++) {
        Promise.resolve(promises[i]).then(
          (data) => {
            count++;
            res[i] = {
              status: "fulfilled",
              data,
            };
            if (count === len) {
              resolve(res);
            }
          },
          (reason) => {
            count++;
            res[i] = {
              status: "rejected",
              reason,
            };
            if (count === len) {
              reject(res);
            }
          }
        );
      }
    });
  }

  //实现： Promise.allSettled([p1,p2])   但是会获得所有的结果， 不会走catch方法
  //      Promise.any([p1,p2])  如果其中一个成功了 就会走成功 取出的是第一个成功的值， 都失败了 才会走失败
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let times = 0;
    const processSucess = (idx, val) => {
      result[idx] = val;
      if (++times === promises.length) {
        resolve(result);
      }
    };
    for (let i = 0; i < promises.length; i++) {
      const p = promises[i];
      if (p && typeof p.then === "function") {
        p.then(
          (v) => {
            processSucess(i, v);
          },
          (r) => {
            reject(r);
          }
        );
      } else {
        processSucess(i, p);
      }
    }
  });
};

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("faile"));
  }
  // 我可能写的promise 要和别人的promise兼容，考虑不是自己写的promise情况
  if ((typeof x === "object" && x !== null) || typeof x === "object") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (v) => {
            resolvePromise(promise2, v, resolve, reject);
          },
          (r) => {
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
}
