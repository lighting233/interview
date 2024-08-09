### 1. eslint.config.mjs 和 .eslintrc.json 的用途和区别


### 2. .eslintrc.json 文件中配置介绍

1. **"extends"：** 
2. **"parser"：** 
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
- 
- 
- 