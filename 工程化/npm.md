# npm

## 1. npm i
1. `npm i @vue/cli-service`，`npm` 在 安装这个依赖的时候，就会`node_modules/.bin/` 目录中创建 好`vue-cli-service` 为名的几个**可执行文件**了
   1. `vue-cli-service`: `unix` 系默认的可执行文件，必须输入完整文件名
   2. `vue-cli-service.cmd`: `windows cmd` 中默认的可执行文件
   3. `vue-cli-service.ps1`: `Windows PowerShell` 中可执行文件，可以跨平台

2. 目录下的文件，表示这是一个个软链接，打开文件可以看到文件顶部写着` #!/bin/sh` ，表示这是一个脚本
3. 当使用 `npm run serve` 执行 `vue-cli-service  serve` 时，首先到 package.json中执行对应命令
    ```json
    {
        "name": "h5",
        "version": "1.0.7",
        "private": true,
        "scripts": {
            "serve": "vue-cli-service serve"
        },
    }
    ```
4. 虽然没有安装 `vue-cli-service`的全局命令，但是 npm 会到 `./node_modules/.bin` 中找到 `vue-cli-service` 文件作为脚本来执行
5. 则相当于执行了 `./node_modules/.bin/vue-cli-service serve`（最后的 serve 作为参数传入）
6. 从 `vue`的`package-lock.json` 中可知，当我们`npm i` 整个新建的`vue`项目的时候，`npm` 将 `bin/vue-cli-service.js` 作为 `bin` 声明了。
   ```json
   {
      "bin": {
        "vue-cli-service": "bin/vue-cli-service.js"
      }
   }
   ```
7. 在 `npm install` 时，`npm` 读到该配置后，就将该文件软链接到 `./node_modules/.bin` 目录下，而 `npm` 还会自动把`node_modules/.bin`加入`$PATH`，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了
8. 其实这种软连接相当于一种映射，执行`npm run xxx `的时候，就会到 `node_modules/bin`中找对应的映射文件，然后再找到相应的js文件来执行
