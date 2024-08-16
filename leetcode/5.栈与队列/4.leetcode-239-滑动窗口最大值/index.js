//24-8-17 第一次学习

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    //1.用来存放下标，第一个元素永远维护当前队列最大值的下标
    const queue = [];
    const res = [];
    for (let i = 0; i < nums.length; i++) {
        //2.队列有值时，每当有一个新元素进来，从后到前依次比较一下queue 中的元素，如果小于当前元素，直接出队
        while (queue.length && nums[queue.at(-1)] < nums[i]) {
            queue.pop();
        };
        queue.push(i);
        //3.判断头元素是否需要出队
        if (queue.length && queue[0] < i - k + 1) {
            queue.shift();
        }
        //4.窗口达到 k 大小后，每轮收集结果
        if (i >= k - 1) {
            res.push(nums[queue[0]])
        }
    };
    return res;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {

};