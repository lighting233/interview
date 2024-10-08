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