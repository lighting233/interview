# 1.说说 webpack-dev-server 的原理
- https://fe.ecool.fun/topic/6e2ce014-4783-4e8d-ba0a-e655a8b687cd?orderBy=updateTime&order=desc&tagId=28

# 2.loader和plugin
Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。
Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果
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
`terser-webpack-plugin` 是一个用于压缩 JavaScript 代码的 Webpack 插件。它基于 Terser，一个流行的 JavaScript 压缩工具，可以帮助减小你的 JavaScript 文件的大小，从而提高网页加载速度。

`terser-webpack-plugin` 提供了许多配置选项，可以根据你的需求定制压缩过程。其中一些常见的功能包括：

1. 压缩代码：它使用 Terser 的压缩算法来混淆和缩小 JavaScript 代码的体积，从而减少文件大小。
2. 删除未使用的代码：它可以检测和删除未使用的变量、函数和代码块，以减少文件的冗余。
3. 代码优化：它可以对代码进行优化，例如简化变量名、删除注释和空格等，以提高代码的执行效率。
4. 保留指定的注释：你可以配置插件来保留特定的注释，例如版权声明或重要的文档说明。

通过使用 `terser-webpack-plugin`，你可以在构建过程中自动应用这些压缩和优化操作，从而生成更小、更高效的 JavaScript 文件，以提升你的网页性能。

- HotModuleReplacementPilgin
- IgnorePlugin 忽略某些特定的模块，例如不让moment的语言包打包进去

- DllPlugin
`DllPlugin` 是一个用于优化 Webpack 构建性能的插件。它可以将一些稳定且不经常变化的代码库（例如第三方库）提前编译打包成单独的动态链接库（DLL），并在后续的构建过程中复用这些 DLL，从而减少构建时间和资源消耗。

`DllPlugin` 的主要作用有以下几个方面：

1. 减少构建时间：将第三方库等稳定的代码库提前编译打包成 DLL，可以避免每次构建时都重新编译这些代码，从而大幅减少构建时间。
2. 减少资源消耗：由于 DLL 只需要编译一次，后续构建过程中可以直接复用已经编译好的 DLL 文件，减少了对系统资源（CPU、内存）的占用。
3. 提高缓存效果：DLL 文件具有稳定的文件名，可以利用浏览器缓存机制，减少用户每次访问网页时需要下载的文件数量，从而提高页面加载速度。
4. 避免重复打包：当多个项目使用相同的第三方库时，使用 DLL 可以避免重复打包相同的代码，减少了冗余的代码。

使用 `DllPlugin` 需要先创建一个 DLL 配置文件，其中指定需要打包的代码库和输出的 DLL 文件。然后在 Webpack 的配置文件中引入该 DLL 文件，并在构建过程中使用 `DllReferencePlugin` 引用 DLL，以便复用其中的代码。

总之，`DllPlugin` 可以通过提前编译打包稳定的代码库，减少构建时间和资源消耗，提高缓存效果，从而优化 Webpack 构建性能。
#添加的

- html-webpack-plugin
- htmlWebpackExtenralsPlugin 自动插入cdn脚本，按需加载，页面中没用到引用的lodash不会插入到脚本中
- InlineChunkHtemlPlugin 可以把runtime（webpack运行时代码）文件插到html里边去，节约请求数
- ModuleNotFoundPlugin 模块找不到时提供一些必要上下文信息
- DefinePulgin
- mini-css-extract-plugin 将css提取为独立文件的插件，对每个包含css的js文件都会创建一个css文件，支持按需加载
- optimize-css-assets-webpack-plugin 优化或压缩css
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

# 4.[tree shaking](https://juejin.cn/post/6993275177647751182)

# 5.[webpack-dev-server原理](https://www.cnblogs.com/longlongdan/p/12391740.html)
[webpack-dev-server原理](https://blog.csdn.net/weixin_42614080/article/details/110507675)