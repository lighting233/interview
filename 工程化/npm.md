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

## 假如我全局安装了一个包,在一个局部的项目中没有安装这个包,在这个局部项目的目录下使用npx命令,那么是执行我全局装的包,还是临时下载一个包,执行后删除?
当你在一个局部项目的目录下使用 `npx` 命令时，`npx` 的行为如下：

1. **优先使用全局安装的包**：如果你已经全局安装了某个包，`npx` 会优先查找全局安装的包。如果全局包的版本符合要求，`npx` 将直接使用这个全局安装的包来执行命令。

2. **局部安装的包**：如果在当前项目中存在该包的局部安装（即在 `node_modules` 目录中），`npx` 会优先使用局部安装的包。

3. **临时下载**：如果当前目录下没有局部安装的包，并且全局也没有安装对应的包，`npx` 会从 npm 仓库临时下载该包并执行，然后在执行完成后自动删除这个临时下载的包。

### 总结

- 如果全局安装了该包，`npx` 将执行全局安装的包。
- 如果局部项目中有该包的局部安装，`npx` 将执行局部安装的包。
- 如果两者都没有，`npx` 会下载并执行该包，然后删除。

这种机制使得 `npx` 非常灵活，能够根据你的需求选择最合适的包执行，避免了不必要的全局安装。

---

## 在前端项目中,我在一个目录下打开命令行工具执行一个命令,那么系统如何查找这个命令?
当你在命令行中执行一个命令时，系统会按照特定的步骤查找和定位这个命令的可执行文件。以下是查找流程的详细解释：

### 1. **检查内置命令**
   - 首先，系统会检查输入的命令是否是 Shell 内置命令。常见的 Shell，比如 `bash` 或 `zsh`，自带一些基本的命令，比如 `cd`、`echo` 等。如果匹配到内置命令，就会直接执行。

### 2. **查找别名和函数**
   - 接下来，Shell 会查看是否有命令别名或函数定义匹配输入的命令。在许多前端项目中，可能会设置一些别名来简化常用的命令（如将 `npm run start` 缩写为 `start`）。
   - 如果找到匹配的别名或函数定义，Shell 会执行它。

### 3. **遍历 `$PATH` 变量查找可执行文件**
   - 如果没有找到内置命令或别名，Shell 会按照 `$PATH` 环境变量中指定的目录顺序查找这个命令的可执行文件。
   - `$PATH` 是一个包含目录路径的列表，系统会依次在这些目录中寻找匹配的可执行文件。
   - `$PATH` 的内容可以通过 `echo $PATH` 查看，常见的目录包括 `/usr/local/bin`、`/usr/bin` 等，具体路径取决于系统配置。
   - 系统会逐个目录查找，如果在某个目录中找到匹配的可执行文件（名称与命令相同），就会立即执行它。

### 4. **本地目录中的脚本**(执行npm run xxx时会执行package.json下script中对应的cli,才会到`node_modules/.bin`去找,直接执行命令会在全局找)
   - 在前端项目中，通常会有 `node_modules/.bin` 目录，里面包含本地安装的命令行工具（如 `eslint`、`webpack` 等）。这些命令一般通过 `npx` 或 `npm run` 调用来执行。
   - 使用 `npx <command>` 时，系统会在 `node_modules/.bin` 目录中查找并执行对应的命令，不必手动指定路径。

### 5. **未找到命令的处理**
   - 如果 `$PATH` 中没有任何目录包含匹配的命令名，Shell 会返回“command not found”的错误信息。

通过这种顺序，系统能够有效地定位并执行命令，同时提供一定的灵活性来优先执行内置、别名和本地脚本等不同类型的命令。

---

## 在一个页面中import或者require一个模块,查找顺序是怎样的?
在前端项目中，当使用 `import` 或 `require` 来加载模块时，Node.js 会按照特定的规则查找模块。以下是查找的顺序：

### 1. **检查内置模块**
   - 如果导入的模块是 Node.js 的内置模块（例如 `fs`、`path` 等），Node.js 会优先加载这些模块，而不进行文件系统查找。
   - 内置模块具有最高的优先级，若模块名称与内置模块名称相同，则会直接加载内置模块。

