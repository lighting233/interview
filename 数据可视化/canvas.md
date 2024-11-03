# canvas

## **1.使用canvas绘图如何保证不同分辨率下不失真?**
为了在不同分辨率和高 DPI 屏幕（如 Retina 屏幕）上使用 `<canvas>` 绘图时避免失真，需要适当地设置 `canvas` 的尺寸和样式，以保证绘图的清晰度。以下是实现方法的详细步骤：

### 1. 了解逻辑像素和物理像素
- **逻辑像素**：网页中设置的 `width` 和 `height`。
- **物理像素**：设备实际使用的像素。高 DPI 设备中，物理像素与逻辑像素的比例（`devicePixelRatio`）可能大于 1。

### 2. 检测 `devicePixelRatio`
`devicePixelRatio` 是设备的物理像素与逻辑像素的比率。常见的高分辨率屏幕如 Retina 显示器的 `devicePixelRatio` 可能是 2 或更高。

### 3. 设置 `canvas` 的高分辨率显示
为了让 `<canvas>` 在高 DPI 屏幕上显示清晰，需要将其绘图缓冲区的大小设置为样式尺寸的 `devicePixelRatio` 倍。

```javascript
// 获取 canvas 元素
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// 获取设备像素比
const devicePixelRatio = window.devicePixelRatio || 1;

// 设置 canvas 的实际绘图尺寸
const width = 300; // 样式宽度
const height = 150; // 样式高度

canvas.width = width * devicePixelRatio;
canvas.height = height * devicePixelRatio;

// 设置 canvas 的样式尺寸（逻辑像素）
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;

// 将绘图上下文的缩放设置为 devicePixelRatio
context.scale(devicePixelRatio, devicePixelRatio);

// 绘制示例图形
context.fillStyle = 'blue';
context.fillRect(10, 10, 100, 50);
```

### 4. 工作原理解释
- **`canvas.width` 和 `canvas.height`** 控制实际绘图缓冲区的大小。
- **`canvas.style.width` 和 `canvas.style.height`** 控制逻辑上的样式尺寸，即在页面上显示的大小。
- **`context.scale(devicePixelRatio, devicePixelRatio)`** 用于将绘图上下文的坐标系缩放，以便绘制的图形按实际物理像素比例显示。

### 5. 优点
- 使用这种方法，可以让 `<canvas>` 绘制的图形在高 DPI 屏幕上保持清晰而不失真。

### 6. 注意事项
- 在 `context.scale` 之后，所有绘制操作都基于缩放后的坐标系进行，因此需要根据新的比例来调整绘图操作。
- 调整 `canvas` 的大小会清空它的内容，因此应在设置尺寸后再进行绘制操作。

通过这一步骤，您可以确保 `<canvas>` 元素在不同设备的分辨率和 DPI 设置下，都能保持高质量的绘制效果。