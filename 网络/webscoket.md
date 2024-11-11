# websocket
可以使用sockt.io这个库,集成了心跳检测,并向下兼容,不支持websocket的使用轮询
## 1.心跳检测和断线重连机制
```js {.line-numbers}
class WebSocketClient {
  constructor(url, options = {}) {
    this.url = url;
    this.heartbeatInterval = options.heartbeatInterval || 5000; // 心跳发送间隔
    this.timeoutInterval = options.timeoutInterval || 3000; // 等待响应超时时间
    this.reconnectInterval = options.reconnectInterval || 5000; // 重连间隔
    this.maxReconnectAttempts = options.maxReconnectAttempts || 10;
    this.reconnectAttempts = 0;
    this.ws = null;
    this.heartbeatTimer = null;
    this.timeoutTimer = null;

    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.startHeartbeat();
    };

    this.ws.onmessage = (message) => {
      console.log('Received message:', message.data);
      this.resetTimeout(); // 收到任何消息都可以重置超时定时器
    };

    this.ws.onclose = () => {
      console.log('WebSocket closed');
      this.stopHeartbeat();
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.ws.close(); // 遇到错误时关闭连接以触发重连逻辑
    };
  }

  startHeartbeat() {
    this.stopHeartbeat(); // 清除之前的定时器
    this.heartbeatTimer = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        console.log('Sending heartbeat');
        this.ws.send(JSON.stringify({ type: 'ping' })); // 发送心跳包
        this.startTimeout(); // 开始等待服务器响应的超时计时
      } else {
        console.warn('WebSocket is not open. Stopping heartbeat.');
        this.stopHeartbeat();
      }
    }, this.heartbeatInterval);
  }

  startTimeout() {
    this.stopTimeout(); // 清除之前的超时定时器
    this.timeoutTimer = setTimeout(() => {
      console.warn('Heartbeat timeout. No response received.');
      this.ws.close(); // 超时则关闭连接以触发重连逻辑
    }, this.timeoutInterval);
  }

  resetTimeout() {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null; // 清除超时定时器，表明响应已收到
    }
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    this.stopTimeout();
  }

  stopTimeout() {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      console.log(`Attempting to reconnect... (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);

      // 关闭并清理旧的 WebSocket 实例
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.close();
    }
    
      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect();
      }, this.reconnectInterval);
    } else {
      console.error('Max reconnect attempts reached. Could not reconnect.');
    }
  }

  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      console.warn('WebSocket is not open. Unable to send message.');
    }
  }

  close() {
    this.stopHeartbeat();
    this.ws.close();
  }
}

// 使用示例
const wsClient = new WebSocketClient('wss://example.com/socket', {
  heartbeatInterval: 10000, // 心跳检测间隔
  timeoutInterval: 5000,    // 超时等待时间
  reconnectInterval: 5000,  // 重连间隔
  maxReconnectAttempts: 10  // 最大重连次数
});

// 发送消息
wsClient.send(JSON.stringify({ message: 'Hello, server!' }));

```

## 2.ws.readyState 

```js 
const ws = new WebSocket('wss://example.com/socket');

ws.onopen = () => {
  console.log('WebSocket is open:', ws.readyState); // 输出 1
  ws.send('Hello, server!');
};

ws.onclose = () => {
  console.log('WebSocket is closed:', ws.readyState); // 输出 3
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// 检查连接状态
if (ws.readyState === WebSocket.OPEN) {
  console.log('WebSocket connection is open and ready to send data.');
} else {
  console.log('WebSocket is not open. Current state:', ws.readyState);
}

```

## 3.websocket存在跨域问题吗?
WebSocket 本身不会像传统的 HTTP 请求那样受到同源策略（SOP）的约束，因此不会在浏览器端直接触发跨域限制。然而，WebSocket 在一些情况下可能涉及到类似跨域的问题，这些问题主要与服务器端的配置和安全性有关：
在 WebSocket 握手请求中，浏览器会自动包含 Origin 头字段，指明请求的来源（页面所在的域）。服务器可以根据 Origin 头来决定是否接受该 WebSocket 连接。这类似于 CORS 的用途，但实现方式不同。
### 1. **浏览器端：**
- 浏览器在建立 WebSocket 连接时，不会因为协议、端口或域名的不同而阻止连接。因此，`WebSocket` 是不受传统同源策略约束的，浏览器可以向不同源的 WebSocket 服务器发起连接。
- **示例**：
  ```javascript
  const ws = new WebSocket('wss://example.com:12345/socket');
  ```

### 2. **服务器端：**
- 服务器端可以配置是否允许来自不同源的 WebSocket 连接。为了保护服务器免受恶意请求，通常需要配置服务器端的跨域策略或验证机制。
- WebSocket 不使用 HTTP 请求头中的 `Origin` 检查来阻止连接，因此，如果应用有跨域安全需求，开发者需要在服务器端手动处理这些验证。

### 3. **WebSocket 协议与握手：**
- WebSocket 连接的建立是通过 HTTP 协议进行初始握手的。浏览器在请求握手时会发送 `Origin` 请求头，服务器可以根据此头信息决定是否接受连接。
- 如果服务器需要防止跨域请求，可以在 WebSocket 握手阶段对 `Origin` 进行检查，以限制允许的源。

### 4. **跨域问题与解决方案：**
- 虽然 WebSocket 客户端不受同源策略限制，但服务器端需要考虑安全性。常见的解决方法包括：
  - **验证 Origin**：在服务器端手动检查 `Origin` 请求头，只有允许的来源可以建立连接。
  - **CORS 配置**：虽然 CORS 本身不适用于 WebSocket，但一些服务器框架提供了类似的机制来处理 WebSocket 请求的跨域检查。

### 5. **常见服务器配置：**
- **Node.js (使用 `ws` 模块)**：
  ```javascript
  const WebSocket = require('ws');
  const server = new WebSocket.Server({ port: 8080 });

  server.on('connection', (ws, req) => {
    const origin = req.headers['origin'];
    if (origin !== 'https://allowed-origin.com') {
      ws.close();
    } else {
      console.log('WebSocket connection accepted from', origin);
    }
  });
  ```

- **Nginx 反向代理配置**：用于在前端和 WebSocket 服务器之间进行代理，以确保连接正常。
  ```nginx
  server {
      listen 80;
      server_name example.com;

      location /socket/ {
          proxy_pass http://backend_server:8080;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "Upgrade";
      }
  }
  ```

### 总结：
WebSocket 客户端本身不会因为跨域问题被阻止连接，但服务器端可能需要进行配置来确保安全性和符合应用需求。通常的安全措施是检查 `Origin` 头来验证来源，或者使用反向代理来处理 WebSocket 连接。