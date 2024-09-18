# babel

## Babel 的转译过程分为三个阶段，这三步具体是：
1. 解析 Parse : 将代码解析生成抽象语法树（即AST），即词法分析与语法分析的过程
2. 转换 Transform: 对于 AST 进行变换一系列的操作，Babel 接受得到 AST 并通过 `babel-traverse` 对其进行遍历，在此过程中进行添加、更新及移除等操作
3. 生成 Generate: 将变换后的 AST 再转换为 JS 代码, 使用到的模块是 `babel-generato`

## @babel/preset-env
`@babel/preset-env` 是 Babel 的一个预设（preset），用于将现代 JavaScript 代码（ES6+）转译为较旧的 JavaScript 版本，以确保在不同的浏览器或运行环境中具有更好的兼容性。
```js
{
    test: /\.jsx?$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    ["@babel/preset-env",
                        // false 不对polyfill做操作，直接引入所有的polyfill 代价非常多非常大
                        /* {
                                useBuiltIns: 'usage', // 按需加载polyfill
                                // debug: true,
                                corejs: { version: 3 }, // 指定corejs的版本号 2或者3 polyfill
                                targets: { // 指定要兼容哪些浏览器
                                    chrome: '60',
                                   },
                            }, */
                    ],
                    "@babel/preset-react", // 可以转换JSX语法
                ],
                plugins: [
                    ["@babel/plugin-proposal-decorators", { legacy: true }],
                    ["@babel/plugin-proposal-class-properties", { loose: true }],
                ],
            },
        },
    ],
}
```

## @babel/plugin-transform-runtime
`@babel/plugin-transform-runtime` 是 Babel 提供的一个插件，主要用于优化代码的重复性，减少编译后代码的体积，并避免在每个文件中引入相同的辅助函数。它特别适用于处理以下几个方面：

1. **减少代码冗余**：
   - Babel 转换一些语法（例如类、解构赋值、展开运算符等）时，会插入辅助函数（helpers）来支持这些特性。如果不使用 `@babel/plugin-transform-runtime`，这些辅助函数会在每个文件中重复引入，导致输出文件变大。
   - 这个插件将这些辅助函数抽离到一个单独的模块中，所有文件共享引用，从而减少冗余。

2. **避免污染全局作用域**：
   - 如果直接引入 `polyfill`，它会修改全局对象（如 `Promise`、`Symbol`），这可能导致和其他库冲突。
   - `@babel/plugin-transform-runtime` 引入 `polyfill` 时不会污染全局作用域，它会使用 Babel Runtime 来引入这些特性。

3. **处理新的内置对象和静态方法**：
   - 支持诸如 `Promise`、`Map`、`Set` 等 ES6+ 新特性，避免重复引入 polyfill。

#### 2. 配置 `.babelrc`

在你的 Babel 配置文件（如 `.babelrc` 或 `babel.config.js`）中添加 `@babel/plugin-transform-runtime`：

```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3, // 使用 core-js 3 版本进行 polyfill
        "helpers": true, // 默认是 true，启用辅助函数的抽取
        "regenerator": true // 默认是 true，启用对生成器函数的支持
      }
    ]
  ]
}
```

##### 配置选项

- **`corejs`**: 指定 `core-js` 版本，若为 `3`，会启用 core-js 3 的 polyfill，并避免污染全局作用域。
- **`helpers`**: 默认值为 `true`，启用辅助函数的抽取，减少重复代码。
- **`regenerator`**: 默认值为 `true`，启用 `regenerator` 以支持生成器函数（`async`/`await`）。
- **`useESModules`**: 如果为 `true`，插件会使用 ES 模块语法而不是 CommonJS，有助于实现更好的 tree shaking。

### 示例

假设你有以下代码：

```javascript
async function fetchData() {
  await fetch('https://api.example.com/data');
}

const arr = [1, 2, 3];
const newArr = [...arr, 4];
```

在没有使用 `@babel/plugin-transform-runtime` 时，Babel 会在每个文件中插入辅助函数，如 `_asyncToGenerator`、`_toConsumableArray` 等：

```javascript
var _asyncToGenerator = function (fn) {
  // helper function code
};

var _toConsumableArray = function (arr) {
  // helper function code
};

function fetchData() {
  return _asyncToGenerator(function* () {
    yield fetch('https://api.example.com/data');
  })();
}

var arr = [1, 2, 3];
var newArr = [].concat(_toConsumableArray(arr), [4]);
```

使用 `@babel/plugin-transform-runtime` 后，辅助函数会被引用而不是重复定义：

```javascript
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _toConsumableArray = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function fetchData() {
  return _asyncToGenerator.default(function* () {
    yield fetch('https://api.example.com/data');
  })();
}

var arr = [1, 2, 3];
var newArr = [].concat(_toConsumableArray.default(arr), [4]);
```
