# 一、24年8月14日 第一次学习
## [lteetcode-459-重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/description/)

### 1.假设字符串s是由s1+s2组成的，s+s后，str就变成了s1+s2+s1+s2，去掉首尾，破环了首尾的s1和s2，变成了s3+s2+s1+s4,此时str中间就是s2+s1,如果s是循环字串，也就是s1=s2,所以str中间的s2+s1就和原字符串相等。如果s不是循环字串，s1!=s2，那么s1+s2是不等于s2+s1的，也就是str中间不包含s


### 2.建议把s1=s2改为s1=N*s2, N是自然数 , 不影响你的证明, 但是更严谨。比如abcabcabc的情况

- 题目强调能否由子串**重复多次构成**
- 'a'不能由它的子串'a'重复多次构成