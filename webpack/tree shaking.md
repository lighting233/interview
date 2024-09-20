# tree shaking
`tree shaking`, 通常用于移除 `javascript` 上下文中未使用的代码(dead-code)。`tree shaking`，可以有效减小最后打包文件的体积。
[你可能不知道 tree shaking](https://juejin.cn/post/6993275177647751182#heading-5)
[webpack5 中 对commonjs 的tree-shaking](https://juejin.cn/post/7146111864965955615)
[从一次前端公共库的搭建中，深入谈谈tree shaking的相关问题](https://zhuanlan.zhihu.com/p/438065895)
## 1.modules-level
`modules-level` 级别，即 `tree shaking` 功能作用于**整个模块**。如果模块**被引用但未被使用**，那么该模块不会出现在最后的打包代码中。
### 开启步骤
1. 首先，我们需要设置 `optimization.sideEffects` 的值为 `true`；
`optimization.sideEffects` 的值为 `true`，意味着 webpack 的 `tree shaking` 功能被开启。该属性在 `production` 模式下默认为 true，不需要配置。
2. 其次，我们需要将 `package.json` 文件中的 `sideEffects` 属性设置为 false，或者不做任何处理;
将 `sideEffects` 属性设置为 `false`，意味着 webpack 在使用 `tree shaking` 功能时会认为是没有副作用的，可以安全的将未使用的模块移除。如果没有 `sideEffects` 属性或者 `sideEffects` 的属性值为 true，webpack 会自己分析 `tree shaking` 有没有副作用，如果没有副作用，将移除未使用的模块。

## 2.statements-level
`statements-level` 级别，即 `tree shaking` 功能作用于模块内部的语句。如果模块内部定义的 `export` 没有被引用，或者**引用但未被使用**，那么该 export 将不会出现在最后的打包代码中。
### 开启步骤
1. 首先，我们需要将 `optimization.usedExports` 的属性值设置为 `true`(production 模式下，默认为 true)；
2. 其次，我们需要将 `optimization.minimize` 的属性值设置为 `true`(production 模式下，默认为 true)；

## 3.为什么ES6-module 是静态的？
一段 js 代码执行时，要经历如下步骤
1. 源代码通过语法分析和词法分析，生成抽象语法树(AST)和执行上下文；
2. 根据抽象语法树(AST)生成字节码；
3. 执行生成的字节码；
`ES6-module` 在第一步结束的时候，就可以知道依赖模块的 `export`

## 4.为什么说CommonJS 的导出机制是动态的？
**CommonJS 的导出机制被称为动态的**，是因为它允许在运行时决定模块导出的内容。与 **ES Module** 的静态导出不同，CommonJS 允许根据程序的逻辑在导出时执行代码，而不仅仅是在编译时静态分析确定导出内容。

### 动态导出的例子

在 **CommonJS** 中，模块通过 `module.exports` 或 `exports` 导出数据，可以根据条件或运行时的逻辑动态导出不同的内容。下面是一个简单的例子：

```js
// utils.js
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod-utils.js');
} else {
  module.exports = require('./dev-utils.js');
}
```

### 解释

- 这里的导出内容依赖于运行时的环境变量 `process.env.NODE_ENV`，这意味着 Webpack 或任何打包工具在编译时无法确定导出的到底是哪个文件。只有在执行时，代码才会根据当前的环境决定是导出 `prod-utils.js` 还是 `dev-utils.js`。
- 由于导出内容可以根据任意条件来改变（比如环境变量、函数调用、运行时状态等），Webpack 不能在编译阶段静态分析出哪些代码是未使用的，因此很难做有效的 **Tree Shaking**。

### 对比 ES Module

在 **ES Module (ESM)** 中，导出是静态的，必须在模块的顶层声明导出，编译器能够在编译时分析出所有导出的变量和函数。

```js
// utils.js (ESM)
import { prodUtils } from './prod-utils.js';
import { devUtils } from './dev-utils.js';

export const utils = process.env.NODE_ENV === 'production' ? prodUtils : devUtils;
```

在这个 **ES Module** 示例中，虽然导出的内容依赖环境变量，但导出语句是静态的，Webpack 可以提前分析出 `prodUtils` 和 `devUtils` 是否被使用，并在打包时移除未使用的部分。

### 为什么动态导出影响 Tree Shaking

Tree Shaking 是基于静态分析的，它要求编译器能够在打包时明确知道哪些导出被使用了。但对于 **CommonJS**，导出是动态的，像上面的例子，`require` 是在运行时才执行的，因此编译器无法在打包时准确判断哪些模块的内容不会被使用，从而无法移除未使用的代码。

### 动态导出可能出现的情况

1. **运行时条件判断**：根据条件导出不同的模块或内容。
2. **动态设置导出对象**：通过 `module.exports` 可以在任何时候改变导出的值。

```js
// example.js
module.exports = {
  func1: () => { console.log('Function 1'); }
};

if (someCondition) {
  module.exports.func2 = () => { console.log('Function 2'); };
}
```

在这个例子中，`func2` 是否导出取决于运行时的 `someCondition`，这使得静态分析难以确定模块的最终导出。

### 总结

CommonJS 的导出机制被称为动态的，因为它允许根据运行时的条件、环境变量、逻辑等动态确定导出内容。这种动态性使得静态分析工具（如 Webpack）难以准确分析导出的代码，从而限制了 **Tree Shaking** 的效果。

## 5.如何进行 tree shaking？
1. module 对象有两个关键属性：`dependencies` 和 `blocks`，用于存储依赖的模块
2. 分析 `ast` 时，为每一个依赖生成一个 `dependency` 对象，**静态依赖**对应的 `dependency` 对象会被添加到 `dependencies` 列表中
3. **动态依赖**对应的`dependency` 对象会被添加到`blocks` 列表中
4. 模块之间的依赖关系是通过三种类型的边来确定的:
   1. `HarmonyImportSideEffectDependency` 用来表示模块之间的引用关系
   2. `HarmonyImportSpecifierDependency` 用来表示模块被使用的 export
   3. `AsyncDependenciesBolock` 用来表示需要动态加载的模块
5. **模块依赖图**构建完成以后，接下来就是根据模块依赖图来构建 chunks
6. 确定每个模块的 `usedExports`:webpack 是依据模块依赖图中 `HarmImportSpecifierDependency` 类型的边来确定每个模块的 `usedExports`
7. 移除未使用的模块:可以通过模块之间是否同时存在 `HarmonyImportSideEffectDependency` 和 `HarmImportSpecifierDependency` 类型的边来确定。如果模块之间只有 `HarmonyImportSideEffectDependency` 类型的边，那么对应的依赖模块是可以被移除的。
8. 封装 `chunks`:预处理结束以后，webpack 接下来会将模块依赖图封装成 chunks。webpack 会遍历模块依赖图，找到模块依赖图中 `AsyncDependenciesBolock` 类型的边，然后将模块依赖图分解为各个 chunks。
9. `usedExports: false`的话，全部方法被保留，全部导出被保留；`usedExports: true` 的话，全部方法被保留，使用的导出被保留
10. `chunk` 内容构建完成以后，如果我们在配置项中设置了 `minimize` 属性为 `true`，webpack 会启用 `terser`，对构建好的内容进行压缩、混淆处理，并且删除未使用的代码。`terser` 也会将要处理的内容解析为一个 `ast` 对象,然后分析 `ast` 对象, 将模块中未使用的代码移除掉。

## 6.副作用
- 在 Webpack 中，`optimization.sideEffects` 的默认值是 `true`。这意味着 Webpack 会假定你的代码没有副作用，除非你明确地标记某些模块为有副作用。通过这种方式，Webpack 可以更有效地进行树摇优化（tree-shaking），移除未使用的代码。
- 如果你的项目中存在副作用的模块，你可以在 `package.json` 中的 `sideEffects` 字段中指定这些模块，或者将其设置为 `false`，表示所有模块都没有副作用。
- 如果我某一个文件配置了 `sideEffects` 申明该文件有副作用， 但是我又想清理其中的某个函数,`/*#__PURE__*/`这个注释的作用是告诉Webpack或Babel等构建工具，这一行代码是纯粹的，没有副作用，并且可以安全地进行tree shaking
```js
module.exports = {
  //...
  optimization: {
    usedExports: true
  },
  mode: 'production',
  sideEffects: ["./src/some-module.js"]
};
```
在上面的例子中，sideEffects数组中的./src/some-module.js文件将会被标记为具有副作用，不会被清理。

## 6.对 commonjs 的 tree shaking
如果你拿对象赋值给 exports，并且将来引入了这个对象字面量中的方法（即l），那么这个对象剩余的方法也会被打包进来；而如果你引入的是非对象字面量中的方法（即后面动态添加的方法m）时，则能正常 tree shaking。
```js
/***/ "./foo.js":
/*!****************!*\
  !*** ./foo.js ***!
  \****************/
/***/ ((module) => {

var __webpack_unused_export__;
const testCommon1 = 'abcs'

const testCommon2 = '2333'

module.exports.a = testCommon1
__webpack_unused_export__ = testCommon2


/***/ })
```
在 Webpack 5 中，**Tree Shaking** 针对 **CommonJS** 模块的支持虽然有所改进，但并不像对 **ES Module** 那样完全有效。Tree Shaking 是指在打包过程中，移除未使用的代码，从而减小最终的打包体积。因为 CommonJS 是动态的，无法在静态分析阶段确定哪些代码没有被使用，所以实现 Tree Shaking 存在一定挑战。

### Webpack 5 对 CommonJS 的 Tree Shaking 支持

1. **ESM 优先**：Webpack 5 强烈推荐使用 **ES Module**（ESM）代替 CommonJS，因为 ESM 是静态的，Webpack 能够完全静态分析未使用的导出。然而，Webpack 5 引入了一些机制，使得对 **CommonJS** 的部分 Tree Shaking 成为可能。

2. **通过 `exports` 字段进行优化**：
   Webpack 5 支持在 **package.json** 文件中使用 `exports` 字段进行模块导出的声明。使用 `exports` 可以让 Webpack 更好地理解模块的结构，从而启用对部分 **CommonJS** 的 Tree Shaking。

   - 如果模块使用 `exports` 来明确指定模块的入口，Webpack 可以通过此字段来限制导出内容，减少不必要的代码。

   ```json
   {
     "name": "my-package",
     "exports": {
       ".": "./src/index.js",
       "./submodule": "./src/submodule.js"
     }
   }
   ```

3. **标记 sideEffects**：
   在 Webpack 5 中，`package.json` 中的 `sideEffects` 字段也能够帮助 Tree Shaking，包括 CommonJS 模块。如果标记了 `sideEffects: false`，Webpack 会假设模块内部没有副作用，允许移除未使用的导出代码。

   ```json
   {
     "name": "my-package",
     "sideEffects": false
   }
   ```

4. **有限的 Tree Shaking**：
   CommonJS 的 Tree Shaking 仍然有限，因为 Webpack 无法静态分析和拆分 CommonJS 模块的所有导出。原因是 CommonJS 的导出机制是动态的，特别是通过 `module.exports` 的导出在打包时无法提前判断哪些是未使用的。

### 如何开启 CommonJS Tree Shaking
要在 Webpack 5 中对 CommonJS 进行 Tree Shaking，可以按照以下步骤进行配置：

1. **开启 `optimization.usedExports`**：
   这是 Webpack 内置的 Tree Shaking 选项，它会分析哪些导出被使用，并移除未使用的部分。对于 CommonJS，虽然它不如 ESM 的效果好，但仍然会做有限的优化。

   ```js
   module.exports = {
     optimization: {
       usedExports: true, // 启用 Tree Shaking
     },
   };
   ```

2. **确保正确配置 `sideEffects`**：
   标记你的模块或依赖是否有副作用，如果没有副作用，设置为 `false`，可以帮助 Webpack 识别哪些代码可以安全移除。

   ```json
   {
     "sideEffects": false
   }
   ```

3. **使用 `exports` 字段**：
   在 `package.json` 中定义 `exports`，有助于限制模块导出内容的使用范围，从而减少打包时引入的多余代码。

### Tree Shaking 的局限性
- **动态导出问题**：CommonJS 的 `module.exports` 可以动态导出，这意味着 Webpack 很难静态分析未使用的导出。
- **无法移除副作用代码**：如果你的 CommonJS 模块存在副作用代码，Webpack 很难安全地移除它们，除非明确标记 `sideEffects`。

### 总结
Webpack 5 对 CommonJS 的 Tree Shaking 有了一定的支持，但效果不如对 ES Module 的优化好。通过配置 `sideEffects` 和 `exports` 字段，可以帮助 Webpack 更好地识别模块的使用情况，提升 Tree Shaking 效果。如果可能，推荐使用 **ES Module** 代替 **CommonJS**，以获得更好的 Tree Shaking 结果。

## 7.webpack tree-shaking 在什么情况下会失效？
1. 使用了 sideEffects 属性：在 webpack 的配置文件中，如果设置了 sideEffects: true，则 webpack 会假设所有模块都有副作用，因此不会进行 tree-shaking。这通常用于避免某些模块被误标记为无用代码而被删除。
2. 动态导入：如果你使用了动态导入（例如使用了 import() 或 require.ensure()），webpack 无法静态分析模块的导入和导出，因此无法进行 tree-shaking。
3. 使用了副作用的代码：如果你的代码中包含有副作用的代码（例如在模块的顶级作用域中执行了一些操作），webpack 无法确定哪些代码是无用的，因此无法进行 tree-shaking。
4. 模块被动态引用或条件引用：如果模块的引用方式是动态的（例如在循环或条件语句中引用），或者通过字符串拼接来引用模块，webpack 无法确定哪些模块会被引用，因此无法进行 tree-shaking。
