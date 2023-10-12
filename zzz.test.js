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
        console.log("%c Line:159 🥒 cur", "color:#b03734", cur);
        console.log("%c Line:159 🥟 pre", "color:#3f7cff", pre);
      return (...args) => {
        return pre(cur(...args))
      }
    })
  }

  //fn4(fn3(fn2(fn1(1))))
  const a = compose(fn4, fn3, fn2, fn1);
  console.log("%c Line:24 🍞 a", "color:#ea7e5c", a);

  console.log(a(1));

  [1,2,3].reduce((pre,cur) => {
    console.log("%c Line:39 🍏 pre", "color:#ea7e5c", pre);
    console.log("%c Line:39 🍞 cur", "color:#ea7e5c", cur);

},1)

function compose(...fn) {
    if(!fn.length) {
        return (arg) => arg
    }
    if(fn.length === 1) {
        return fn[0]
    }
    return fn.reduce((pre,cur) => {
        return (...args) => {
            return pre(cur(...args))
        }
    })
}