### 2. **检查相对路径或绝对路径**
   - 如果模块的路径以 `./`、`../` 或 `/` 开头，Node.js 会将其视为文件路径，并按照以下顺序查找：
     - **具体文件**：Node.js 首先会查找指定路径下的具体文件，比如 `./module.js`。
     - **加后缀查找**：如果没有找到指定文件，Node.js 会尝试添加 `.js`、`.json` 和 `.node` 后缀进行查找。
     - **查找目录下的 `index` 文件**：如果路径指向一个目录，Node.js 会查找该目录下的 `index.js`、`index.json` 或 `index.node` 文件。

### 3. **查找 `node_modules` 目录**
   - 如果导入的模块不是内置模块，并且路径未以 `./`、`../` 或 `/` 开头，Node.js 会认为这是一个包。
   - 查找顺序如下：
     1. **当前目录的 `node_modules`**：首先会在当前文件所在目录下的 `node_modules` 文件夹中查找。
     2. **父级目录的 `node_modules`**：如果未找到，则沿着目录层级依次向上查找，例如 `../node_modules`、`../../node_modules`，直到达到文件系统的根目录。
   - **包的入口文件**：在找到对应包目录后，Node.js 会读取该包的 `package.json` 文件中 `main` 字段指定的文件。如果没有 `main` 字段，会默认查找 `index.js` 文件。

### 4. **全局模块（仅在一些特定环境中）**
   - 在 Node.js 中，除非特别配置（如通过 `NODE_PATH`），全局模块不会自动加入查找范围。
   - 在浏览器环境下（如通过 Webpack 或其他打包工具），依赖的全局模块需要事先配置，并不会自动查找。

### 示例查找流程
假设你在 `src/pages/home.js` 中 `import moduleX`：
1. **检查内置模块**，如果 `moduleX` 是 Node.js 内置模块则直接加载。
2. **相对路径或绝对路径查找**：如果 `moduleX` 是相对或绝对路径，则查找文件或目录下的 `index` 文件。
3. **`node_modules` 查找**：
   - 先查找 `src/pages/node_modules/moduleX`。
   - 然后查找 `src/node_modules/moduleX`。
   - 再查找根目录下的 `node_modules/moduleX`。

通过这些查找步骤，Node.js 确保能够按照模块依赖的层次和包层级准确找到并加载模块。

---

## 找到对应的包后一定会执行package.json 文件中 main 字段指定的文件吗?module等其他字段是怎么回事?
找到对应包后，Node.js 并不一定只执行 `package.json` 文件中 `main` 字段指定的文件。`main` 字段通常用于指向模块的入口文件，但在不同的环境中（如浏览器或现代模块打包器），还会使用其他字段，比如 `module`、`exports` 等，以支持多种模块格式和优化加载。下面是这些字段的详细作用：

### 1. **`main` 字段**
   - `main` 是传统的 Node.js 模块入口文件字段。
   - 当使用 `require` 或 `import` 导入模块时，Node.js 会首先查找 `main` 字段。如果 `main` 字段缺失，Node.js 默认会查找包根目录下的 `index.js`。
   - 示例：
     ```json
     {
       "main": "lib/index.js"
     }
     ```
   - 以上配置表示，当包被导入时，会执行 `lib/index.js` 文件。

### 2. **`module` 字段**
   - `module` 是为现代 ES 模块系统（ESM）设计的，通常用于支持 `import` 语法，指向使用 ES6 `import/export` 语法的模块文件。
   - 该字段优先级较 `main` 高，通常打包器（如 Webpack、Rollup）会优先使用 `module` 字段指定的文件。这使得前端环境可以使用更优化的模块。
   - 示例：
     ```json
     {
       "main": "lib/index.cjs.js",
       "module": "lib/index.esm.js"
     }
     ```
   - 在上述示例中，Node.js 仍会使用 `main` 字段指向的 CommonJS 文件，而打包器会使用 `module` 字段指向的 ES 模块文件。

