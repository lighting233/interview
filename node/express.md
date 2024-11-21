## **1.express中req.query和req.params和req.body的区别**
在 Express 中，`req.query`、`req.params` 和 `req.body` 是获取请求中不同类型数据的方式，它们的区别主要在于数据的来源和使用场景。

---

### 1. **`req.query`**
- **来源：** 查询字符串（URL 中 `?` 后的部分）。
- **使用场景：** 适用于获取 URL 中的查询参数。
- **特点：**
  - 数据以键值对的形式存储，类型始终是字符串。
  - 常用于过滤、分页等场景。
  - 不需要额外的中间件处理。

**示例 URL：**
```
GET /search?keyword=javascript&page=2
```

**获取方法：**
```javascript
app.get('/search', (req, res) => {
  console.log(req.query); 
  // 输出: { keyword: 'javascript', page: '2' }

  const { keyword, page } = req.query;
  res.send(`Keyword: ${keyword}, Page: ${page}`);
});
```

---

### 2. **`req.params`**
- **来源：** 路径参数（URL 路径中动态占位符）。
- **使用场景：** 适用于从 URL 路径中提取动态部分的数据。
- **特点：**
  - 参数由路由定义中的占位符（`:`）声明。
  - 常用于 RESTful 风格的 API（例如获取某个资源的具体信息）。

**示例 URL：**
```
GET /user/123
```

**获取方法：**
```javascript
app.get('/user/:id', (req, res) => {
  console.log(req.params);
  // 输出: { id: '123' }

  const { id } = req.params;
  res.send(`User ID: ${id}`);
});
```

---

### 3. **`req.body`**
- **来源：** 请求体（Request Body）。
- **使用场景：** 适用于处理客户端通过 POST、PUT、PATCH 等方法发送的非 URL 数据（例如 JSON、表单数据）。
- **特点：**
  - 通常用于提交数据，如登录表单、注册信息、上传文件等。
  - 需要借助中间件（如 `express.json()` 或 `express.urlencoded()`）来解析数据。

**示例：**

客户端请求：
```
POST /login
Content-Type: application/json
{
  "username": "john",
  "password": "123456"
}
```

**获取方法：**
```javascript
app.use(express.json()); // 解析 JSON 数据

app.post('/login', (req, res) => {
  console.log(req.body);
  // 输出: { username: 'john', password: '123456' }

  const { username, password } = req.body;
  res.send(`Username: ${username}`);
});
```

---

### 总结对比表

| **属性**   | **来源**                   | **典型用法**                     | **是否需要中间件** | **数据类型**           |
|------------|----------------------------|-----------------------------------|--------------------|------------------------|
| `req.query`| 查询字符串（`?key=value`）   | 过滤、分页等 URL 参数             | 否                 | 字符串                |
| `req.params`| 路径参数（`/path/:param`） | 动态路径数据                     | 否                 | 字符串                |
| `req.body` | 请求体                     | 表单数据、JSON 提交               | 是                 | 取决于中间件解析方式 |

---

### 使用组合示例
```javascript
app.use(express.json());

app.get('/products/:id', (req, res) => {
  const { id } = req.params; // 路径参数
  const { sort } = req.query; // 查询参数
  res.send(`Product ID: ${id}, Sort By: ${sort}`);
});

app.post('/products', (req, res) => {
  const { name, price } = req.body; // 请求体
  res.send(`Product Created: ${name}, Price: ${price}`);
});
```

对于请求：
1. `GET /products/101?sort=asc`：
   - `req.params`: `{ id: '101' }`
   - `req.query`: `{ sort: 'asc' }`
   - `req.body`: `{}`

2. `POST /products` with body `{ "name": "Laptop", "price": 1200 }`:
   - `req.params`: `{}`
   - `req.query`: `{}`
   - `req.body`: `{ name: 'Laptop', price: 1200 }`


------------

## **2.koa和express的区别**
Koa 和 Express 是两种流行的 Node.js Web 框架，它们在功能、设计理念和用法上有显著的区别。以下是它们的详细对比：

