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
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    };
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason;
        this.state = REJECTED;
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
    if (this.state === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.state === REJECTED) {
      onRejected(this.reason);
    }
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
