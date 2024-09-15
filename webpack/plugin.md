# 插件（Plugin）
插件是`Webpack`的核心功能扩展机制，可以用于解决很多构建过程中的复杂问题或实现特定的需求。插件可以用于优化打包结果、自动生成HTML文件、提取CSS文件等。

## 常见的插件
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
4. **IgnorePlugin**：忽略特定的模块，避免将其打包到最终的输出文件中。例如不让moment的语言包打包进去
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