### 3. **`exports` 字段**
   - `exports` 是 Node.js 新增的字段（从 Node 12 开始支持），用于提供更细粒度的导出路径，支持根据不同的模块系统导出不同的文件。它可以取代 `main` 和 `module`，并支持条件导出。
   - `exports` 可以配置多个入口，例如支持同时导出 CommonJS 和 ES 模块，或为不同路径设置不同入口。
   - 示例：
     ```json
     {
       "exports": {
         ".": {
           "require": "./lib/index.cjs.js",
           "import": "./lib/index.esm.js"
         },
         "./feature": {
           "require": "./lib/feature.cjs.js",
           "import": "./lib/feature.esm.js"
         }
       }
     }
     ```
   - 以上配置表示，主入口和 `./feature` 子路径可以分别为 CommonJS 和 ES 模块提供不同的导出文件。这样 Node.js 和打包器可以根据 `require` 和 `import` 语法的不同选择对应的文件。

### 4. **`browser` 字段**
   - `browser` 字段是为前端环境优化的，它通常用于指定浏览器版本的文件路径，适用于需要不同于 Node.js 版本的代码。
   - 当打包器（如 Webpack）检测到 `browser` 字段时，会优先使用该文件。
   - 示例：
     ```json
     {
       "main": "lib/index.node.js",
       "browser": "lib/index.browser.js"
     }
     ```
   - 以上配置表示，打包器在浏览器环境下会使用 `index.browser.js`，而在 Node.js 环境中会使用 `index.node.js`。

### 不同字段的查找优先级
在前端打包器中，查找优先级通常为：
1. `exports`（若支持并设置了）；
2. `browser`（在浏览器打包时）；
3. `module`（优先使用 ES 模块）；
4. `main`（作为默认入口文件）。

### 总结
- **Node.js**：默认使用 `main`，若设置了 `exports` 则使用 `exports`。
- **打包器**（如 Webpack）：优先使用 `exports`、`browser`、`module` 字段，作为适配浏览器环境的优化方案。

---

## exports和browser 字段字段的区别?什么是"Webpack 运行在浏览器模式下"?怎么确定webpack运行在什么模式下?
### `exports` 和 `browser` 字段的区别

虽然 `exports` 和 `browser` 都是为了优化模块在不同环境下的加载，但它们的作用和使用场景有所不同：

1. **`exports` 字段**
   - **作用**：提供一种更精细化的模块导出机制，允许你根据不同的导入方式（如 `require` 或 `import`）以及不同的环境（如 Node.js 或浏览器）来指定不同的文件。`exports` 提供了条件导出的功能，能够更明确地指定不同路径的导出内容。
   - **使用场景**：这是 Node.js 和打包工具（如 Webpack）用于导出模块的标准方式。通过 `exports`，你可以为不同的导入方式提供不同的入口文件。
   - **字段示例**：
     ```json
     {
       "exports": {
         ".": {
           "require": "./lib/index.cjs.js",  // CommonJS 文件
           "import": "./lib/index.esm.js"   // ESM 文件
         }
       }
     }
     ```
     上述配置表示：
     - 当使用 `require` 导入时，会加载 `index.cjs.js`（CommonJS 模块）。
     - 当使用 `import` 导入时，会加载 `index.esm.js`（ESM 模块）。

2. **`browser` 字段**
   - **作用**：提供专门为浏览器环境优化的文件路径。当模块需要区分浏览器和 Node.js 环境时，`browser` 字段用于指定仅在浏览器环境中加载的文件版本。浏览器环境可能需要不同的代码，通常不依赖 Node.js 特有的模块（如 `fs`、`path` 等），因此会有专门为浏览器优化的版本。
   - **使用场景**：`browser` 字段常用于兼容 Node.js 与浏览器环境的库。打包工具（如 Webpack）会读取这个字段，在浏览器环境中加载适合的文件，而忽略 Node.js 专用的代码。
   - **字段示例**：
     ```json
     {
       "main": "lib/index.node.js",  // Node.js 环境下使用的文件
       "browser": "lib/index.browser.js"  // 浏览器环境下使用的文件
     }
     ```
     这表示：
     - 在 Node.js 环境下，加载 `index.node.js`。
     - 在浏览器环境下，加载 `index.browser.js`。

