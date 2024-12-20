# ndoe
[面试题](https://www.bilibili.com/list/watchlater?oid=113389938410948&bvid=BV1vHStYKEWc&spm_id_from=333.1007.top_right_bar_window_view_later.content.click&p=22)
[Node.js零基础到项目实战 Express+MySQL+Sequelize实作API](https://www.bilibili.com/video/BV1HE42157zV?spm_id_from=333.788.player.switch&vd_source=78435c3cefd4783245d9d16d09d19859&p=56)
[node的模块查找策略](https://www.bilibili.com/video/BV1um421K7Ae/?spm_id_from=333.337.search-card.all.click&vd_source=78435c3cefd4783245d9d16d09d19859)
## **1.node的__dirname地址是什么?**
在 Node.js 中，`__dirname` 是一个全局变量，它表示当前模块所在的目录的绝对路径。

### 具体说明：
- 它是当前脚本文件所在的**目录**，而不是文件本身的路径。
- 路径是**绝对路径**，即使你以相对路径运行脚本，`__dirname` 也会解析为绝对路径。
- 通常用于构建文件路径，确保在任何地方运行脚本时路径都能正确解析。

### 示例代码：

```javascript
// 假设这个文件是 /home/user/project/app.js
console.log(__dirname);
// 输出: /home/user/project
```

### 常见用例：
1. **与 `path` 模块结合使用：**
   ```javascript
   const path = require('path');

   // 拼接路径
   const filePath = path.join(__dirname, 'data', 'file.txt');
   console.log(filePath);
   // 输出: /home/user/project/data/file.txt
   ```

2. **读取文件内容：**
   ```javascript
   const fs = require('fs');
   const path = require('path');

   const fileContent = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8');
   console.log(fileContent);
   ```

3. **在动态路径环境中处理资源：**
   如果应用需要加载文件或资源，`__dirname` 可以避免路径解析问题。

---

如果你在打包工具（如 Webpack）中使用 `__dirname`，需要注意它可能会被特殊处理。例如，Webpack 默认会将 `__dirname` 转换为 `/`。你可以通过配置修改它的行为。

### **__dirname和process.cwd()的区别**
`__dirname` 和 `process.cwd()` 都是用于获取路径的 Node.js 全局变量/方法，但它们有着重要的区别：

---

### 1. **`__dirname`** 
- **含义：** 当前模块所在目录的绝对路径。
- **作用域：** 与当前文件绑定。
- **特点：** 
  - 它与文件的物理存储路径相关，独立于你在哪里运行程序。
  - 不会因工作目录的改变而变化。
- **常见用法：**
  用来构建相对于当前模块的路径。

**示例：**
```javascript
// 假设文件位于 /home/user/project/src/app.js
console.log(__dirname); 
// 输出: /home/user/project/src
```

---

### 2. **`process.cwd()`**
- **含义：** 当前工作目录（Current Working Directory）。
- **作用域：** 与运行脚本时的工作目录绑定。
- **特点：** 
  - 它依赖于你在运行脚本时所在的目录（工作目录）。
  - 如果你改变工作目录（例如使用 `process.chdir()`），`process.cwd()` 的值会随之改变。
- **常见用法：**
  用来处理相对于运行时工作目录的路径。

**示例：**
```javascript
// 假设当前工作目录是 /home/user/project
console.log(process.cwd()); 
// 输出: /home/user/project
```

---

### 3. **两者的对比**
| **特性**             | **`__dirname`**                     | **`process.cwd()`**              |
|-----------------------|--------------------------------------|-----------------------------------|
| **路径指向**         | 当前模块的目录                       | 当前工作目录                     |
| **是否会变**         | 固定，与模块路径相关                 | 可变，取决于运行时的工作目录     |
| **适用场景**         | 相对于模块的资源访问                 | 相对于项目根目录的操作           |
| **动态行为**         | 不会受运行位置影响                   | 会随 `process.chdir()` 变化       |

---

### 4. **场景示例**
#### 文件结构：
```
/home/user/project
  ├── index.js
  ├── src
       ├── app.js
```

#### `index.js` 内容：
```javascript
const path = require('path');

// 打印路径
console.log('cwd:', process.cwd());
console.log('__dirname:', __dirname);

// 拼接路径
const fileInModule = path.join(__dirname, 'file.txt'); // 相对模块
const fileInRoot = path.join(process.cwd(), 'file.txt'); // 相对工作目录

console.log('fileInModule:', fileInModule);
console.log('fileInRoot:', fileInRoot);
```

---

#### **运行示例：**

1. **在 `/home/user/project` 下运行：**
   ```bash
   $ node index.js
   ```
   输出：
   ```
   cwd: /home/user/project
   __dirname: /home/user/project
   fileInModule: /home/user/project/file.txt
   fileInRoot: /home/user/project/file.txt
   ```

2. **在 `/home/user` 下运行：**
   ```bash
   $ node project/index.js
   ```
   输出：
   ```
   cwd: /home/user
   __dirname: /home/user/project
   fileInModule: /home/user/project/file.txt
   fileInRoot: /home/user/file.txt
   ```

---

### 总结：
- **`__dirname`：** 文件自身的固定位置，无论在哪里运行，始终可靠。
- **`process.cwd()`：** 与运行时环境绑定，用于动态工作目录相关的路径计算。

-------

## **2.node的path.join方法**
### **Node.js 的 `path.join` 方法**

`path.join` 是 Node.js 中 `path` 模块提供的一个方法，用于将多个路径片段拼接成一个规范化的路径。

---

### **语法**
```javascript
path.join(...paths)
```

- **`...paths`：** 一个或多个路径片段（字符串）。
- 返回值：拼接后的路径字符串，自动处理路径分隔符、`..` 和 `.`。

---

### **功能特点**
1. **自动添加路径分隔符：**
   - 根据当前操作系统的路径分隔符（`/` 在 POSIX 系统中，`\` 在 Windows 中）进行拼接。
2. **处理相对路径：**
   - 自动规范化路径，解析 `..` 和 `.`。
3. **忽略空路径：**
   - 如果路径片段为空（`""`），则会被跳过。

---

### **常见用法**

#### **1. 拼接路径**
```javascript
const path = require('path');

const result = path.join('/users', 'john', 'documents');
console.log(result); 
// 输出: '/users/john/documents' （Windows 下是 '\users\john\documents'）
```

#### **2. 忽略空路径**
```javascript
const result = path.join('/users', '', 'john', 'documents');
console.log(result); 
// 输出: '/users/john/documents'
```

#### **3. 解析相对路径**
```javascript
const result = path.join('/users/john', '../mary', './photos');
console.log(result);
// 输出: '/users/mary/photos'
```

#### **4. 结合 `__dirname` 获取文件路径**
```javascript
const result = path.join(__dirname, 'data', 'file.txt');
console.log(result);
// 输出: 当前文件目录下的 data/file.txt
```

---

### **与 `path.resolve` 的区别**
`path.join` 和 `path.resolve` 都用于拼接路径，但它们的行为有一些区别：

| **功能**                        | **`path.join`**                              | **`path.resolve`**                         |
|----------------------------------|---------------------------------------------|--------------------------------------------|
| **起点**                        | 不考虑当前工作目录，按片段逐步拼接          | 从当前工作目录开始，构造绝对路径           |
| **返回路径**                    | 返回相对路径或绝对路径，取决于输入          | 始终返回绝对路径                           |
| **路径解析顺序**                | 按输入的顺序拼接                            | 从右到左解析，直到找到根路径或绝对路径     |

**示例：**
```javascript
const path = require('path');

// path.join
console.log(path.join('folder', 'file.txt'));
// 输出: 'folder/file.txt'（取决于操作系统）

// path.resolve
console.log(path.resolve('folder', 'file.txt'));
// 输出: '/绝对路径/folder/file.txt'
```

---

### **错误处理**
- 如果传入的路径片段不是字符串，将抛出 `TypeError`。
```javascript
try {
  path.join('/users', null, 'documents');
} catch (error) {
  console.error(error.message);
  // 输出: "Path must be a string. Received null"
}
```

---

### **总结**
- **`path.join`** 适合拼接路径片段，并规范化最终结果。
- 在文件系统操作中，`path.join` 常用于生成相对路径或结合 `__dirname` 生成绝对路径。

------------

## **3.node的requier中相对路径(./a.js)和绝对路径(/a.js)的区别**
在 Node.js 的 `require` 方法中，使用**相对路径** (`./a.js`) 和 **绝对路径** (`/a.js`) 的区别主要体现在路径解析的方式和作用范围上。

---

### **1. 相对路径 (`./a.js` 或 `../a.js`)**

#### **特点**
- **相对于当前文件所在的路径**进行解析。
- 通常使用 `.` 和 `..` 表示当前目录或上一级目录。
- 如果不提供 `.js`、`.json`、`.node` 扩展名，Node.js 会自动尝试补全这些扩展名。

#### **解析方式**
- 如果当前文件位于 `/project/src/index.js`：
  - `require('./a.js')` 会尝试加载 `/project/src/a.js`。
  - `require('../a.js')` 会尝试加载 `/project/a.js`。

#### **适用场景**
- 用于加载当前模块文件夹内的文件。
- 常见于项目内模块之间的引用。

---

### **2. 绝对路径 (`/a.js`)**

#### **特点**
- **始终相对于系统根目录 `/`** 进行解析，而不是项目根目录。
- 文件路径从系统的根文件夹开始。

#### **解析方式**
- 如果使用 `require('/a.js')`，Node.js 会尝试加载系统根目录下的 `/a.js` 文件。
- 不考虑当前文件所在路径。

#### **适用场景**
- 很少直接使用绝对路径，除非明确知道目标文件位于系统根目录下。
- 在实际项目中，使用绝对路径通常是错误的，因为它与项目目录结构无关。

---

### **3. 常见误解：`/a.js` 不是项目根目录的路径**

许多开发者误以为 `/a.js` 是相对于项目根目录的路径，实际上它是指系统根目录。

#### **举例**
假设项目目录为 `/Users/username/myproject/`，有以下文件结构：
```
/Users/username/myproject/
  |- src/
     |- index.js
     |- a.js
```

- 如果在 `index.js` 中：
  ```javascript
  require('./a.js'); // 加载 /Users/username/myproject/src/a.js
  require('/a.js');  // 试图加载 /a.js（系统根目录下），通常会报错：MODULE_NOT_FOUND
  ```

---

### **4. 项目根目录的绝对路径引用**

如果需要从项目根目录引用文件，推荐使用 **基于项目根目录的路径**，而不是系统绝对路径。  
可以结合 `path` 模块解决：

#### **解决方案：基于项目根目录**
```javascript
const path = require('path');

// 获取项目根目录的绝对路径
const projectRoot = path.resolve(__dirname, '../');

// 引用项目根目录中的文件
const aModule = require(path.join(projectRoot, 'src/a.js'));
```

---

### **总结**
| **路径类型**     | **解析方式**                                    | **适用场景**                                  |
|------------------|-----------------------------------------------|----------------------------------------------|
| **相对路径** (`./a.js`) | 从当前文件所在目录开始解析                      | 常用于项目模块之间的相对引用                   |
| **绝对路径** (`/a.js`) | 从系统根目录开始解析                           | 通常不推荐，除非明确加载系统根目录下的文件         |
| **项目根路径引用**  | 使用 `path` 模块动态生成基于项目根目录的绝对路径 | 推荐在大型项目中引用文件时使用，避免路径混淆       |


--------

## **4.import.meta.url,const __filename = fileURLToPath(import.meta.url); const __dirname = dirname(__filename);的区别**
`import.meta.url` 和通过 `fileURLToPath(import.meta.url)` 与 `dirname` 组合获取的 `__filename` 和 `__dirname` 之间有一些明显的区别。这些区别主要体现在它们的用途和表示的数据上。

---

### 1. **概念**
| 特性                     | `import.meta.url`                                       | `__filename` 和 `__dirname`                          |
|--------------------------|--------------------------------------------------------|-----------------------------------------------------|
| **定义**                 | 是一个模块的元数据，包含当前模块的 URL                 | 表示当前模块的文件名 (`__filename`) 和目录名 (`__dirname`) |
| **表示内容**             | 当前模块的完整 URL，例如：`file:///path/to/module.js`   | 文件的绝对路径（`__filename`）和所在目录的路径（`__dirname`） |
| **支持场景**             | 仅支持 ESM 模块                                         | 传统 CommonJS 和 ESM 模块都可以支持（通过转换）         |

---

### 2. **用法**
#### **`import.meta.url`**
- 适用于 ESM 模块，返回的是模块的完整 URL。
- 直接使用可以获取当前模块的 `file:` 协议路径。
  
**示例：**
```javascript
console.log(import.meta.url);
// 输出：file:///path/to/your/module.js
```

#### **`fileURLToPath(import.meta.url)` + `dirname`**
- `fileURLToPath` 是一个 Node.js 提供的工具函数，用于将 URL 转换为文件系统路径。
- `dirname` 是 Node.js 的 `path` 模块提供的一个函数，用于从路径中提取目录部分。
- 结合使用可以得到与 CommonJS 的 `__filename` 和 `__dirname` 类似的效果。

**示例：**
```javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename); // 输出：/path/to/your/module.js
console.log(__dirname);  // 输出：/path/to/your
```

---

### 3. **使用场景**
| 场景                         | 适用方案                            | 说明                                                                                   |
|------------------------------|-------------------------------------|----------------------------------------------------------------------------------------|
| **文件路径操作**              | `fileURLToPath(import.meta.url)`    | 如果需要以文件路径形式处理文件系统操作，必须使用 `fileURLToPath` 将 URL 转换为路径。         |
| **与模块元数据相关的操作**    | `import.meta.url`                  | 如果需要直接处理模块元数据（如动态加载模块或其他元信息），可以直接使用 `import.meta.url`。   |
| **兼容 CommonJS 语法的代码**  | `fileURLToPath` + `dirname`         | ESM 环境中重现 `__filename` 和 `__dirname` 的功能，适配旧代码。                           |

---

### 4. **主要区别**
| 特性                   | `import.meta.url`                        | `__filename` 和 `__dirname`                      |
|------------------------|-----------------------------------------|-------------------------------------------------|
| **格式**               | 返回 URL 格式（如 `file:///path/to.js`） | 返回文件系统路径格式（如 `/path/to/file.js`）     |
| **模块系统**           | 仅适用于 ESM                           | 传统 CommonJS 和 ESM 都支持（通过转换方式适配）  |
| **直接可用性**         | 无需转换即可直接使用                   | 需要通过转换（`fileURLToPath` 和 `dirname`）实现 |
| **用途**               | 适合处理模块级 URL 数据                | 适合与文件系统相关的路径操作                     |

---

### 5. **选择何时使用哪一个**
- 如果你只需要模块的 URL 信息，直接使用 `import.meta.url`。
- 如果你的代码需要兼容文件系统操作（例如，读取文件或处理目录路径），使用 `fileURLToPath(import.meta.url)` 和 `dirname` 来模拟 CommonJS 的 `__filename` 和 `__dirname`。

两者结合使用可以满足现代 ESM 和传统 CommonJS 的需求。