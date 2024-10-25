## 一、pnpm-link的用法 (kasong react 第二课：-小试牛刀(2022-11-25 15-46-21))

- 在 big-react 项目中，打包好的 react 项目存放在根目录下的 dist/node_modules/react文件夹下
- 在dist/node_modules/react文件夹下执行`pnpm link --global`
- 全局node_modules下的 react 就指向这个打包后的 react
- 在新项目执行 `npx create-react-app react-demo`后，项目根目录下执行`pnpm link react --global`,那么这个项目引入的 react 就是我们自己打包的 react

---

## 二、pnpm项目中 packages 下创建一个新项目，如何引用其他包作为依赖？
在`package.json`中添加
```js
"dependencies": {
		"shared": "workspace:*"
    }
```
之后执行 pnpm i就会看见当前项目安装了 node_modules下有了shared包

---

## 三、mono-repor项目和单项目结构的仓库相比有什么好处？
Monorepo 是管理项目代码的一个方式，指在一个项目仓库（repo）中管理多个模块/包（package）。
Vue3 源码采用monorepo 方式进行管理，将模块拆分到 package 目录中。作为一个个包来管理，这样职责划分更加明确。
- 一个仓库可维护多个模块，不用到处找仓库
- 方便版本管理和依赖管理，模块之间的引用，调用都非常方便
- 每个项目不用单独的去发布,版本和打包也可以统一进行管理

---

## 四、什么是幽灵依赖？
在`.npmrc`下可以设置`shamefully-hoist:true`也可以让`pnpm`把依赖拍平到`node_modules`下,产生幽灵依赖

## 五.操作方法
1. 根目录下执行安装依赖`pnpm install vue -w`
2. pnpm的--filter是什么意思?
在 `pnpm` 中，`--filter` 选项用于选择特定的包或模块，以便在执行命令时只对这些包进行操作。这在处理大型 monorepo 项目时特别有用，可以帮助你更高效地管理依赖和执行任务。
3. `pnpm install @vue/shared@workspace --filter @vue/runtime-dom`等价于`pnpm install @vue/shared -w --filter @vue/runtime-dom`
主目录下执行这个命令在`packages/runtime-dom`目录下安装我们**本地的**`shared`模块
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

---


## 六、pnpm执行build时会把所有项目都打包吗?
在 monorepo 项目中，`pnpm` 默认不会在执行 `build` 脚本时自动构建所有项目，它只会构建当前项目的包。不过，`pnpm` 提供了多个方法来管理和优化 monorepo 项目中的构建过程，以实现对所有项目的批量构建。

### 使用 `pnpm` 构建多个项目的几种方式：

1. **使用 `pnpm -r` 选项递归构建所有包**

   你可以在 monorepo 根目录运行以下命令，递归执行所有项目的 `build` 脚本：

   ```bash
   pnpm -r run build
   ```

   这个命令会找到所有子项目中的 `build` 脚本，并按顺序递归运行。

2. **使用 `pnpm run -r --filter` 筛选特定项目构建**

   如果不想构建所有项目，可以使用 `--filter` 选项指定某个项目或多个项目。例如：

   ```bash
   pnpm -r --filter <project-name> run build
   ```

   也可以使用通配符筛选，例如构建 `@scope/` 下的所有项目：

   ```bash
   pnpm -r --filter "@scope/*" run build
   ```

3. **构建依赖链中的项目**

   如果你的某些子项目相互依赖，可以使用 `--filter` 配合 `...` 符号，让 `pnpm` 按照依赖关系构建：

   ```bash
   pnpm -r --filter "<project-name>..." run build
   ```

   这会构建指定项目及其所有依赖项，确保依赖的项目先构建。

4. **自动检测已改动的项目并构建**

   使用 `--filter` 结合 `changed` 选项，可以只构建 Git 中有改动的项目，提高构建效率：

   ```bash
   pnpm -r --filter "[changed]" run build
   ```

这样，`pnpm` 就能够灵活控制 monorepo 中的构建流程，避免不必要的重复构建，也能有效管理依赖顺序。

---

## 七、在`pnpm -r --filter "[changed]" run build`执行之前如何自动的修改各个包的版本号?
在 `pnpm -r --filter "[changed]" run build` 执行之前，自动修改各个包的版本号可以通过以下几种方式实现。推荐结合工具 `Changesets` 或 `pnpm version` 命令，它们能自动管理版本号并生成变更日志。

### 方法 1：使用 `Changesets` 管理版本号