### "Webpack 运行在浏览器模式下"是什么意思？

当我们说 "Webpack 运行在浏览器模式下" 时，指的是 Webpack 在打包时会为浏览器环境生成代码。Webpack 根据不同的环境配置（如 `target` 配置）来决定生成适合浏览器或 Node.js 环境的代码。

#### 如何确定 Webpack 运行在什么模式下？

你可以通过 Webpack 的配置文件（`webpack.config.js`）来指定 Webpack 的运行模式（浏览器、Node.js 或其他）。这个模式通常由 `target` 字段控制。Webpack 会根据这个配置来选择不同的构建目标，确保生成的代码适合指定的运行环境。

- **`target: "web"`**：表示 Webpack 会生成适合浏览器环境的代码。浏览器模式下的代码会排除掉 Node.js 特有的模块（如 `fs`、`path` 等），并尽量使用浏览器 API。
- **`target: "node"`**：表示 Webpack 会生成适合 Node.js 环境的代码。Node.js 代码会保留 Node.js 的模块，并且可以使用 Node.js 特有的 API。

#### 示例：
```js
module.exports = {
  target: "web",  // 表示 Webpack 会为浏览器环境生成代码
  // 或者
  target: "node",  // 表示 Webpack 会为 Node.js 环境生成代码
};
```

- **`target: "web"`**：Webpack 会优化打包出来的代码，使其适用于浏览器，比如自动将 `Buffer` 替换为浏览器的 `Uint8Array`。
- **`target: "node"`**：Webpack 会处理代码中的 Node.js 模块和 API，例如保留 `__dirname` 等特性。

### 总结

- **`exports`**：用于指定基于不同导入方式（如 `require`、`import`）以及环境（如 Node.js、浏览器）加载不同的模块版本。
- **`browser`**：仅在浏览器环境下使用，专门为浏览器优化代码（避免使用 Node.js 特有的模块）。
- **"Webpack 运行在浏览器模式下"**：指 Webpack 根据 `target: "web"` 配置生成适合浏览器的代码。
- **如何确定 Webpack 运行模式**：可以通过 `webpack.config.js` 中的 `target` 配置来确定，通常为 `target: "web"`（浏览器）或 `target: "node"`（Node.js）。


---

## browser字段和module字段有什么区别?浏览器不是支持esm吗?为什么还需要browser字段?
### `browser` 字段与 `module` 字段的区别

`browser` 和 `module` 字段都与模块的格式和目标环境相关，但它们的作用和使用场景有所不同：

1. **`browser` 字段**
   - **目的**：`browser` 字段是专门为浏览器环境优化的，它的作用是指定浏览器中使用的模块文件。这个字段通常用来替换或提供浏览器特定的文件版本，以避免在浏览器中使用 Node.js 专有的功能（如 `fs`、`path` 等）。通过 `browser` 字段，模块作者可以提供一个专为浏览器环境优化的版本。
   - **使用场景**：当一个模块需要同时支持浏览器和 Node.js 环境时，`browser` 字段提供了一个浏览器优化的文件，通常会去除 Node.js 相关的代码或替换掉它们（例如将 `fs` 替换为一个 Web API 或纯 JavaScript 实现）。
   - **举个例子**：
     ```json
     {
       "main": "lib/index.js",  // Node.js 环境使用的文件
       "browser": "lib/index.browser.js"  // 浏览器环境使用的文件
     }
     ```
     在浏览器环境下，Webpack 会选择 `lib/index.browser.js`，而在 Node.js 环境下会使用 `lib/index.js`。

