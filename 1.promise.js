const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    const resolve = (value) => {
      if (this.state === PENDING) {
          this.value = value;
        this.state = FULFILLED;
      }
    };
    const reject = (reason) => {
      if (this.state === PENDING) {
          this.reason = reason;
        this.state = REJECTED;
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
        reject(e)
    }
  }

  then(onFulfilled,onRejected) {
    if(this.state === FULFILLED) {
        onFulfilled(this.value)
    }
    if(this.state === REJECTED) {
        onRejected(this.reason)
    }
  }
}

let promise = new Promise((resolve, reject) => {
    resolve('123')
    throw new Error('faile')
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
