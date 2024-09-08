# 一、24年9月5日 第一次学习
## [lteetcode-494-目标和](https://leetcode.cn/problems/target-sum/description/)
[新版讲解](https://www.bilibili.com/read/cv37882178/?spm_id_from=333.999.0.0)
### 思路
本题要如何使表达式结果为target，
既然为target，那么就一定有 left组合 - right组合 = target。
left + right = sum，而sum是固定的。`right = sum - left`
公式来了， `left - (sum - left) = target` 推导出  `left = (target + sum)/2` 。
target是固定的，sum是固定的，left就可以求出来。
此时问题就是在集合nums中找出和为left的组合。

**递推公式：**
- 不放物品i：即背包容量为j，里面不放物品i，装满有`dp[i - 1][j]`中方法。
- 放物品i： 即：先空出物品i的容量，背包容量为（j - 物品i容量），放满背包有 `dp[i - 1][j - 物品i容量]` 种方法。 
- 考到这个递推公式，我们应该注意到，`j - nums[i]` 作为数组下标，如果 `j - nums[i]` 小于零呢？
- 说明背包容量装不下 物品i，所以此时装满背包的方法值 等于 不放物品i的装满背包的方法，即：`dp[i][j] = dp[i - 1][j]`;

所以递推公式：
```js
if (nums[i] > j) dp[i][j] = dp[i - 1][j];
else dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i]]; 
```
一维递推公式：
```js
dp[j] = dp[j] + dp[j - nums[i]] ，即：dp[j] += dp[j - nums[i]] 
```
**初始化**
- 装满背包容量为0 的方法数量是1，即 放0件物品。
- 那么最上行`dp[0][j]` 如何初始化呢？
`dp[0][j]`：只放物品0， 把容量为j的背包填满有几种方法。
只有背包容量为 物品0 的容量的时候，方法为1，正好装满。
其他情况下，要不是装不满，要不是装不下。
所以初始化：`dp[0][nums[0]] = 1` ，其他均为0 。 


