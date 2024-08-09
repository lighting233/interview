//24-8-9 第一次学习

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
 var removeElement = function(nums, val) {
    //1.首先判空
    if(nums.length === 0) return 0;

    let slow = 0;

    //2.快指针开始移动
    for(let fast = 0; fast < nums.length; fast++) {
        //3.获取新数组的操作,快指针指向的元素不等于目标值就是获取新数组元素的时候
        if(nums[fast] !== val) {
            //4.当寻找到新数组所需的元素时，需要更新到的下标值，就是慢指针所在的位置
            nums[slow] = nums[fast];
            //5.更新后慢指针也移动一位
            slow++;
        }
    }

    //todo 6.因为每次更新完新数组，慢指针都向后移了一位，所以直接返回slow 即可
    //返回慢指针值 + 1，即为新数组长度，这句之前错了
    return slow;
 };

//24-8-9 第一次测试

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
 var removeElement = function(nums, val) {
    //1.判空
    if(nums.length === 0) return 0;
    let slow = 0;
    //2.快指针移动，寻找新数组所需元素
    for(let fast = 0; fast < nums.length; fast++) {
        //3.找到新数组元素需要处理
        //todo 快指针指向的元素不等于目标值就是获取新数组元素的时候
        // if(nums[fast] === val) {
        if(nums[fast] !== val){
            //4.慢指针的下标即是新元素所要存放的位置
            nums[slow] = nums[fast];
            //5.慢指针也需要向前更新一步
            slow++;
        }
    }
    //6.因为最后更新了一步，所以直接返回 slow 即为数组长度
    return slow;
 };