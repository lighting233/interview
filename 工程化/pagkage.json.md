## **1.peerDependencies的作用**

```
"peerDependencies": {
		"react": "workspace:*"
	}
```
例如当前开发的项目有dependencies和peerDependencies，这两个里边的依赖我都会安装，
但当我把这个包发布，别人再安装依赖时则不会再安装一遍 react，因为他用到我这个包，他的宿主环境里一定已经有了 react 这个包了

---

```JSON
{
  "name": "react",
  "version": "1.0.0",
  //描述
  "description": "",
  //commonjs 规范模块入口
  "main": "index.js",
  //ESmodule 规范模块入口
  "module": "index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  //mono-repore项目中，说明当前项目依赖 packages 中其他子项目shared包
  "dependencies": {
		"shared": "workspace:*"
    },
  "peerDependencies": {
		"react": "workspace:*"
	}
}
```

## **2.版本号**
- `~`:**补丁**中的更改表示不会破坏任何内容的错误修复。 会匹配最近的小版本依赖包，比如 ~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0
- `^`:**次要版本**的更改表示不会破坏任何内容的新功能。 会匹配最新的大版本依赖包，比如 ^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0
- `*`:**主要版本**的更改代表了一个破坏兼容性的大变化。 如果用户不适应主要版本更改，则内容将无法正常工作。 安装最新版本的依赖包，比如 *1.2.3 会匹配 x.x.x，

### 如何查看安装的包版本
- `npm list --depth 0`
- `npm list -g --depth 0`

## **3.package-lock.json文件**
- 当我们在一个项目中`npm install`时候，会自动生成一个`package-lock.json`文件
- 其实一句话总结，就是`lock`文件里锁定的版本号**符合**`package.json`里的版本号设定，则安装`lock`文件的版本号，否则安装`package.json`的版本号。

### 怎么更新包的版本
- `npm install`指定版本: `npm install element-ui@2.15.9`.它会同步修改我们的`package.json`和`package-lock.json`。
- `npm update`: `npm update element-ui`.它会将指定包更新成最新版本，并且同步修改我们的`package.json`和`package-lock.json`。(`npm update xxx --save` 可以更新`package.json`)
- 更新项目下所有的包: `npm update`
- 删除 `package-lock.json`

## **4.`package-lock.json` 需要提交到仓库吗?**
是的，通常情况下，**`package-lock.json`** 文件应该提交到仓库。提交 `package-lock.json` 文件有以下几个重要原因：

### 1. **锁定依赖版本**
- `package-lock.json` 文件会记录每个依赖项的确切版本，包括其子依赖项。这确保了在不同的开发环境和 CI/CD 系统中安装的依赖是完全一致的。
- 即使 `package.json` 中定义了依赖的版本范围（如 `"^1.0.0"`），`package-lock.json` 会确保安装的具体版本不会超出这个范围，避免因为版本更新导致的不可预测的行为。

### 2. **提高安装速度**
- 当 `package-lock.json` 文件存在时，npm 安装依赖时可以跳过版本解析的过程，直接根据 `package-lock.json` 中记录的结构进行安装，显著提升安装速度。

### 3. **保障一致性**
- 在团队合作中，提交 `package-lock.json` 确保所有开发者、测试环境、生产环境使用的依赖版本一致。这对于避免“在我的机器上可以正常运行”的问题尤为重要。

### 4. **安全性**
- `package-lock.json` 还会记录依赖的来源地址。如果某个包迁移到了不可信任的源，通过对比 `package-lock.json` 的变更，可以及时发现依赖包来源的变动，提升安全性。

### 例外情况：
- 如果是一个库项目（library），而不是一个应用（application），有时可以选择不提交 `package-lock.json`，因为库项目更关注的是它的用户如何安装依赖。但在大多数情况下，尤其是应用项目，提交 `package-lock.json` 是最佳实践。
- 因为库文件一般都是被其他项目依赖的，在不使用 package-lock.json的情况下，就可以复用主项目已经加载过的包，减少依赖重复和体积

因此，除非有特殊理由，**`package-lock.json` 文件应该提交到仓库** 以确保依赖版本的稳定性和一致性。