# 插件（Plugin）
插件是`Webpack`的核心功能扩展机制，可以用于解决很多构建过程中的复杂问题或实现特定的需求。插件可以用于优化打包结果、自动生成HTML文件、提取CSS文件等。

## 1.常见的插件
内置插件
1. **terser-webpack-plugin**
   1. 压缩代码：它使用 Terser 的压缩算法来混淆和缩小 JavaScript 代码的体积，从而减少文件大小。
   2. 删除未使用的代码：它可以检测和删除未使用的变量、函数和代码块，以减少文件的冗余。
   3. 代码优化：它可以对代码进行优化，例如简化变量名、删除注释和空格等，以提高代码的执行效率。
   4. 保留指定的注释：你可以配置插件来保留特定的注释，例如版权声明或重要的文档说明。
2. **DllPlugin**
   1. 减少构建时间：将第三方库等稳定的代码库提前编译打包成 DLL，可以避免每次构建时都重新编译这些代码，从而大幅减少构建时间。
   2. 减少资源消耗：由于 DLL 只需要编译一次，后续构建过程中可以直接复用已经编译好的 DLL 文件，减少了对系统资源（CPU、内存）的占用。
   3. 提高缓存效果：DLL 文件具有稳定的文件名，可以利用浏览器缓存机制，减少用户每次访问网页时需要下载的文件数量，从而提高页面加载速度。
   4. 避免重复打包：当多个项目使用相同的第三方库时，使用 DLL 可以避免重复打包相同的代码，减少了冗余的代码。
3. **HotModuleReplacementPilgin**：启用热模块更换（Hot Module Replacement），在开发过程中实现代码修改后实时更新页面，无需刷新。
4. **IgnorePlugin**：忽略特定的模块，避免将其打包到最终的输出文件中。例如不让`moment`的语言包打包进去
5. **ProvidePlugin**: 自动加载模块，使模块在使用时可以直接使用对应的全局变量，无需引入。`_: 'lodash'`
6. **DefinePulgin**: 在编译过程中创建全局常量，可以在代码中直接使用。
7. **ProgressPlugin**: 在控制台输出构建进度信息。

外部插件
1. **HtmlWebpackPlugin**：自动生成 HTML 文件，并将打包后的资源自动注入到 HTML 中。
2. **htmlWebpackExtenralsPlugin**: 自动插入cdn脚本，按需加载，页面中没用到引用的lodash不会插入到脚本中
3. **MiniCssExtractPlugin**: 用于将 CSS 文件从 JavaScript bundle 中提取出来，单独生成一个 CSS 文件。
4. **OptimizeCSSAssetsPlugin**： 压缩提取出的 CSS 文件。
5. **CleanWebpackPlugin**: 在每次构建之前清理输出目录，避免旧的文件残留。
6. **manifestplugin**： 生成一个manifest资源清单文件
7. **SpeedMeasureWebpackPlugin**： 分析打包速度
8. **webpack-bundle-analyzer**：分析打包后的文件大小，并可视化展示，方便优化打包结果。
9. **size-plugin**：监控资源体积变化，尽早发现问题

## 2.手写 plugin
```js
class ConsoleLogStatsPlugin {
  apply(compiler) {
    // 全局计数器
    let totalConsoleLogCount = 0;
    //emit 阶段是在 Webpack 准备好最终输出文件之前
    compiler.hooks.emit.tapAsync("ConsoleLogStatsPlugin", (compilation, callback) => {
      // 遍历所有编译后的模块
      compilation.modules.forEach((module) => {
        // 检查模块是否有资源路径和源代码
        if (module.resource && module._source) {
          const source = module._source.source();
          // 匹配 console.log 调用
          const consoleLogMatches = source.match(/console\.log\(/g) || [];
          const count = consoleLogMatches.length;

          // 累加到全局计数器
          totalConsoleLogCount += count;

          if (count > 0) {
            console.log(`模块 ${module.resource} 包含 ${count} 次 console.log 调用。`);
          }
        }
      });

      // 输出所有模块中的 console.log 总数
      console.log(`所有模块中总共包含 ${totalConsoleLogCount} 次 console.log 调用.`);

      // 完成插件处理
      callback();
    });
  }
}

module.exports = ConsoleLogStatsPlugin;
```

-------------

## **3.DllPlugin和splitchunks的区别?如何把一些多个页面都用到到公共组件单独提取出去**
### **DllPlugin 和 SplitChunks 的区别**

