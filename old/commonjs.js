// node中的代码调试
const fs = require('fs');
const path = require('path');
const vm = require('vm');
function Module(id){
    this.id = id;
    this.exports = {}
}
Module._cache = {}
Module._extensions = {
    '.js'(module){
        let script = fs.readFileSync(module.id,'utf8');
        let templateFn = `(function(exports,module,require,__dirname,__filename){${script}})`;
        let fn = vm.runInThisContext(templateFn);
        let exports = module.exports;
        let thisValue = exports; // this = module.exports = exports;
        let filename = module.id;
        let dirname = path.dirname(filename);

        // 函数的call 的作用 1.改变this指向 2.让函数指向
        fn.call(thisValue,exports,module,req,dirname,filename); // 调用了a模块 module.exports = 100;
    },
    '.json'(module){
        let script = fs.readFileSync(module.id,'utf8');
        module.exports = JSON.parse(script)
    }
}
Module._resolveFilename = function (id) {
    let filePath = path.resolve(__dirname,id)
    let isExists = fs.existsSync(filePath);
    if(isExists) return filePath;
    // 尝试添加后缀
    let keys = Object.keys(Module._extensions); // 以后Object的新出的方法 都会放到Reflect上
    
    for(let i =0; i < keys.length;i++){
       let newPath = filePath + keys[i];
       if(fs.existsSync(newPath)) return newPath
    }
    throw new Error('module not found')
}
Module.prototype.load = function (){
    let ext = path.extname(this.id); // 获取文件后缀名
    Module._extensions[ext](this);
}

function req(filename){
    filename = Module._resolveFilename(filename); // 1.创造一个绝对引用地址，方便后续读取
    let cacheModule = Module._cache[filename]
    if(cacheModule) return cacheModule.exports; // 直接将上次缓存的模块丢给你就ok了

    const module = new Module(filename); // 2.根据路径创造一个模块
    Module._cache[filename] = module; // 最终：缓存模块 根据的是文件名来缓存
    module.load(); // 就是让用户给module.exports 赋值
    return module.exports; // 默认是空对象
}
let a = req('./a.js');
a = req('./a.js');
a = req('./a.js');
console.log(a)

// 1.直接在vscode中调试 
// 2.可以在chrome中进行调试 方案调试  node --inspect-brk  执行的文件

// 作业：回去在调试一遍：
// 1.require方法 -> Module.protoype.require方法
// 2.Module._load 加载模块
// 3.Module._resolveFilename 方法就是把路径变成了绝对路径 添加后缀名 (.js .json) .node
// 4. new Module 拿到绝对路径创造一个模块  this.id  exports = {}
// 5.module.load 对模块进行加载·
// 6.根据文件后缀 Module._extensions['.js'] 去做策略加载
// 7.用的是同步读取文件
// 8.增加一个函数的壳子 并且让函数执行 让 module.exports 作为了this
// 9.用户会默认拿到module.exports的返回结果
// 最终返回的是 exports对象



UMD，即Universal Module Definition，是一种JavaScript模块定义的模式，它允许JavaScript模块在各种执行环境中被使用，包括但不限于浏览器环境和Node.js。
UMD模式通过检查JavaScript运行环境来决定使用哪种模块的导出方式，能够兼容以下几种主要的模块定义标准：
AMD（Asynchronous Module Definition）：用于浏览器环境，允许异步加载模块。
CommonJS：主要用于Node.js服务器环境下的模块加载。
Global/Window：没有模块系统可用时，模块会添加到全局变量或者浏览器的window对象上。
当你使用Webpack等构建工具并指定libraryTarget为umd时，Webpack会生成一个UMD包装器，这个包装器会尝试兼容上述所有环境。以下是一个简化的UMD模块的结构示例：
javascript
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(this, function () {
  // Your module code here. In this example, it's a simple value.
  var myModule = {
    doSomething: function () {
      console.log('Doing something...');
    }
  };

  return myModule;
}));
使用UMD打包的文件在其他项目中的引用方法取决于目标项目的模块系统：
AMD环境下，可使用Require.js之类的加载器加载UMD模块：
javascript
   require(['path/to/your/umd/module'], function(myModule) {
     myModule.doSomething();
   });
CommonJS环境下，如Node.js，可以使用require直接引入模块：
javascript
   var myModule = require('path/to/your/umd/module');
   myModule.doSomething();
在没有模块加载器的环境下（如传统的浏览器全局环境），UMD模块会将导出直接挂载到全局对象（通常是window）上：
html
   <script src="path/to/your/umd/module.js"></script>
   <script>
     window.myModule.doSomething();
   </script>
这意味着，无论在AMD, CommonJS，还是在全局变量模式下，UMD模块都可以被其他项目便捷地引用并使用。



//commonjs 导入es6
var modules = {
  //总结一下，如果原来是es module 如何变成commonjs
  //export default会变成exports.default
  //export xx exports.xx
  './src/title.js':(module,exports,require)=>{
    //不管是commonjs还是es module最后都编译成common.js,如果原来是es module的话，
    //就把exports传给r方法处理一下，exports.__esModule=true ，以后就可以通过这个属性来判断原来是不是一个es module
    require.r(exports);
    const DEFAULT_EXPORT = 'title_name';
    const age = 'title_age';
    require.d(exports,{
      default:()=>DEFAULT_EXPORT,
      age:()=>age
    });   
  }
}
require.d = (exports,definition)=>{
  for(let key in definition){
    //exports[key]=definition[key]();
    Object.defineProperty(exports,key,{enumerable:true,get:definition[key]});
  }
}