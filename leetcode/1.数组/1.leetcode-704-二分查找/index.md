# 一、24年8月9日 第一次学习
## [lteetcode-704 二分法查找](https://leetcode.cn/problems/binary-search/description/)

### 1.使用二分法的前提
1. 数组为有序数组
2. 数组中**无重复元素**，因为一旦有重复元素，使用二分查找法返回的元素下标可能不是唯一的
### 2.二分法易错的两点

1. 在`while(left < right)`时把握不好是<还是<=
2. 在`if(nums[middle] > target)`时把握不好，right 区间因改变为 `right = middle` 还是 `right = middle - 1`

### 3. 首先要确定好定义的区间, 一般是这两种形式
1. `[left, right]`
2. `[left, right)`

- ==确定好定义的区间，才好在 while 和 if 下进行判断==
- 在每次 while 循环中都坚持好原则（定义的区间）
### 4.左闭右闭区间的写法

- 定义的区间为左闭右闭，所以这个区间在`while(left <= right)`中合法，所以是 left <= right
- 如果`if(nums[middle] > target)`, 说明需要更新右边界，并且已经明确了 middle 不是我们要找的值，所以右边界一定是 middle - 1

#### 为什么右边界用middle会出错？

- 因为把这个不需要的元素重新加入判断，当只剩一个元素时，左右边界相等可以进入 while 循环，例如 target = 6，但剩余元素为[ 3 ]时，每次会进入 while 循环，但边界不会更新，进入死循环。

### 为什么let mid = left + ((right - left) >> 1);不会造成大数溢出。
假设 left 和 right 的值非常大，例如：
``` javascript
let left = 1e18;  // 10^18
let right = 2e18; // 2 * 10^18
let mid = (left + right) / 2; // 可能导致溢出
let mid = left + ((right - left) >> 1); // 不会溢出

```
在这个例子中，right - left 的结果是 1e18，右移一位后是 5e17，加上 left 后不会超过 JavaScript 的安全整数范围。

- ***注意：*** 是let mid = left + ==((== right - left) >> 1 ==)==;而不是const mid = left + ==(== right - left ==)== >> 1;

### 5.左闭右开区间的写法

- 如果左闭右开区间，则 while 循环中 left 与 right 不能相等。因为例如只有一个元素但却满足[1,1)，这不合法，假如左闭右闭 [1,1]， left <= right是合法的。
- 如果`if(nums[middle] > target)`, 说明需要更新右边界，并且已经明确了 middle 不是我们要找的值，并且我们定义的区间本来就不包含 right，所以 right = mid 就可以了
- `let left = 0, right = nums.length;`因为不包含右边界了
  

