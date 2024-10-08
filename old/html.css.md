## 1.形成图层
浏览器1.解析html-2.形成dom树-3.解析css-4.形成css树-5.css样式计算-6.dom树和形成css tree形成布局树-7.形成图层树-8.绘制(根据各图层分别绘制，一个一个绘制 GPU)-8.最后组合图层
- css 3d
- position:fixed
- video
- canvas
- css3动画节点

## 2.BFC块级格式化上下文
BFC（块级格式化上下文）是 CSS 中的一个概念，用于控制块级元素如何布局和相互影响。BFC 是一个独立的渲染区域，具有一套规则来决定其内部元素的布局方式。下面是关于 BFC 的详细规则：

创建 BFC：

根元素（HTML）和浮动元素（float 不为 none）会自动创建 BFC。
设置 display 属性为 inline-block、table-cell、table-caption、flex、inline-flex、grid 或 inline-grid 的元素也会创建 BFC。
使用 overflow 属性（除了 visible）设置为非默认值的元素也会创建 BFC。
BFC 的布局规则：

BFC 内部的元素在垂直方向上一个接一个地排列。
相邻的块级元素会垂直排列，它们的边距会叠加（margin collapse）。
BFC 内部的元素不会超出其包含块的边界。
BFC 内部的浮动元素会被包含在其中，不会溢出到外部。
BFC 内部的元素在计算高度时会考虑浮动元素。
BFC 的特性和应用：

边距叠加（margin collapse）：相邻的两个块级元素的上下边距会合并为一个较大的边距。
清除浮动：将父元素设置为 BFC 可以清除其内部浮动元素对布局的影响。
阻止浮动元素溢出：将包含浮动元素的容器设置为 BFC 可以防止浮动元素溢出到外部。
创建自适应的两栏布局：使用 BFC 可以创建具有自适应高度的两栏布局，其中一栏高度根据内容自动撑开。
BFC 是 CSS 布局中一个重要的概念，它可以帮助我们更好地控制和管理元素的布局行为，解决一些常见的布局问题。

## 3.开发时如何利用这些规则
在开发过程中，可以利用 BFC 的规则来解决一些布局问题和优化页面的显示效果。以下是一些利用 BFC 规则的实际应用：

清除浮动：当父元素包含浮动元素时，可以将父元素设置为 BFC，以清除浮动对布局的影响。通过设置 overflow: hidden、overflow: auto 或 display: flow-root，可以触发父元素的 BFC 特性，使其能够正确包含浮动元素。

阻止边距叠加：当相邻的两个块级元素的边距叠加时，可以将其中一个元素设置为 BFC，以阻止边距叠加。可以通过设置 overflow: hidden、display: inline-block 或 float: left/right 来创建 BFC。

阻止浮动元素溢出：当浮动元素溢出其容器时，可以将容器设置为 BFC，以阻止浮动元素溢出。通过设置 overflow: hidden、overflow: auto 或 display: flow-root，可以创建一个包含浮动元素的 BFC 容器。

创建自适应的两栏布局：通过将容器设置为 BFC，可以创建具有自适应高度的两栏布局。一栏可以使用浮动或绝对定位，另一栏则可以在 BFC 容器中自动撑开。

控制内部元素的布局方式：在 BFC 内部，可以使用浮动、定位和其他布局属性来控制内部元素的布局方式。BFC 可以提供一种独立的渲染环境，使得内部元素不会受到外部元素的影响。

通过合理地应用 BFC 的规则，可以更好地控制页面布局，解决一些常见的布局问题，提升用户体验和页面性能。

<style>
 .abs-box{
    background-color: red;
    position: absolute;
    z-index: 0
  }
  .div-box {
    background-color: rgb(16, 4, 181);
    opacity: 0.9
  }
</style>

<body>
  <div class="box abs-box">absolute box</div>
  <div class="box div-box">div box</div>
</body>