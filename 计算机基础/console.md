`console` 对象提供了多种用于调试和日志记录的常用方法，以下是一些常见的 `console` 方法及其用途：

### 1. `console.log()`
用于将普通消息输出到控制台，是最常用的调试方法。

```javascript
console.log("Hello, world!"); // 输出: Hello, world!
```

### 2. `console.error()`
用于输出错误信息。它通常会在浏览器控制台中显示为红色，提示开发者异常。

```javascript
console.error("This is an error message."); // 输出错误消息
```

### 3. `console.warn()`
用于输出警告信息。通常以黄色显示，提醒开发者注意潜在问题。

```javascript
console.warn("This is a warning!"); // 输出警告消息
```

### 4. `console.info()`
用于输出一般的信息，类似于 `console.log()`，但语义上用于输出信息性内容。

```javascript
console.info("Informational message."); // 输出信息性消息
```

### 5. `console.debug()`
用于输出调试信息。它与 `console.log()` 类似，但通常用于更详细的调试场景。在某些浏览器中，它的输出在默认状态下可能被隐藏。

```javascript
console.debug("This is a debug message."); // 输出调试信息
```

### 6. `console.assert()`
如果第一个参数为 `false`，则输出错误消息，通常用于调试断言失败的情况。

```javascript
console.assert(1 === 2, "This is an assertion failure!"); // 断言失败，输出错误消息
```

### 7. `console.table()`
以表格形式输出对象或数组，方便对比和查看数据。

```javascript
const cars = [{ make: 'Toyota', model: 'Corolla' }, { make: 'Ford', model: 'Mustang' }];
console.table(cars); // 以表格形式输出数组
```

### 8. `console.time()` / `console.timeEnd()`
用于计时。在 `console.time()` 之后运行的代码片段中，调用 `console.timeEnd()` 以显示从开始到结束之间的时间间隔（以毫秒为单位）。

```javascript
console.time("Timer"); // 开始计时
// 模拟耗时操作
for (let i = 0; i < 1000000; i++) {}
console.timeEnd("Timer"); // 结束计时并输出时间
```

### 9. `console.group()` / `console.groupEnd()`
将日志分组，便于在复杂的日志中保持组织性。可以嵌套分组。

```javascript
console.group("Outer group");
console.log("Message in outer group");
console.group("Inner group");
console.log("Message in inner group");
console.groupEnd();
console.groupEnd();
```

### 10. `console.groupCollapsed()`
类似于 `console.group()`，但分组在控制台中默认是折叠状态。

```javascript
console.groupCollapsed("Collapsed group");
console.log("Message in collapsed group");
console.groupEnd();
```

### 11. `console.count()`
输出被调用的次数，每次调用时会增加计数。

```javascript
console.count("Counter"); // Counter: 1
console.count("Counter"); // Counter: 2
console.countReset("Counter"); // 重置计数
console.count("Counter"); // Counter: 1
```

### 12. `console.trace()`
输出当前执行代码的调用栈信息，通常用于调试代码执行的上下文和来源。

```javascript
function f1() {
  f2();
}

function f2() {
  console.trace("Stack trace:");
}

f1(); // 输出调用栈信息
```

### 13. `console.clear()`
清空控制台中的所有内容。

```javascript
console.clear(); // 清除控制台内容
```

### 14. `console.dir()`
以一种可交互的列表形式输出对象的详细信息，展示对象的属性和方法。

```javascript
const obj = { name: "John", age: 30 };
console.dir(obj); // 以可展开形式查看对象属性
```

### 15. `console.dirxml()`
以 XML/HTML 树的形式输出对象的可视化结构，主要用于 DOM 元素。

```javascript
console.dirxml(document.body); // 输出 body 元素的 DOM 结构
```

### 16. `console.exception()` （已弃用）
曾用于显示异常信息，现在不常使用，现代浏览器倾向于用 `console.error()` 来处理错误消息。

---

### 实际开发中的最佳实践
- **日志级别**：将不同的重要性级别的日志信息使用 `log`、`warn`、`error`、`debug` 区分开来，便于在不同环境下调试和诊断问题。
- **清晰的输出结构**：使用 `group` 和 `table` 方法，将复杂的日志按组或表格输出，有助于提高可读性。
- **适当使用计时**：使用 `console.time()` 来评估某些代码块的性能，尤其是耗时操作。