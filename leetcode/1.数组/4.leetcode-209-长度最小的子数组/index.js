//24-8-10 第一次学习

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
 var minSubArrayLen = function(target, nums) {
    //1.minLen要初始为最大值
    let minLen = Infinity;
    let start = 0;
    let sum = 0;
    //2.移动终止位置的指针向后移动
    for(let end = 0; end < nums.length; end++) {
        sum+=nums[end];

        //3.这里一定是 while，因为找到大于等于 target 的集合后，起始位置还要不停的后移，来试图找到更短的集合
        while(sum >= target) {
            //todo 4.求的是长度不是值
            minLen = Math.min(end - start + 1, minLen);
            sum-=nums[start];
            start++;
        }
    }
    //todo 5.如果没有找到，要返回 0
    return minLen === Infinity ? 0 : minLen;
 };

//24-8-10 第一次测试

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
 var minSubArrayLen = function(target, nums) {
    //1.minLen初始位最大值
    let minLen = Infinity;
    let sum = 0;
    let start = 0;
    //2.先移动的指针指向区间终点，如果指向起点，则找终点和双层循环一样，又遍历一遍
    for(let end = 0; end < nums.length; end++) {
        sum += nums[end];

        //3.找到>=的目标值时处理，需要用 while 来更新起始位置
        while(sum >= target) {
            //4.更新的是区间长度
            minLen = Math.min(end - start + 1, minLen);
            sum-=nums[start];
            start++;
        }
    };

    //5.如果没有找到，要返回 0
    return minLen === Infinity ? 0 : minLen;
 };