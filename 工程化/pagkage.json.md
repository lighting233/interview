
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
    }
}
```