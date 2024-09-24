# 一、24年9月24日 第一次学习
## [lteetcode-54-螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/description/)

### 思路
![一层一层遍历](https://pic.leetcode-cn.com/42ee2ec6854ee79ac2b7c91259d2ad5db70522668d11fc691e9e14426918a666-image.png)
![不成环不遍历了](https://pic.leetcode-cn.com/b9616323085f8cecbee4b9e4a42e8368d11e9a2ae971ce83e9830b719157959c-image.png)
1. 四个边界
    - 上边界 `top : 0`
    - 下边界 `bottom : matrix.length - 1`
    - 左边界 `left : 0`
    - 右边界 `right : matrix[0].length - 1`
2. 矩阵不一定是方阵
   - `top < bottom && left < right` 是循环的条件
3. 无法构成“环”了，就退出循环，退出时可能是这 3 种情况之一：
    - `top == bottom && left < right` —— 剩一行
    - `top < bottom && left == right` —— 剩一列
    - `top == bottom && left == right` —— 剩一项（也算 一行/列）
