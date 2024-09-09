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

## 3.标准盒模型和IE盒模型
1. **标准盒模型（W3C盒模型）**：box-sizing: content-box 指定使用标准盒模型。
- 在标准盒模型中，元素的宽度和高度只包括内容区域。内边距、边框和外边距不包括在内，它们会额外添加到内容区域的尺寸上。
2. **IE盒模型（怪异盒模型）**：box-sizing: border-box 指定使用IE盒模型。
- 在IE盒模型中，元素设置的宽度和高度包括内容、内边距和边框，但不包括外边距。这意味着，元素的实际宽度是宽度值加上左右内边距和边框的宽度。

## 4.权重
1. !important (10000)
2. 内联（1000）
3. ID选择器（0100）
4. 类选择器（0010）
5. 标签选择器（0001）

## 5.BFC
[css可视化模型](https://juejin.cn/post/6844903574535667719#heading-44)

### 如何触发 BFC？
1. 根元素
2. float属性不为none
3. position为absolute或fixed
4. display为inline-block, flex, inline-flex，table，table-cell，table-caption，grid
5. overflow不为visible

### 特点
1. 内部box在垂直方向，一个接一个的放置
2. box的垂直方向由margin决定，属于同一个BFC的两个box间的margin会重叠
3. BFC区域不会与float box重叠（可用于排版)
4. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
5. 计算BFC的高度时，浮动元素也参与计算（不会浮动坍塌）

### 作用
1. 避免外距重叠
2. 撑起父元素高度
3. 两个兄弟元素，第一个设置浮动后，会脱离文档流，下边的元素会上来被第一个元素覆盖，为第二个元素触发 BFC，则区域不会与 BFC 重叠，水平排布在期后边
