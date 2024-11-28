## 1.axios
### **AJAX 请求流程**（基于 `XMLHttpRequest` 对象）

AJAX 是一种利用 `XMLHttpRequest` 对象在后台与服务器交换数据的技术。它可以在不重新加载整个网页的情况下，实现部分页面的更新。

---

### **流程步骤**
1. **创建 `XMLHttpRequest` 对象**：
   - 使用 `new XMLHttpRequest()` 创建实例，负责与服务器通信。

2. **初始化请求**：
   - 使用 `open(method, url, async)` 方法初始化请求：
     - `method`：请求方法（如 `GET` 或 `POST`）。
     - `url`：请求的目标 URL。
     - `async`：是否异步（一般设为 `true`）。

3. **设置请求头（可选）**：
   - 如果需要发送数据（如 JSON 格式），可使用 `setRequestHeader()` 设置内容类型：
     ```javascript
     xhr.setRequestHeader('Content-Type', 'application/json');
     ```

4. **监听请求状态变化**：
   - 通过 `onreadystatechange` 或 `onload` 监听请求的状态变化。
   - 请求的状态由 `readyState` 属性标识。

5. **发送请求**：
   - 使用 `send(data)` 方法发送请求。
   - 对于 `POST` 请求，可通过参数传递请求体。

6. **处理响应**：
   - 当请求完成（`readyState === 4` 且状态码为 `200`），可以使用 `responseText` 或 `response` 获取返回数据。

---

### **状态码和 `onreadystatechange` 监听的 `readyState` 属性**

#### **`readyState` 属性**
`readyState` 表示 `XMLHttpRequest` 的状态，共有 5 个取值：
1. **`0`**（UNSENT）：`XMLHttpRequest` 已创建，但未调用 `open()` 方法。
2. **`1`**（OPENED）：`open()` 方法已调用，尚未发送请求。
3. **`2`**（HEADERS_RECEIVED）：请求已发送，头部和状态码已收到。
4. **`3`**（LOADING）：正在接收响应体数据。
5. **`4`**（DONE）：响应已完成，可以使用数据。

---

#### **HTTP 响应状态码**
- **`200`**：请求成功。
- **`201`**：创建成功（通常用于 `POST`）。
- **`400`**：客户端请求错误。
- **`401`**：未授权。
- **`403`**：禁止访问。
- **`404`**：资源未找到。
- **`500`**：服务器内部错误。

---

### **完整代码示例**

```javascript
// 创建 XMLHttpRequest 对象
const xhr = new XMLHttpRequest();

// 配置请求
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);

// 监听状态变化
xhr.onreadystatechange = function () {
  console.log(`readyState: ${xhr.readyState}, status: ${xhr.status}`);
  if (xhr.readyState === 4) { // 请求完成
    if (xhr.status === 200) { // 响应成功
      console.log('Response:', xhr.responseText);
    } else {
      console.error('Error:', xhr.status, xhr.statusText);
    }
  }
};

// 发送请求
xhr.send();
```

---

### **简化版：使用 `onload` 监听完成**
`onload` 只会在请求完成时触发，简化了代码：
```javascript
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);

xhr.onload = function () {
  if (xhr.status === 200) {
    console.log('Response:', xhr.responseText);
  } else {
    console.error('Error:', xhr.status, xhr.statusText);
  }
};

xhr.onerror = function () {
  console.error('Network Error');
};

xhr.send();
```

---

### **现代替代：使用 `fetch`**
`fetch` 是 `XMLHttpRequest` 的现代替代，支持 Promise 和更简洁的语法：
```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

---

### 总结
- **`readyState` 和 `status`** 是 AJAX 请求状态的核心监控点。
- **`onreadystatechange`** 是经典的监听方式，`onload` 是更高层的简化接口。
- 随着 `fetch` 和更高层库（如 Axios）的普及，`XMLHttpRequest` 逐渐减少使用，但其工作原理仍是重要的面试知识点。