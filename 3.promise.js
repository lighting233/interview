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
    onFulfilled  = typeof onFulfilled !== 'function' ? onFulfilled : (v) => v;
    onRejected  = typeof onRejected !== 'function' ? onRejected : (r) => {throw r};
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
}

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError('faile'))
    }
    // 我可能写的promise 要和别人的promise兼容，考虑不是自己写的promise情况
    if((typeof x === 'object' && x !== null) || typeof x === 'object') {
        try {
            let then = x.then;
            if(typeof then === 'function') {
                then.call(x,(v) => {
                    resolvePromise(promise2, v, resolve, reject)
                },(r) => {
                    reject(r);
                })
            }else {
                resolve(x);
            }
        }catch (e) {
            reject(e);
        }
    }else {
        resolve(x);
    }
}

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("123");
  });
});

promise.then(
  (value) => {
    console.log(
      "%c 🍹 value: ",
      "font-size:20px;background-color: #4b4b4b;color:#fff;",
      value
    );
  },
  (reason) => {
    console.log(
      "%c 🍉 reason: ",
      "font-size:20px;background-color: #B03734;color:#fff;",
      reason
    );
  }
);

// 分析--------------------------------

// 1.promise的链式调用  当调用then方法后会返回一个新的promise
// 情况1： then中方法返回的是一个（普通值 不是promise）的情况, 会作为外层下一次then的成功结果
// 情况2： then中方法 执行出错 会走到外层下一次then的失败结果
// 清空3： 如果then中方法返回的是一个promise对象， 此时会根据promise的结果来处理是走成功还是失败 （传入的是成功或者失败的内容）
// 无论上一次then走是成功还是失败，只要返回的是普通值 都会执行下一次then的成功

// 总结： 如果返回一个普通值 （除了promise） 就会传递给下一个then的成功，如果返回一个失败的promise或者抛出异常，会走下一个then的失败
readFile("./a.txt", "utf8")
  .then(
    (value) => {
      return readFile(value + "1", "utf8");
    },
    (err) => {
      return new Error();
    }
  ) // promise实例已经是失败了,如果用的是同一个promise 那么失败了就不能成功
  .then(
    (data) => {
      console.log("s", data);
    },
    () => {
      console.log("fail");
    }
  );

fs.readFile("./a.txt", "utf8", function (err, data) {
  if (err) return console.log(err);
  fs.readFile("./b.txt", "utf8", (err, data) => {
    if (err) return console.log(err);
    console.log(data);
  });
});
