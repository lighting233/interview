# 1.说说 webpack-dev-server 的原理
- https://fe.ecool.fun/topic/6e2ce014-4783-4e8d-ba0a-e655a8b687cd?orderBy=updateTime&order=desc&tagId=28

# 2.loader和plugin

## loader
- less-loader sass-loader
- css-loader 处理background:(url)和@import语法，让webpack能够正确的对其路径进行模块化处理
- style-loader 把css代码注入到js中，通过dom操作加载css
- postcss-loader
- babel-loader
- thread-loader
- cache-loader
- file-loader url-loader
- html-minify-loader
- image-wepack-loader

## plugin

#内置

- terser-webpack-plugin
- HotModuleReplacementPilgin
- IgnorePlugin 忽略某些特定的模块，例如不让moment的语言包打包进去
- DllPlugin
#添加的

- html-webpack-plugin
- htmlWebpackExtenralsPlugin 自动插入cdn脚本，按需加载，页面中没用到引用的lodash不会插入到脚本中
- InlineChunkHtemlPlugin 可以把runtime（webpack运行时代码）文件插到html里边去，节约请求数
- ModuleNotFoundPlugin 模块找不到时提供一些必要上下文信息
- DefinePulgin
- mini-css-extract-plugin 将css提取为独立文件的插件，对每个包含css的js文件都会创建一个css文件，支持按需加载
- optimize-css-assets-webpack-plugin 优化或压缩scc
- manifestplugin 生成一个manifest资源清单文件
- SpeedMeasureWebpackPlugin 分析打包速度
- bundle-analyzer-plugin
# 2. 在webpack的构建过程中，compiler和compilation的作用是什么?
- 在Webpack的构建过程中，`compiler` 和 `compilation` 是两个核心概念，它们分别扮演着不同的角色：

## 1. ** Compiler（编译器）**：
`compiler` 是Webpack的核心对象之一，它代表了整个Webpack的编译过程。它的作用是将Webpack配置文件和所有的配置选项解析成一个可执行的构建任务。具体而言，编译器负责以下几个主要任务：

- 从配置文件中读取配置选项。
- 初始化各种插件和加载器（loaders）。
- 注册各种钩子（hooks），这些钩子会在不同的构建阶段触发，允许插件执行自定义逻辑。
- 控制整个构建流程，包括资源文件的解析、依赖分析、模块打包等。

- compiler 在 webpack 构建之初就已经创建，并且贯穿webpack整个生命周 ( before - run - beforeCompiler - complie - make - finishMake - afterComplier - done)

只要是做webpack编译，都会先创建一个compiler

compilation是到准备编译模块时，才会创建compilation对象

是 compile - make 阶段主要使用的对象


`compiler` 是Webpack构建过程的入口点，它负责启动整个构建流程，触发各种编译事件，并最终生成输出文件。

## 2. ** Compilation（编译）**：
`compilation` 是Webpack每次构建过程中的一个实例，代表了一次完整的编译过程。每当Webpack开始新的构建时，都会创建一个新的`compilation`对象。`compilation`对象包含了当前构建过程的所有信息，包括模块、依赖关系、生成的资源等等。它的作用是：

- 跟踪模块的变化，管理模块之间的依赖关系。
- 生成最终的输出资源，如JavaScript文件、CSS文件等。
- 触发各种编译事件，供插件处理。例如，在模块成功编译后触发事件，插件可以在这些事件中执行自定义逻辑。
- 记录编译过程中的警告和错误信息。

- 总的来说，`compiler`负责整个Webpack构建的生命周期管理，而`compilation`则代表了一次具体的构建过程，包含了该构建过程中的所有信息。这两个对象一起协同工作，使Webpack能够执行高效的模块打包和资源管理。

- 为什么需要compilation

在使用watch，源代码发生改变的时候就需要重新编译模块，但是compiler可以继续使用

如果使用compiler则需要初始化注册所有plugin，但是plugin没必要重新注册

这时候就需要创建一个新的compilation对象

而只有修改新的webpack配置才需要重新运行 npm run build 来重新生成 compiler对象

https://blog.csdn.net/weixin_42614080/article/details/110507675

# 3.Babel 的原理是什么?

- Babel 的转译过程分为三个阶段，这三步具体是：
1. 解析 Parse : 将代码解析生成抽象语法树（即AST），即词法分析与语法分析的过程
2. 转换 Transform: 对于 AST 进行变换一系列的操作，Babel 接受得到 AST 并通过 `babel-traverse` 对其进行遍历，在此过程中进行添加、更新及移除等操作
3. 生成 Generate: 将变换后的 AST 再转换为 JS 代码, 使用到的模块是 `babel-generato`