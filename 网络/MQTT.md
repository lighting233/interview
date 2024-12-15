### [MQTT](https://mqtt.p2hp.com/mqtt-5-0)
物联网常用协议,是一种**轻量级**的消息传输协议，专为**低带宽**、**高延迟**或**不可靠**的网络设计

#### 特点
**优点**:
1. **轻量**: 二进制协议格式,参考HTTP2?带宽需求低
2. **基于发布订阅**
   - 客户端既是subscriber也是publisher
   - 需要有一个消息代理中心Broker
   - TCP协议支持单播,基于TCP的协议想实现广播所以使用发布订阅?
   - **Retain机制**:订阅者只能接收在订阅之后发布的消息，但如果发布者事先发布了带有Retain标志的消息，那么订阅者就能在订阅后马上收到消息。(中介保存带有Retain标志的消息)
   - **WILL机制**:发布者注册时注册WILL主题,断联时WILL消息传递给订阅者
   - **Clean session机制**:订阅者连接时Clean session标志为0,断联时中介需保存Qos1,Qos2消息,重连时发送
3. **可靠性**: 基于TCP/IP,那么可以双向全双工,长连接,超时重传?继承可靠性不误码,不重复,不丢失,有序性?
4. **跨平台支持**: 如node使用mqtt协议,web端需要使用的mqtt是基于websocket协议封装的?

**缺点**:
1. 需要部署专门的Broker
2. 如需要安全性保证,需部署私有的Broker配合SSL协议加密
3. 不适合大文件或实时性高的场景

#### [提供三种消息服务质量（QoS）](https://cloud.tencent.com/developer/article/1861806)
[Qos0](https://ask.qcloudimg.com/http-save/yehe-8913398/c64af51aff6a6963caf27359247c63dd.png)
1. >QoS0：“至多一次”，消息发布完全依赖底层TCP/IP网络。会发生消息丢失或重复。这一级别可用于如下 情况，环境传感器数据，丢失一次读记录无所谓，因为不久后还会有第二次发送。这一种方式主要普通APP的 推送，倘若你的智能设备在消息推送时未联网，推送过去没收到，再次联网也就收不到了。
我的理解:类似于直播基于UDP的原理,不关心丢包,因为实时传输的每个包丢包并不重要
[Qos1](https://ask.qcloudimg.com/http-save/yehe-8913398/5b3c1555fce7f065c443c7d3e75bb074.png)
2. >QoS1：“至少一次”，确保消息到达，但消息重复可能会发生。
我的理解:QoS1的设计目标是确保消息送达，但并不跟踪是否已经处理过，因此可能会导致重复接收。超时即重传,接收端的ACK丢失了,就可能收到多余的消息
[Qos2](https://ask.qcloudimg.com/http-save/yehe-8913398/be8fce0a5affa41f0056f8d98e46415d.png)
3. >QoS2：“只有一次”，确保消息到达一次。在一些要求比较严格的计费系统中，可以使用此级别。在计费 系统中，消息重复或丢失会导致不正确的结果。这种最高质量的消息发布服务还可以用于即时通讯类的APP的 推送，确保用户收到且只会收到一次。
我的理解: ~~TCP的确认机制,有序性,不重复~~四次握手机制?

### MQTT协议在无人机中的应用
- 可以用于将无人机的遥测数据（如 GPS 坐标、电池电量、速度等）发送到云端，以便远程监控。如:一组无人机在农业环境中采集数据并上传到云端进行分析,或上传无人机的状态等
- 可用于远程发送无人机指令，例如起飞、降落或飞行路径规划。
- 因为可以广播,所以在无人机编队中可以广播消息,发送指令到特定的机器

--------------------------

### 基本使用方法(chatGPT总结)

#### **1. CONNECT 和 CONNACK**
- **功能**：客户端向 Broker 发起连接请求（CONNECT），Broker 返回连接确认（CONNACK）。
- **使用场景**：建立 MQTT 连接时，CONNECT 是第一个发送的控制报文。

**示例：客户端连接到 Broker**
```javascript
const mqtt = require('mqtt');

// 连接到 Broker
const client = mqtt.connect('mqtt://broker.example.com', {
    clientId: 'mqtt_client_01',
    username: 'user',
    password: 'password'
});

client.on('connect', () => {
    console.log('Connected to broker');
});
```

---

#### **2. PUBLISH 和 PUBACK**
- **功能**：客户端发布消息到指定主题（PUBLISH），接收方返回确认（PUBACK，QoS 1）。
- **使用场景**：传递传感器数据、设备状态等。

**示例：发布消息**
```javascript
client.publish('home/temperature', JSON.stringify({ value: 22.5, unit: 'C' }), { qos: 1 }, (err) => {
    if (err) {
        console.error('Publish failed:', err);
    } else {
        console.log('Message published successfully');
    }
});
```

---

#### **3. PUBREC、PUBREL 和 PUBCOMP**
- **功能**：用于 QoS 2（Exactly Once）的四步握手机制，确保消息“恰好一次”传递。
  1. **PUBLISH**：客户端发送消息。
  2. **PUBREC**：Broker 确认收到消息。
  3. **PUBREL**：客户端确认消息释放。
  4. **PUBCOMP**：Broker 确认完成。

**使用场景**：需要严格避免消息重复，例如交易类数据传输。

---

#### **4. SUBSCRIBE 和 SUBACK**
- **功能**：客户端订阅指定主题（SUBSCRIBE），Broker 返回确认（SUBACK）。
- **使用场景**：客户端想要接收特定主题的消息。

**示例：订阅主题**
```javascript
client.subscribe('home/temperature', { qos: 1 }, (err, granted) => {
    if (err) {
        console.error('Subscribe failed:', err);
    } else {
        console.log('Subscribed successfully:', granted);
    }
});
```

---

#### **5. UNSUBSCRIBE 和 UNSUBACK**
- **功能**：取消订阅某主题（UNSUBSCRIBE），Broker 返回确认（UNSUBACK）。
- **使用场景**：客户端不再需要接收某主题的消息。

**示例：取消订阅主题**
```javascript
client.unsubscribe('home/temperature', (err) => {
    if (err) {
        console.error('Unsubscribe failed:', err);
    } else {
        console.log('Unsubscribed successfully');
    }
});
```

---

#### **6. PINGREQ 和 PINGRESP**
- **功能**：客户端发送心跳请求（PINGREQ），Broker 返回响应（PINGRESP）。
- **使用场景**：保持客户端与 Broker 的连接活跃，防止超时断开。

**示例：保持连接（心跳由库自动处理）**
```javascript
// 默认配置中，mqtt.js 会自动发送心跳，无需手动触发
client.on('pingresp', () => {
    console.log('Ping response received');
});
```

---

#### **7. DISCONNECT**
- **功能**：客户端主动断开与 Broker 的连接。
- **使用场景**：完成任务后，主动释放连接。

**示例：断开连接**
```javascript
client.end(() => {
    console.log('Disconnected from broker');
});
```

---

#### **8. AUTH**
- **功能**：用于扩展认证机制，例如 OAuth、JWT。
- **使用场景**：需要增强安全性和复杂认证流程时使用（MQTT 5 引入）。

---