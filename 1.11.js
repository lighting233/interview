const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REHECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, rejected) {
  //todo
  if (x === promise2) {
    return reject(thorw new TyprError(''))
  }
  if ((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
    try {
      //todo
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (value) => {
          resolvePromise(promise2, value, resolve, reject)
        }, (error) => {
          reject(error);
        })
      } else {
        resolve(x);
      }
    } catch (error) {
      reject(error);
    }
  } else {
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      //todo
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      //todo
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REHECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    //todo
    onRejected = typeof onRejected === 'function' ? onRejected : (e) => { throw e };

    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0)
      }
      if (this.state === REHECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0)
      }
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
        })
      }

    });

    return promise2;
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  catch(errorFunc) {
    return this.then(null, errorFunc)
  }

  finally(func) {
    return this.then((value) => {
      return Promise.resolve(func()).then(() => value)
    }, (error) => {
      //todo
      return Promise.resolve(func()).then(() => { throw error })
    })
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      const result = [];
      let times = 0;
      const processSucess = (idx,value) => {
        result[idx] = value;
        times++;
        if(times === promises.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        const p = promises[i];
        if (p && typeof p.then === 'function') {
          p.then((value) => {
            processSucess(i,value);
          },(error) => {
            reject(error)
          })
        } else {
          processSucess(i,p)
        }
      })
  }
}

function promiseAllWithLimit(promises,limit) {
  return new Promise((resolve,reject) => {
    const len = promises.length;
    const result = [];
    let index = 0;
    let running = 0;

    const run = () => {
      if(index >= len && running === 0) {
        resolve(result);
      }

      while(running < limit && index < len) {
        const currentIdx = index;
        index++;
        running++;

        promises[currentIdx]().then((value) => {
          result[currentIdx] = value;
        },(error) => {
          reject(error);
        }).finally(() => {
          running--;
          run();
        })
      }
    };

    run();
  })
}