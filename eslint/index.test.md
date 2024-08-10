### 1. eslint.config.mjs 和 .eslintrc.json 的用途和区别
==一个使用 ES 模块语法的配置文件==

### 2. .eslintrc.json 文件中配置介绍

1. **"extends"：** 
2. **"parser"：** ==eslint 本身不能解析 ts，使用这个社区实现的 parser 来把 ts 转为 ast==
3. **"parserOptions"：** 
4. **"plugins"：**
5. **"rules"：** 
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
- ==husky是代码提交的预检测==
- 
- 