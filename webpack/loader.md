# 加载器（Loader）
`Webpack`本身只能处理`JavaScript`文件，通过加载器，`Webpack`可以处理其他类型的文件，如CSS、图片、字体等。加载器会在打包过程中对文件进行转换和处理。

## 1.常见的 loader
1. **less-loader**：解析 Less 文件，并将其转换为 CSS 代码。
2. **sass-loader**：解析 Sass/SCSS 文件，并将其转换为 CSS 代码。
3. **css-loader**：处理`background:(url)`和`@import`语法，让webpack能够正确的对其路径进行模块化处理
4. **style-loader**: `style-loader` 会将通过 `css-loader` 解析的 `CSS` 代码插入到 `HTML` 文档的 `<head>` 部分。
5. **postcss-loader**: 它可以与 `PostCSS` 插件一起使用，对 `CSS` 进行转换、优化和添加浏览器兼容性前缀等操作。通过配置 `postcss-loader`，你可以在构建过程中自动应用一系列 `PostCSS` 插件，例如 `autoprefixer`（用于自动添加 CSS3 前缀以实现跨浏览器兼容性）、`cssnano`（用于压缩 CSS 文件）、`postcss-preset-env`（用于使用最新的 CSS 特性而不必等待浏览器支持）等。
6. **mini-css-extract-plugin.loader**: 用`MiniCssExtractPlugin.loader`替换掉`style-loader`,把所有的css样式先收集起来,提取 CSS 代码到单独的文件，而不是内联到 JavaScript 代码中。
7. **file-loader**: 处理文件资源（如图片、字体等），将文件复制到输出目录，并返回文件路径。
8. **url-loader**: 与 `file-loader` 类似，但可以根据文件大小将文件转换为 Data URL（base64 格式）或文件路径。
9. **image-webpack-loader**: 优化图片资源，包括压缩、转换格式等操作。
10. **babel-loader**: 将 ES6+ 代码转换为 ES5 代码，以便在旧版浏览器中运行。
11. **eslint-loader**: 在构建过程中使用 ESLint 进行代码检查。
12. **html-loader**: 解析 HTML 文件中的资源引用（如 `<img src="..." />、<link href="..." />` 等），并将这些资源交给相应的加载器处理（如 `file-loader、url-loader` 等）。

## 2.手写 loader，我要在方法调用的时候， 上报调用源文件地址
要在方法调用时上报调用源文件的地址，并且希望通过 webpack 编译时来实现，你可以通过编写一个自定义的 webpack loader 来操作源代码，为特定的方法调用插入上报的代码。自定义 loader 本质上是一个函数，该函数接收源码作为输入，对源码进行处理后返回新的源码。
```js
// my-custom-loader.js
module.exports = function (source) {
  // 获取处理的文件的路径
  const filePath = this.resourcePath;

  // 定义一个正则表达式匹配特定的方法调用，比如 targetMethod()
  const methodCallRegex = /targetMethod\(\)/g;

  // 如果文件中包含 targetMethod() 的调用
  if (methodCallRegex.test(source)) {
  // 获取当前处理文件的目录
  const currentDirectory = path.dirname(this.resourcePath);    
  // 获取 reportFunction.js 所在的相对路径
  const reportFunctionPath = path.relative(currentDirectory, path.resolve(__dirname, './reportFunction'));    
  // 插入导入语句，确保路径格式是 './reportFunction' 或 '../reportFunction'，而不是 'reportFunction.js'
  const importStatement = `import { reportFunction } from '${reportFunctionPath.replace(/\\/g, '/')}';\n`;    
  // 替换匹配到的方法调用，插入上报函数调用
  const modifiedSource = source.replace(methodCallRegex, function (match) {
    // 插入 reportFunction 调用，并传入文件路径
    return `reportFunction('${filePath}'); ${match}`;
  });

  // 返回修改后的源代码
  return importStatement + modifiedSource;
};

// reportFunction.js
function reportFunction(filePath) {
  // 示例：在控制台输出文件路径
  console.log(`Method called in file: ${filePath}`);

  // 或者：发送文件路径到服务器
  /*
  fetch('https://your-server.com/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filePath: filePath }),
  });
  */
}

export default reportFunction;

//实际文件
import reportFunction from './reportFunction';

function targetMethod() {
  console.log('Executing targetMethod');
}

function someFunction() {
  // Modified by loader
  reportFunction('path/to/your/file.js'); 
  targetMethod(); // Original call
}


// webpack.config.js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // 目标文件类型
        use: [
          {
            loader: path.resolve('./my-custom-loader.js'), // 指定自定义 loader 的路径
          },
        ],
        exclude: /node_modules/, // 排除 node_modules
      },
    ],
  },
};

```

