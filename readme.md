[TOC]

## 二级标题, 符号使用半角符号+ 空格更符合规范
## 这个标题拥有 1 个 id {#my_id}
## 这个标题有 2 个 classes {.class1 .class2}
### 三级标题

# 字体相关
**强调语句** 使用cmd+ B，或者直接** 或 __也可以强调__ ,不强调样式

*斜体语句* 使用cmd+ I，或者直接** 或 _也可以斜体_ 

***斜体加强调语句*** 使用cmd+ I，或者直接*** 或 ___也可以强调___

~~删除语句~~, 是半角~~

==高亮==

- 特殊数学符号等 30^th^, 2^8^, H~2~O

### 悬浮注释
*[HTML]: Hyper Text Markup Language 这是注释
*[W3C]: World Wide Web Consortium
The HTML specification
is maintained by the W3C.

---




# 列表相关

- 无序列表可以使用- or + 加空格
- 回车后自动增加列表
  - 回车后按 tab 进行下一行缩进


1. 有序列表
2. 有序列表
   1. 按 tab 也是缩进列表
   
---

# 链接相关

> 可以使用注释[^1]

[^1]: 这里便是注释的内容

https://github.com - 自动生成
[指向百度的链接,必须要 https://开头才能跳转网页](https://www.baidu.com)

[跳转文本内的内容](#二级标题-符号使用半角符号-空格更符合规范)

![event loop](/old/eventloop.png)

---

# 代码块相关

> 这是引用
> > 引用可以嵌套

`document.getElementById // 代码行`

```javascript {.line-numbers highlight=1-4}
// 代码块
Function.prototype.myCall = function(context,...args) {
    context = context || window;
    const symbolKey = Symbol();
    context[symbolKey] = this;
    const res = context[symbolKey](...args);
    delete context[symbolKey];
    return res;
}
```

```javascript {.line-numbers highlight=[1-2 5-7]}
// 代码块
Function.prototype.myCall = function(context,...args) {
    context = context || window;
    const symbolKey = Symbol();
    context[symbolKey] = this;
    const res = context[symbolKey](...args);
    delete context[symbolKey];
    return res;
}
```

### todolist
- [ ] 第一条
- [ ] this is an incomplete item
- [x] this is an incomplete item

### 内联 html 代码

<h5>可以直接写html 代码</h5>
<div style="color: red">
    html代码
</div>