`Changesets` 是一个专为 monorepo 设计的版本管理工具，可以与 `pnpm` 搭配使用，自动检测变更、更新版本号，并生成变更日志。流程如下：

1. **安装 Changesets**：

   在根目录安装 `Changesets`：

   ```bash
   pnpm add @changesets/cli -D
   ```

2. **初始化 Changesets**：

   初始化项目的配置文件：

   ```bash
   pnpm changeset init
   ```

3. **添加变更说明**：

   当你对某个包进行了更改时，运行以下命令，记录变更信息：

   ```bash
   pnpm changeset
   ```

   此命令会提示选择需要发布的包、指定更新类型（patch、minor、major），并生成一条变更日志。

4. **更新版本号**：

   执行以下命令自动更新版本号，生成的变更日志会被添加到所有受影响的包中。

   ```bash
   pnpm changeset version
   ```

5. **构建和发布**：

   在更新版本号后，可以执行 `pnpm -r --filter "[changed]" run build` 构建变更的包，然后使用 `pnpm publish -r` 发布这些包。

### 方法 2：使用 `pnpm version` 批量更新版本号

可以直接使用 `pnpm version` 命令为所有子项目设置新版本号，或仅更新变更过的项目：

```bash
pnpm -r --filter "[changed]" version <new_version>
```

示例：

```bash
pnpm -r --filter "[changed]" version patch
```

这个命令会对变更的子项目设置 `patch` 类型的版本号更新。也可以用 `minor` 或 `major`。

### 方法 3：手动脚本检测更改并更新版本

使用 `pnpm list -r --json` 获取所有项目的依赖图，并通过 Git 的变更信息更新版本号，可以用 Node.js 脚本执行这些操作。此方法适用于自定义需求，但实现起来稍微复杂。

---

## 八、pnpm在子项目的目录下执行依赖安装,依赖也会安装到根目录下吗?
好的，下面我将通过具体的例子说明在 `pnpm` 中如何在单独项目和工作区中安装依赖，以及每个命令在何处执行。

### 示例结构

假设我们有以下的项目结构：

```
my-workspace/
│
├── package.json          # 根工作区的 package.json
│
├── project-a/           # 子项目 A
│   ├── package.json      # 子项目 A 的 package.json
│   └── node_modules/     # 子项目 A 的 node_modules
│
└── project-b/           # 子项目 B
    ├── package.json      # 子项目 B 的 package.json
    └── node_modules/     # 子项目 B 的 node_modules
```

### 1. 在子项目 A 中安装依赖

**命令**：
```bash
cd my-workspace/project-a
pnpm install lodash
```

**说明**：
- **执行目录**：`my-workspace/project-a`
- **结果**：`lodash` 会被安装到 `project-a` 的 `node_modules` 目录中，并且 `project-a/package.json` 中会更新依赖列表。
- **根目录**：`my-workspace` 的 `node_modules` 不会受到影响。

### 2. 在子项目 B 中安装依赖

**命令**：
```bash
cd my-workspace/project-b
pnpm install axios
```

**说明**：
- **执行目录**：`my-workspace/project-b`
- **结果**：`axios` 会被安装到 `project-b` 的 `node_modules` 目录中，并且 `project-b/package.json` 中会更新依赖列表。
- **根目录**：`my-workspace` 的 `node_modules` 仍然不会受到影响。

### 3. 在根工作区中安装依赖

**命令**：
```bash
cd my-workspace
pnpm install express
```

**说明**：
- **执行目录**：`my-workspace`
- **结果**：`express` 会被安装到根目录的 `node_modules` 中，并且 `my-workspace/package.json` 中会更新依赖列表。
- **子项目**：`project-a` 和 `project-b` 可以共享这个依赖。

### 4. 在子项目 A 中再次安装依赖（共享依赖）

**命令**：
```bash
cd my-workspace/project-a
pnpm install express
```

**说明**：
- **执行目录**：`my-workspace/project-a`
- **结果**：`express` 不会被再次下载，而是会创建一个指向根目录 `node_modules` 中 `express` 的符号链接（如果子项目的 `package.json` 中没有明确列出 `express` 作为依赖）。
- **根目录**：`my-workspace` 的 `node_modules` 中的 `express` 依然可用。

### 总结

- 在子项目中执行 `pnpm install` 时，依赖会安装到该子项目的 `node_modules` 中。
- 在根工作区中执行 `pnpm install` 时，依赖会安装到根目录的 `node_modules` 中，并可被所有子项目共享。
- 这种设计使得 `pnpm` 在处理依赖时灵活且高效。