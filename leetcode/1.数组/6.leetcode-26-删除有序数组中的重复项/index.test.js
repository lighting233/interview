/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let slow = fast = 0;
    while(fast < nums.length) {
        if(nums[fast] !== nums[slow]) {
            //todo slow + 1
            nums[slow + 1] = nums[fast];
            slow++;
        };
        fast++;
    };

    //todo slow + 1
    return slow + 1;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {

};