## 3.loader的方法
1. **this.callback**: 
   1. 作用: `this.callback` 用于在 `loader` 中返回处理后的结果。它可以**传递多个参数**，包括错误信息、转换后的源码、sourcemap、以及其他元数据。
   2. 用法: 当你调用 `this.callback` 时，`Webpack` 知道 `loader` 任务**已经完成**，接下来可以继续处理下一个 loader 或打包任务。
2. **this.async**: 
   1. **作用:** `this.async` 用于将 `loader` 转换为异步模式。它返回一个 `callback` 函数，你可以在异步操作完成后调用它。
   2. **用法:** 在 `loader` 中调用 `this.async()` 会使 `loader` 进入异步模式，Webpack 会等待异步操作完成后再继续。
3. **this.data**: 在 loader 的 pitch 阶段和普通阶段之间共享数据的自由对象。`pitch` 方法设置了 `data.sharedValue`。这个 pitch 方法是可选的，它在 loader 处理资源之前执行。data 对象会从 pitch 阶段传递到正常的加载阶段，从而可以在后者`this.data`中访问之前设置的共享值。
4. **this.resourcePath 和 this.resourceQuery:** 这两个属性提供了当前正在处理的资源文件的路径和查询字符串。
```js
/**
 * 
 * @param {*} source 上一个loader给我这个loader的内容或者最原始模块内容
 * @param {*} inputSourceMap 上一个loader传递过来的sourceMap
 * @param {*} data  本loader额外的数据
 */
function loader(source,inputSourceMap,data){//es6
    console.log(data.name);
    //this=loaderContext loader上下文对象
   console.log(path.basename(this.resourcePath));
   const options = {
       presets:["@babel/preset-env"],
       inputSourceMap,//上一个loader传递过来的 sourcemap
       sourceMaps:true,//告诉babel我要生成sourceMap
       filename:path.basename(this.resourcePath)
   }
   //code 转换后的代码 map sourcemap ast 抽象语法树
   let {code,map,ast} = core.transform(source,options);
   //this.callback 第4个参数 ast 和data有关系吗 没有，一点关系都没有
   return this.callback(null,code,map,ast);
}
loader.pitch = function(remainingRequest,previousRequest,data){
    //后面的loader等都可以拿到data中的值 
    //每一个loader都有一个自己的data,相互之间是完全 独立的
    data.name = 'babel-loader-pitch';
}
module.exports = loader;


module.exports = function (source) {
  // 获取异步的 callback 函数
  const callback = this.async();

  // 模拟异步操作
  setTimeout(() => {
    const result = source.replace(/targetMethod\(\)/g, 'replacementMethod()');
    
    // 调用异步 callback 完成转换
    callback(null, result);
  }, 1000);
};

/**
 * 当你需要返回多值的时候需要使用 this.callback来传递多个值
 * 只需要返回一个值,可以直接 return 
 * map 可以让我们进行代码调试 debug的时候可以看到源代码
 * ast 如果你返回了ast给webpack。webpack则直接分析 就可以，不需要自己转AST了，节约 时间
 */
```

