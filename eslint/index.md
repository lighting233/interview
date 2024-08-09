### 1. eslint.config.mjs 和 .eslintrc.json 的用途和区别
- **用途:**
.eslintrc.json：这是 ESLint 的配置文件，使用 JSON 格式来定义 ESLint 的规则、环境、插件等。它通常用于较简单的配置。
eslint.config.mjs：这是一个使用 ES 模块语法的配置文件，允许更灵活的配置方式，例如使用 JavaScript 代码来动态决定配置内容，适合需要复杂逻辑的场景。
- **区别:**
- **格式：**

.eslintrc.json 是纯 JSON 格式，不能包含注释或动态逻辑。
eslint.config.mjs 是 JavaScript 文件，可以使用 ES6 模块特性，支持动态配置和注释。
灵活性：

.eslintrc.json 适合简单的静态配置。
eslint.config.mjs 更加灵活，可以根据不同的条件生成配置，例如根据环境变量、命令行参数等。
 - **使用场景：**

如果你的 ESLint 配置比较简单且不需要动态生成，使用 .eslintrc.json 就足够了。
如果你的项目需要复杂的逻辑或条件配置，使用 eslint.config.mjs 会更合适。

### 2. .eslintrc.json 文件中配置介绍

1. **"extends"：** 有了规则和规则合集，每一条可能打开，可能关闭，这个 extends 就是继承一些推荐的配置
2. **"parser"：** eslint 本身不能解析 ts，使用这个社区实现的 parser 来把 ts 转为 ast
3. **"parserOptions"：** parser 的配置
4. **"plugins"：** 各项规则的合集
5. **"rules"：** 各项规则
```JSON {.line-numbers highlight=[7-7 13-13 18-18 19-19]}
{
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:prettier/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": ["@typescript-eslint", "prettier"],
	"rules": {
		"prettier/prettier": "error",
		"no-case-declarations": "off",
		"no-constant-condition": "off",
		"@typescript-eslint/ban-ts-comment": "off"
	},
	"ignorePatterns": ["**/__tests__/*.js"]
}
```

### 3.eslint和 husky 和 commitlint 和 prettier
- prettier代码风格可能和 eslint 有冲突，需要进行处理
- husky 是代码提交的预检测可以运行package.json中定义的scripts中的脚本来执行 eslint 检测
- commitlint是代码 commit 时的检测规则设置，也可以集成到 husky 中