2. **`module` 字段**
   - **目的**：`module` 字段用于指定 **ES Module（ESM）** 格式的文件，这使得模块可以被现代打包器（如 Webpack、Rollup）和现代 JavaScript 引擎以更高效的方式加载和优化。`module` 字段通常指向使用 `import/export` 语法的文件，而不是传统的 CommonJS 模块。
   - **使用场景**：`module` 字段通常用于支持前端项目中的模块加载优化，尤其是 Tree Shaking（移除未使用代码）等技术。现代打包工具更倾向于使用 `module` 字段提供的 ES Module 格式，因为它比 CommonJS 更适合进行静态分析和优化。
   - **举个例子**：
     ```json
     {
       "main": "lib/index.cjs.js",  // CommonJS 模块
       "module": "lib/index.esm.js"  // ESM 模块
     }
     ```
     这里，打包器如 Webpack 会优先使用 `lib/index.esm.js` 文件来支持现代 JavaScript 模块。

### 为什么浏览器支持 ESM（ES Module）还需要 `browser` 字段？

虽然浏览器原生支持 ESM（`import` / `export`），但 `browser` 字段仍然有其存在的意义，主要原因如下：

1. **解决浏览器与 Node.js 的差异**：
   - 在许多情况下，浏览器环境和 Node.js 环境并不完全相同，特别是在 API 支持和模块系统方面。例如，浏览器没有 Node.js 的文件系统 API（`fs`、`path` 等）。因此，`browser` 字段允许为浏览器环境提供专门的替代实现，确保模块能够在浏览器中运行，而不会依赖 Node.js 特有的 API。
   - 有些模块可能依赖 Node.js 环境中的内建模块，这些模块在浏览器中不可用。`browser` 字段可以提供一个纯粹的浏览器版本来避免这种问题。

2. **替换 Node.js 特有的代码**：
   - `browser` 字段可以用来替换掉在浏览器中不兼容的 Node.js 代码或库。例如，`fs` 和 `path` 等模块在浏览器中没有意义，因此开发者可能会提供一个轻量化的浏览器版本，去掉这些依赖。
   - 例如，一个库可能使用 `browser` 字段提供一个不依赖文件系统的版本，以适应浏览器环境。

3. **多目标环境支持**：
   - 在实际开发中，许多库和模块需要同时支持 Node.js 和浏览器环境。例如，很多模块支持 ESM 格式，以便在现代浏览器中更高效地加载。但如果这些模块还需要支持 Node.js，或者它们在浏览器中运行时需要做一些优化，`browser` 字段就派上用场了。
   - `browser` 字段通过为浏览器提供优化的版本，保证了多目标环境的兼容性。

4. **工具和打包器的优化**：
   - 虽然浏览器已经原生支持 ESM，但打包工具（如 Webpack、Rollup）可以使用 `browser` 字段来替换模块中的 Node.js 相关代码或提供特定的优化版本。这使得浏览器端的代码能够更高效地运行，避免加载不需要的部分。

### 总结

- **`module` 字段**：用于指定 ESM（ES Module）格式的入口文件，通常用于现代前端项目中，以便通过静态分析和 Tree Shaking 等优化技术更高效地加载和打包代码。
- **`browser` 字段**：用于指定浏览器环境中使用的模块文件，通常用来替换掉 Node.js 特有的代码（如 `fs`、`path` 等），并为浏览器环境提供优化的代码版本。

即使浏览器本身支持 ESM，`browser` 字段仍然非常有用，因为它解决了跨环境的兼容性问题，并能优化浏览器中不适用的 Node.js 特性。

------------

## **npm 使用中的问题**

### 1.npm install
这个错误表示NPM在尝试通过HTTPS连接到一个资源时，遇到了一个证书过期的问题。NPM需要使用有效的SSL证书来保证通信安全，如果证书过期，NPM将无法建立安全连接。
```shell
npm ERR! code ETIMEDOUT
npm ERR! errno ETIMEDOUT
npm ERR! network request to https://registry.npmjs.org/type-fest failed, reason:
npm ERR! network This is a problem related to network connectivity.
npm ERR! network In most cases you are behind a proxy or have bad network settings.
npm ERR! network
npm ERR! network If you are behind a proxy, please make sure that the
npm ERR! network 'proxy' config is set properly.  See: 'npm help config'
```
解决方法:临时http镜像源
`npm config set registry http://registry.npm.taobao.org`永久
`npm install --registry=http://registry.npm.taobao.org`临时