---

### 1. **设计理念**
#### **Express**
- **成熟框架：** 面向快速开发的全功能 Web 框架。
- **偏向模块化：** 自带路由、模板引擎支持、请求处理等功能。
- **回调风格：** 以回调和中间件为主。

#### **Koa**
- **轻量核心：** 强调极简主义，仅提供核心功能。
- **现代化：** 更专注于通过 async/await 提供优雅的异步控制。
- **中间件优先：** 需要用户选择或开发中间件扩展功能。

---

### 2. **异步编程**
#### **Express**
- 使用传统的回调或基于 `Promise` 的异步处理，支持 `async/await`，但 API 并未从根本上优化异步操作。
- 示例：
  ```javascript
  app.get('/test', async (req, res) => {
    try {
      const data = await fetchData();
      res.send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  ```

#### **Koa**
- 从设计上完全基于 `async/await`，没有传统的回调风格。
- 示例：
  ```javascript
  app.use(async (ctx) => {
    try {
      const data = await fetchData();
      ctx.body = data;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err.message;
    }
  });
  ```

---

### 3. **中间件机制**
#### **Express**
- 中间件基于回调函数，分为全局、路由级别中间件。
- 顺序执行，使用 `next()` 进入下一个中间件。
- 示例：
  ```javascript
  app.use((req, res, next) => {
    console.log('Middleware executed');
    next();
  });
  ```

#### **Koa**
- 中间件基于 `async/await`，遵循 "洋葱模型"。
- 支持前置和后置逻辑，`await next()` 执行下一个中间件后再返回当前逻辑。
- 示例：
  ```javascript
  app.use(async (ctx, next) => {
    console.log('Before');
    await next();
    console.log('After');
  });
  ```

---

### 4. **功能扩展**
#### **Express**
- 提供内置工具（如路由、模板引擎、静态文件支持）。
- 插件生态丰富，适合快速开发。

#### **Koa**
- 核心功能非常少，路由、请求解析等需要使用中间件（如 `koa-router`、`koa-body`）。
- 自由度更高，但开发过程需要更多配置。

---

### 5. **性能**
- Koa 通常稍快于 Express，因为它更轻量，且避免了部分历史包袱。
- 但实际性能差距可能很小，主要取决于应用的复杂性和中间件。

---

### 6. **错误处理**
#### **Express**
- 使用 `next(err)` 触发错误处理中间件。
- 错误处理不够直观，特别是嵌套回调时。

```javascript
app.use((err, req, res, next) => {
  res.status(500).send('Something went wrong!');
});
```

#### **Koa**
- 基于 `try/catch` 的 async/await 机制，错误处理更加简洁。
```javascript
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    ctx.body = 'Something went wrong!';
  }
});
```

---

### 7. **对比表**

| **特性**             | **Express**                       | **Koa**                           |
|-----------------------|------------------------------------|------------------------------------|
| **设计理念**         | 全功能框架，模块化设计             | 极简主义，仅核心功能               |
| **异步支持**         | 支持 `async/await`，但历史包袱重    | 原生设计基于 `async/await`         |
| **中间件机制**       | 基于回调，`next()` 触发下一个      | 洋葱模型，支持前后逻辑             |
| **功能内置**         | 自带路由、模板等功能               | 一切需通过中间件实现               |
| **错误处理**         | `next(err)` 触发                  | `try/catch` 捕获更直观             |
| **性能**             | 稍慢，功能更多                    | 稍快，更轻量                       |
| **适合场景**         | 快速开发、对功能集成要求高         | 自定义化需求强、现代开发           |

---

### 8. **选择建议**
- **选择 Express：**
  - 需要快速开发、简单配置。
  - 项目需要内置的路由、模板引擎等功能。
  - 开发团队对传统 Node.js 风格熟悉。

- **选择 Koa：**
  - 追求现代化开发体验，依赖 async/await。
  - 需要更灵活的中间件管理或极简架构。
  - 更关注性能和轻量化。