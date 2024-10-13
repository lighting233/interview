# webComponent

## 代码示例
```html { .line-numbers }
<html>
<head>
</head>
<body>
<user-card></user-card>
<template id='userCardId'>
  <!--组件的样式与代码封装在一起，只对自定义元素生效，不会影响外部的全局样式。-->
  <style>
    .name{
        color:red;
        font-size: 50px;
    }
    button{
        width:200px;
    }  
  </style>
  <p class='name'>21312</p>
  <button>test</button>
</template>
<script>
  class UserCard extends HTMLElement {
    constructor() {
      super()
      var shadow = this.attachShadow({ mode:'closed'});
      
      var templateElem = document.getElementById('userCardId')
      var content = templateElem.content.cloneNode(true)
      
      
      // this.appendChild(content)
      shadow.appendChild(content)
    }
  }

  window.customElements.define('user-card', UserCard)
</script>
</body>
</html>
```
## WebComponent主要就是三个规范：
1. `Custom Elements`规范
    可以创建一个自定义标签。根据规范，自定义元素的名称必须包含连词线”-“，用与区别原生的 HTML 元素。
    可以指定多个不同的回调函数，它们将会在元素的不同生命时期被调用。

2. templates 规范
提供了`<template>`标签，可以在它里面使用HTML定义DOM结构。

3. `Shadow DOM`规范
下图中，看一下右侧的HTML结构，我们可以展开标记看到里面的结构。是不是有种白封装了的感觉。如果只有这样的效果的话，跟模板引擎渲染组件的效果是一样的。所以我们不希望用户能够看到的内部代码，WebComponent 允许内部代码隐藏起来，这叫做 Shadow DOM，即这部分 DOM 默认与外部 DOM 隔离，内部任何代码都无法影响外部。

