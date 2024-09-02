## 1.粘性定位
[position:sticky](https://www.bilibili.com/video/BV1C8411Q7Gm/?spm_id_from=333.337.search-card.all.click&vd_source=78435c3cefd4783245d9d16d09d19859)

## 2.will-change
`will-change` 是 CSS 中的一个属性，用于告诉浏览器某个元素即将发生变化，从而允许浏览器提前进行优化。这可以提高动画和过渡的性能，减少重绘和重排的次数。

### 语法
```css
.element {
    will-change: property;
}
```

### 可用的属性值
- `auto`：默认值，表示不进行任何优化。
- `scroll-position`：表示元素的滚动位置可能会改变。
- `contents`：表示元素的内容可能会改变。
- `transform`：表示元素的变换（如旋转、缩放）可能会改变。
- `opacity`：表示元素的不透明度可能会改变。
- `left`、`top`、`right`、`bottom`、`width`、`height` 等：表示这些具体的 CSS 属性可能会改变。

### 示例
```css
.box {
    will-change: transform, opacity; /* 提前告知浏览器将要进行变换和不透明度变化 */
}
```

### 使用注意事项
1. **性能优化**：使用 `will-change` 可以提高性能，但过度使用可能导致内存消耗增加，因此应谨慎使用。
2. **及时移除**：在不再需要优化时，最好移除 `will-change` 属性，以避免不必要的资源占用。
