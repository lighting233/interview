# dom操作相关

## **1.querySelector**
`querySelector` 是一个非常有用的 DOM 方法，用于在文档中查找并返回与指定的 CSS 选择器匹配的第一个元素。它是现代 JavaScript 和 Web 开发中常用的工具，能够简化元素的选择和操作。

### 1. 基本用法

```javascript
const element = document.querySelector(selector);
```

- **selector**：一个字符串，表示要匹配的 CSS 选择器。

### 2. 返回值

- `querySelector` 返回文档中匹配指定选择器的第一个元素。如果没有找到匹配的元素，则返回 `null`。

### 3. 示例

#### 3.1 选择单个元素

```html
<div class="container">
    <p class="text">Hello, World!</p>
</div>

<script>
    const paragraph = document.querySelector('.text');
    console.log(paragraph.textContent); // 输出: Hello, World!
</script>
```

在这个例子中，`querySelector` 选择了类名为 `text` 的第一个 `<p>` 元素。

#### 3.2 选择嵌套元素

```html
<div class="container">
    <div class="item">
        <p class="text">Item 1</p>
    </div>
    <div class="item">
        <p class="text">Item 2</p>
    </div>
</div>

<script>
    const firstItemText = document.querySelector('.item .text');
    console.log(firstItemText.textContent); // 输出: Item 1
</script>
```

在这个例子中，`querySelector` 选择了第一个 `.item` 内的 `.text` 元素。

#### 3.3 选择 ID 元素

```html
<div id="uniqueElement">This is unique</div>

<script>
    const uniqueElement = document.querySelector('#uniqueElement');
    console.log(uniqueElement.textContent); // 输出: This is unique
</script>
```

这里，`querySelector` 使用 ID 选择器选择了具有特定 ID 的元素。

### 4. 选择多个元素

如果你想选择多个元素，可以使用 `querySelectorAll` 方法，它返回一个 NodeList，包含所有匹配的元素。

```javascript
const items = document.querySelectorAll('.item');
items.forEach(item => {
    console.log(item.textContent);
});
```

### 5. 注意事项

- **选择器的优先级**：`querySelector` 只返回第一个匹配的元素。如果需要所有匹配的元素，请使用 `querySelectorAll`。
- **性能**：在大型文档中，使用 `querySelector` 可能会比使用 `getElementById` 或 `getElementsByClassName` 稍慢，因为它支持更复杂的选择器。
- **CSS 选择器**：`querySelector` 支持所有有效的 CSS 选择器，包括类选择器、ID 选择器、属性选择器、伪类等。

### 6. 总结

`querySelector` 是一个强大且灵活的方法，用于在 DOM 中查找元素。它使得选择和操作元素变得简单直观，适用于各种场景。通过使用 CSS 选择器，你可以轻松地选择所需的元素并进行操作。

---