| 特性                 | **DllPlugin**                              | **SplitChunks**                           |
|----------------------|--------------------------------------------|-------------------------------------------|
| **主要功能**         | 提前编译和缓存依赖的第三方库               | 自动拆分代码，提取公共依赖                |
| **使用场景**         | 适用于大型项目中使用的稳定第三方库          | 适用于分割动态引入或共享的应用模块代码     |
| **构建优化**         | 缩短打包时间，依赖库独立打包后无需频繁重新构建 | 减少重复依赖代码，优化加载性能            |
| **实现方式**         | 使用 `webpack.DllPlugin` 和 `DllReferencePlugin` 配置 | 配置 Webpack 的 `SplitChunks` 规则        |
| **运行时加载**       | 加载预构建的 DLL 文件                      | 从打包的 chunks 中动态加载所需代码        |
| **复杂性**           | 需要额外的配置和脚本管理                   | 配置灵活，直接整合进 Webpack 的构建流程    |

---

### **具体解释**

#### 1. **DllPlugin**
- `DllPlugin` 是 Webpack 提供的一种插件，用于提前将项目依赖的第三方库打包成一个独立的 DLL 文件。
- 运行时，项目只需要引入这个 DLL 文件，而不需要重新构建这些依赖。
- **优点**：
  - 减少构建时间：尤其是在开发环境中，第三方库的构建是耗时的，通过 DLL 文件缓存，可以大幅提高构建速度。
  - 分离依赖和应用代码，便于管理。
- **缺点**：
  - 配置较复杂。
  - 适用于依赖稳定的项目，频繁修改依赖时效率会降低。

#### 2. **SplitChunks**
- `SplitChunks` 是 Webpack 内置的功能，旨在通过分离重复代码和共享模块来优化构建的输出结果。
- 通常会将多个入口文件中共享的代码（如通用组件、依赖模块）提取到单独的文件中，减少冗余加载。
- **优点**：
  - 自动化分割代码，无需手动干预。
  - 可直接在 Webpack 构建中启用。
- **缺点**：
  - 无法预编译第三方库，每次构建都需要处理依赖。

---

### **提取多个页面的公共组件**

要将多个页面都使用的公共组件单独提取到一个公共文件中，可以通过 `SplitChunks` 实现。以下是配置方法：

#### **1. 配置 Webpack 的 SplitChunks**
在 Webpack 的 `optimization` 中设置 `splitChunks`：

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all', // 分割同步和异步模块
      minSize: 30 * 1024, // 最小大小，超过这个才会分割
      maxSize: 0, // 不限制最大大小
      minChunks: 2, // 至少被引用次数
      cacheGroups: {
        default: false, // 禁用默认分割规则
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 匹配第三方库
          name: 'vendors', // 输出文件名
          chunks: 'all',
          priority: -10, // 优先级
        },
        commons: {
          name: 'commons', // 公共模块文件名
          test: /[\\/]src[\\/](components|utils)[\\/]/, // 匹配公共组件路径
          minChunks: 2, // 至少被两个入口引用
          priority: -20,
          reuseExistingChunk: true, // 如果模块已经被打包过，复用
        },
      },
    },
  },
};
```

#### **2. 使用 DllPlugin 提取第三方库**
可以结合 `DllPlugin` 将第三方库与项目代码分离：

- **步骤 1**：配置 DLL 构建
  新建 `webpack.dll.js`：

  ```javascript
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: {
      vendors: ['react', 'react-dom', 'lodash'], // 需要提取的库
    },
    output: {
      path: path.resolve(__dirname, 'dll'),
      filename: '[name].dll.js',
      library: '[name]_lib', // 全局变量名称
    },
    plugins: [
      new webpack.DllPlugin({
        name: '[name]_lib',
        path: path.resolve(__dirname, 'dll/[name].manifest.json'),
      }),
    ],
  };
  ```

  执行 `webpack --config webpack.dll.js` 生成 DLL 文件。

- **步骤 2**：在项目 Webpack 配置中引入 DLL
  在主 Webpack 配置中加入：

  ```javascript
  const webpack = require('webpack');
  const path = require('path');

  module.exports = {
    plugins: [
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname),
        manifest: require('./dll/vendors.manifest.json'),
      }),
    ],
  };
  ```

---

### **总结**
- 如果是第三方库，建议使用 `DllPlugin` 提前编译，提升构建效率。
- 如果是公共组件，建议使用 `SplitChunks` 动态提取，减少代码冗余。
- 两者可以结合使用，`DllPlugin` 处理外部依赖，`SplitChunks` 处理内部模块。