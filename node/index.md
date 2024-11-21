# ndoe
[面试题](https://www.bilibili.com/list/watchlater?oid=113389938410948&bvid=BV1vHStYKEWc&spm_id_from=333.1007.top_right_bar_window_view_later.content.click&p=22)
[Node.js零基础到项目实战 Express+MySQL+Sequelize实作API](https://www.bilibili.com/video/BV1HE42157zV?spm_id_from=333.788.player.switch&vd_source=78435c3cefd4783245d9d16d09d19859&p=56)
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