## 1.说说 webpack-dev-server 的原理
- https://fe.ecool.fun/topic/6e2ce014-4783-4e8d-ba0a-e655a8b687cd?orderBy=updateTime&order=desc&tagId=28

###loader和plugin

##loader
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

##plugin

#内置

- terser-webpack-plugin
- HotModuleReplacementPilgin
- IgnorePlugin 忽略某些特定的模块，例如不让moment的语言包打包进去
- DllPlugin
#添加的

- html-webpack-plugin
- InlineChunkHtemlPlugin 可以把runtime（webpack运行时代码）文件插到html里边去，节约请求数
- ModuleNotFoundPlugin 模块找不到时提供一些必要上下文信息
- DefinePulgin
- mini-css-extract-plugin 将css提取为独立文件的插件，对每个包含css的js文件都会创建一个css文件，支持按需加载
- optimize-css-assets-webpack-plugin 优化或压缩scc
- manifestplugin 生成一个manifest资源清单文件
- SpeedMeasureWebpackPlugin 分析打包速度
- bundle-analyzer-plugin