 //24-8-20 第二次测试


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function(nums, k) {
    const queue = [];
    const res = []
    for(let i = 0; i < nums.length; i++) {
        //todo nums
        while(queue.length && nums[queue.at(-1)] < nums[i]) {
            queue.pop();
        };
        queue.push(i);

        if(queue[0] < i - k + 1) {
            queue.shift();
        };

        //todo 不是大于 2，k 的长度是变化的
        if(i >= k - 1) {
            //todo nums[queue[0]]
            res.push(nums[queue[0]])
        }
    };

    return res;
 };

