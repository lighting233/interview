### [bable在线转换](https://www.babeljs.cn/)

react17 之前`<div>123</div>`转换为
```js
/*#__PURE__*/
React.createElement("div", null, "123");

/*#__PURE__*/
React.createElement("div", {
  id: "id_1"
}, "123");
```
react17 之后`<div id="id_1">123</div>`转换为
```js
import { jsx as _jsx } from "react/jsx-runtime";
/*#__PURE__*/_jsx("div", {
  id: "id_1",
  children: "123"
});
```

#### 分为编译时和运行时

- 编译时 bable 实现
- 运行时实现 jsx 方法

#### ReactElement数据结构

```ts
export type Props = {
	[key: string]: any;
	children?: ReactElement;
};
export interface ReactElement {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	props: Props;
	ref: Ref;
}

const ReactElement = function (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props,
): ReactElement {
	const element: ReactElement = {
		$$typeof: REACT_ELEMENT_TYPE,
		type: type,
		key,
		ref,
		props,
	};

	return element;
};
```

### jsx方法

```ts
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: any = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (hasValidKey(config)) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref' && val !== undefined) {
			if (hasValidRef(config)) {
				ref = val;
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		// 将多余参数作为children
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}
	return ReactElement(type, key, ref, props);
};
```

---

`Babel` 和 `AST` 是前端开发中特别是在处理 JavaScript 代码时常见的概念。让我们分别了解它们的含义，并通过 React 的 JSX 举例说明它们的关系和应用。

### 1. **Babel**
- **定义**: Babel 是一个 JavaScript 编译器，主要用于将 ES6/ES7 等现代 JavaScript 语法编译为兼容性更强的 ES5 语法，以便在旧浏览器中运行。它还可以将其他高级语法（如 JSX、TypeScript）转换为普通的 JavaScript。
  
- **功能**:
  - **转译现代 JavaScript**: 将现代 JavaScript（如箭头函数、模板字符串）转换为兼容旧浏览器的代码。
  - **编译 JSX**: 将 React 中的 JSX 语法转换为普通的 JavaScript 代码。
  - **插件系统**: 提供各种插件来扩展 Babel 的功能，比如编译 TypeScript、移除类型注解、支持新的 JavaScript 特性等。

### 2. **AST (Abstract Syntax Tree)**
- **定义**: AST（抽象语法树）是一种以树状结构表示源代码语法结构的抽象表示。它是编译器和解释器在分析源代码时生成的中间表示，用于理解代码的语法和逻辑。
  
- **功能**:
  - **代码解析**: 代码首先被解析为 AST，表示程序的结构和语法。
  - **代码转换**: Babel 使用 AST 来修改、转换代码。例如，可以在 AST 上进行操作，将某种语法转换为另一种语法。
  - **代码生成**: 经过转换的 AST 最终被重新生成为 JavaScript 代码。

### 3. **通过 React 的 JSX 举例说明 Babel 和 AST 的关系**

#### **示例 JSX 代码**
假设我们有一个简单的 React 组件：

```jsx
const MyComponent = () => {
  return <div>Hello, World!</div>;
};
```

#### **Babel 如何处理 JSX**
1. **解析 (Parsing)**:
   Babel 首先将这个 JSX 代码解析为 AST。对于上面的 JSX 代码，Babel 会识别出其中的 `JSX` 语法元素。

   - **JSX 元素**: `<div>Hello, World!</div>` 被识别为 `JSXElement` 节点，表示这是一个 JSX 标签。
   - **函数声明**: `MyComponent` 被识别为 `FunctionDeclaration` 节点。

2. **转换 (Transformation)**:
   Babel 使用一个 JSX 插件，将 AST 中的 JSX 部分转换为普通的 JavaScript 语法。具体来说，Babel 会将 `JSXElement` 节点转换为 React 的 `React.createElement` 函数调用。

   - 原来的 `<div>Hello, World!</div>` 会被转换为：`React.createElement("div", null, "Hello, World!")`。

3. **代码生成 (Code Generation)**:
   Babel 重新生成 JavaScript 代码，将转换后的 AST 输出为最终的 JavaScript 代码。

   - 转换后的代码：
     ```javascript
     const MyComponent = () => {
       return React.createElement("div", null, "Hello, World!");
     };
     ```

### **总结**
- **Babel** 是一个编译工具，负责将 JSX 等语法转译成普通的 JavaScript 代码。
- **AST** 是源代码的抽象表示形式，Babel 通过生成、修改 AST 来实现代码的转换。

通过 Babel 的转换，React 的 JSX 语法变成了标准的 JavaScript 函数调用，使得 JSX 可以在任何支持 JavaScript 的环境中运行。

---

AST（抽象语法树，Abstract Syntax Tree）是代码的抽象表示，它以树状结构展示了源代码的语法结构。每个节点表示源代码中的一种语法结构（如表达式、声明、块等）。要理解 AST 的结构，可以通过具体示例来说明。

### 示例：简单的 JSX 代码
让我们从之前的例子出发，假设我们有如下的简单 JSX 代码：

```jsx
const MyComponent = () => {
  return <div>Hello, World!</div>;
};
```

### AST 的结构
Babel 或其他编译器在处理这段代码时，会将其解析为如下的 AST 结构（伪代码形式展示）：

```
Program
 ├── VariableDeclaration (kind: "const")
 │    └── VariableDeclarator
 │         ├── Identifier (name: "MyComponent")
 │         └── ArrowFunctionExpression
 │              ├── Params: []
 │              └── BlockStatement
 │                   └── ReturnStatement
 │                        └── JSXElement
 │                             ├── JSXOpeningElement (name: "div")
 │                             ├── JSXText (value: "Hello, World!")
 │                             └── JSXClosingElement (name: "div")
```

### AST 节点详细说明
1. **Program**: 这是 AST 的根节点，表示整个代码文件。

2. **VariableDeclaration**: 表示变量声明。在这个例子中，声明了一个 `const` 变量。

   - `kind: "const"` 表示这是一个 `const` 声明。
   - 子节点 `VariableDeclarator` 表示具体的变量声明。

3. **VariableDeclarator**: 表示变量的具体声明。

   - **Identifier**: 表示变量的名称 `MyComponent`。
   - **ArrowFunctionExpression**: 表示箭头函数。

4. **ArrowFunctionExpression**: 表示箭头函数的定义。

   - **Params**: 参数列表，这里是空的 `[]`。
   - **BlockStatement**: 表示函数体 `{ ... }`，它包含一个 `ReturnStatement`。

5. **ReturnStatement**: 表示 `return` 语句。

   - 子节点是一个 `JSXElement`，表示返回的 JSX 元素。

6. **JSXElement**: 表示 JSX 元素 `<div>Hello, World!</div>`。

   - **JSXOpeningElement**: 表示 JSX 元素的开始标签 `<div>`。
   - **JSXText**: 表示 JSX 元素中的文本内容 "Hello, World!"。
   - **JSXClosingElement**: 表示 JSX 元素的结束标签 `</div>`。

### AST 的可视化
实际的 AST 结构可能更为复杂且包含更多细节。可以使用一些工具来可视化 AST，例如：

- **AST Explorer**: 一个在线工具，可以解析和显示 JavaScript、TypeScript、JSX 等语言的 AST。你可以在 [AST Explorer](https://astexplorer.net/) 中粘贴代码，并查看其对应的 AST 树。

### 总结
AST 是代码的语法结构的抽象表示，每个节点代表代码中的某种语法元素。通过将代码转换为 AST，编译器可以对代码进行分析和转换，从而实现代码的优化、转译等功能。