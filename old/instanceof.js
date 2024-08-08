// function customInstanceof(obj,constructorFunc) {
//     if(obj === null && typeof obj !== 'object') {
//         return false
//     }
//     if(typeof constructorFunc !== 'function') {
//         throw new Error('abc')
//     }
//     const prototypeOfConstructor = constructorFunc.prototype;
//     let currentPrototype = Object.getPrototypeOf(obj);
//     while(currentPrototype !== null) {
//         if(currentPrototype === prototypeOfConstructor) {
//             return true
//         }
//         currentPrototype = Object.getPrototypeOf(currentPrototype)
//     }
//     return false
// }

function customInstanceof(obj, constructorFunc) {
    // 判断 constructorFunc 是否为函数
    if (typeof constructorFunc !== 'function') {
      //todo 不需要retuen
      throw new Error('Right-hand operand must be a function');
    }
  
    // 检查 obj 是否有原型链
    //todo typeof obj !== 'function'
    if (obj === null || typeof obj !== 'object' || typeof obj !== 'function') {
      return false;
    }
  
    // 获取 constructorFunc 的原型对象
    const prototypeOfConstructor = constructorFunc.prototype;
  
    // 沿着原型链查找
    //todo Object的getPrototypeOf方法
    let currentPrototype = Object.getPrototypeOf(obj);
    while (currentPrototype !== null) {
      // 如果找到了 constructorFunc 的原型对象，则 obj 是 constructorFunc 的实例
      if (currentPrototype === prototypeOfConstructor) {
        return true;
      }
      // 继续沿着原型链向上查找
      currentPrototype = Object.getPrototypeOf(currentPrototype);
    }
  
    // 如果没有找到 constructorFunc 的原型对象，则 obj 不是 constructorFunc 的实例
    return false;
  }
  
  // 使用示例
  function Person() {}
  const personObj = new Person();
  
  console.log(customInstanceof(personObj, Person)); // 输出: true
  console.log(customInstanceof(personObj, Object)); // 输出: true (因为 Object 是所有对象的基类)
  console.log(customInstanceof(personObj, Array)); // 输出: false (因为 personObj 不是数组的实例)
  