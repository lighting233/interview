### pnpm-link的用法 (kasong react 第二课：-小试牛刀(2022-11-25 15-46-21))

- 在 big-react 项目中，打包好的 react 项目存放在根目录下的 dist/node_modules/react文件夹下
- 在dist/node_modules/react文件夹下执行`pnpm link --global`
- 全局node_modules下的 react 就指向这个打包后的 react
- 在新项目执行 `npx create-react-app react-demo`后，项目根目录下执行`pnpm link react --global`,那么这个项目引入的 react 就是我们自己打包的 react

### pnpm项目中 packages 下创建一个新项目，如何引用其他包作为依赖？
在`package.json`中添加
```js
"dependencies": {
		"shared": "workspace:*"
    }
```
之后执行 pnpm i就会看见当前项目安装了 node_modules下有了shared包