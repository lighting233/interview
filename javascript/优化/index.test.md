# JavaScript中优化手段

## 一、通过数组的在 V8 引擎底层的快、慢数组之分优化遍历速度


## 二、`beginWork`性能优化策略

## 三、事件委托
- 
- 
- 
```js
document.body.addEventListener('touchstart', 
event => {
    if (event.target === area) {
        event.preventDefault()
    }
 }, {passive: true});

```
