### peerDependencies的作用

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