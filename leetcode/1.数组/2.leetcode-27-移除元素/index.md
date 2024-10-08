# 一、24年8月9日 第一次学习
## [lteetcode-27 移除元素](https://leetcode.cn/problems/remove-element/)

### 1.涉及数组的概念
- 数组中删除元素，一般不改变数组在内存中的实际大小，被删除的位置会被覆盖，后边的元素前移，只不过被包装后，返回了一个新长度，实际长度没变

### 2.暴力解法
```C++
// 时间复杂度：O(n^2)
// 空间复杂度：O(1)
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int size = nums.size();
        for (int i = 0; i < size; i++) {
            if (nums[i] == val) { // 发现需要移除的元素，就将数组集体向前移动一位
                for (int j = i + 1; j < size; j++) {
                    nums[j - 1] = nums[j];
                }
                i--; // 因为下标i以后的数值都向前移动了一位，所以i也向前移动一位
                size--; // 此时数组的大小-1
            }
        }
        return size;

    }
};
```

### 3.快慢指针解法

1. **快指针**的作用：寻找**新数组**里**所需要**的元素
2. **慢指针**：当寻找到新数组所需的元素时，需要**更新到的下标值**，就是慢指针所在的位置

### 4.什么情况下给慢指针赋值呢？

- 当快指针的元素不等于目标删除元素的时候，因为这个元素才是我们**新数组**所**需要**的元素

### 5.返回值

- 因为每次更新完新数组，慢指针都向后移了一位，所以直接返回slow 即可