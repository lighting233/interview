### 一、pnpm-link的用法 (kasong react 第二课：-小试牛刀(2022-11-25 15-46-21))

- 在 big-react 项目中，打包好的 react 项目存放在根目录下的 dist/node_modules/react文件夹下
- 在dist/node_modules/react文件夹下执行`pnpm link --global`
- 全局node_modules下的 react 就指向这个打包后的 react
- 在新项目执行 `npx create-react-app react-demo`后，项目根目录下执行`pnpm link react --global`,那么这个项目引入的 react 就是我们自己打包的 react

---

### 二、pnpm项目中 packages 下创建一个新项目，如何引用其他包作为依赖？
在`package.json`中添加
```js
"dependencies": {
		"shared": "workspace:*"
    }
```
之后执行 pnpm i就会看见当前项目安装了 node_modules下有了shared包

---

### 三、mono-repor项目和单项目结构的仓库相比有什么好处？
Monorepo 是管理项目代码的一个方式，指在一个项目仓库（repo）中管理多个模块/包（package）。
Vue3 源码采用monorepo 方式进行管理，将模块拆分到 package 目录中。作为一个个包来管理，这样职责划分更加明确。
- 一个仓库可维护多个模块，不用到处找仓库
- 方便版本管理和依赖管理，模块之间的引用，调用都非常方便
- 每个项目不用单独的去发布,版本和打包也可以统一进行管理

---

### 四、什么是幽灵依赖？
在`.npmrc`下可以设置`shamefully-hoist:true`也可以让`pnpm`把依赖拍平到`node_modules`下,产生幽灵依赖

### 五.操作方法
1. 根目录下执行安装依赖`pnpm install vue -w`
2. pnpm的--filter是什么意思?
在 `pnpm` 中，`--filter` 选项用于选择特定的包或模块，以便在执行命令时只对这些包进行操作。这在处理大型 monorepo 项目时特别有用，可以帮助你更高效地管理依赖和执行任务。

### 主要功能

1. **选择特定包**：使用 `--filter` 可以指定要操作的包。例如，你可以只安装、更新或运行某个特定包的脚本，而不影响其他包。

2. **支持通配符**：`--filter` 支持使用通配符（如 `*`）来匹配多个包。例如，`--filter my-package-*` 会匹配所有以 `my-package-` 开头的包。

3. **组合使用**：可以与其他命令结合使用，如 `install`、`update`、`run` 等。例如：
   ```bash
   pnpm install --filter my-package
   pnpm run build --filter my-package
   ```

### 示例

假设你的项目结构如下：

```
my-monorepo/
├── package-a/
│   └── package.json
├── package-b/
│   └── package.json
└── package-c/
    └── package.json
```

如果你只想安装 `package-a` 的依赖，可以使用：

```bash
pnpm install --filter package-a
```

### 其他选项

- **`--filter <pattern>`**：可以使用特定的模式来过滤包。
- **`--filter ...`**：可以指定多个过滤条件。
