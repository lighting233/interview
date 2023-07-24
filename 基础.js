let a = BigInt(123)
let b = Object.prototype.toString.call(a)
console.log(b)
// console.log(typeof null == 'object')
// console.log(null instanceof Object)
console.log(typeof null !== 'object')
//Number String Boolean Null Undefined Symbol BigInt

function fn1(x) {
    return x + 1;
  }
  function fn2(x) {
    return x + 2;
  }
  function fn3(x) {
    return x + 3;
  }
  function fn4(x) {
    return x + 4;
  }

  //redux中间件
  function compose(...fn) {
    if(!fn.length) {
        return (arg) => arg
    }
    if(fn.length === 1) {
        return fn[0]
    }

    return fn.reduce((pre,cur) => {
        console.log("%c Line:159 🥒 cur", "color:#b03734", cur.toString());
        console.log("%c Line:159 🥟 pre", "color:#3f7cff", pre.toString());
      return (...args) => {
        return pre(cur(...args))
      }
    })
  }

  const composea = compose(fn4, fn3, fn2, fn1);;
  console.log("%c Line:24 🍞 a", "color:#ea7e5c", composea.toString());