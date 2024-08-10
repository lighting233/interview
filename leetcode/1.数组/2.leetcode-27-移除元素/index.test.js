 //24-8-10 第二次测试

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
 var removeElement = function(nums, val) {
    //1.判空
    if(nums.length === 0) return 0;
    //2.快慢指针，构建新数组，
    let slow = 0;

    for(let fast = 0; fast < nums.length; fast++) {
        //3.快指针不等于 val 时，收集新数组元素，
        if(nums[fast] !== val) {
            //4.慢指针保存新元素
            nums[slow] = nums[fast];
            //todo 更新后慢指针也移动一位
            //5.slow++
            slow++;
        }
    }

    //6.由于每次 slow++，所以 slow 等于数组长度
    return slow;
 };