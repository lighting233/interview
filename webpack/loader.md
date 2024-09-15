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

