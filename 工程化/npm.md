# npm
[npx](https://www.bilibili.com/video/BV1U44y1f7ZZ?spm_id_from=333.788.videopod.episodes&vd_source=78435c3cefd4783245d9d16d09d19859&p=15)
npm全局安装一个包version1.0,在局部安装了这个包的另一个版本version2.0,除了在bin目录下执行对应的命令是使用的version2.0外,在哪个目录下运行都执行version1.0的命令
想执行2.0的命令可是使用package.json下的scripts命令声明
或在主目录下执行`npx`命令
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

## npx
`npx` 是 Node.js 包管理工具 npm（Node Package Manager）的一部分，主要用于执行 Node.js 包中的命令。具体来说，`npx` 的作用包括以下几个方面：

### 1. 执行本地安装的包

`npx` 可以直接执行在项目中本地安装的 npm 包，而不需要在全局范围内安装它们。例如，在使用 `create-react-app` 时，通常你可以通过以下命令创建一个新的 React 应用：

```bash
npx create-react-app react-demo
```

在这个命令中，`npx` 会自动下载并执行 `create-react-app` 包，而不需要你先全局安装它。这意味着你可以使用最新版本的 `create-react-app`，而不必担心全局安装的版本过时。

### 2. 运行未安装的包

`npx` 还允许你运行未在本地或全局安装的 npm 包。它会自动从 npm 仓库下载并执行该包。例如，如果你想使用某个工具，但不想在全局安装它，可以直接使用 `npx`：

```bash
npx some-package
```

### 3. 版本控制

使用 `npx` 时，你可以指定要使用的包的版本。例如：

```bash
npx create-react-app@latest react-demo
```

这将确保你使用的是 `create-react-app` 的最新版本。

### 4. 清理临时文件

`npx` 在执行完命令后，会自动清理临时下载的包，这样可以节省磁盘空间。

### 总结

`npx` 是一个非常方便的工具，特别是在创建新项目或使用一次性命令时。它简化了包的管理，避免了全局安装的麻烦，并确保你使用的是最新版本的工具。使用 `npx` 可以让开发者更加高效地管理和使用 Node.js 包。

---

## 假如我全局安装了一个包,在一个局部的项目中没有安装这个包,在这个局部项目的目录下使用npx命令,那么是执行我全简装的包,还是临时下载一个包,执行后删除?
当你在一个局部项目的目录下使用 `npx` 命令时，`npx` 的行为如下：

1. **优先使用全局安装的包**：如果你已经全局安装了某个包，`npx` 会优先查找全局安装的包。如果全局包的版本符合要求，`npx` 将直接使用这个全局安装的包来执行命令。

2. **局部安装的包**：如果在当前项目中存在该包的局部安装（即在 `node_modules` 目录中），`npx` 会优先使用局部安装的包。

3. **临时下载**：如果当前目录下没有局部安装的包，并且全局也没有安装对应的包，`npx` 会从 npm 仓库临时下载该包并执行，然后在执行完成后自动删除这个临时下载的包。

### 总结

- 如果全局安装了该包，`npx` 将执行全局安装的包。
- 如果局部项目中有该包的局部安装，`npx` 将执行局部安装的包。
- 如果两者都没有，`npx` 会下载并执行该包，然后删除。

这种机制使得 `npx` 非常灵活，能够根据你的需求选择最合适的包执行，避免了不必要的全局安装。