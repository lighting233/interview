//24-8-14 第二次测试


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    //todo 排序
    nums.sort((a,b) => a - b);
    const res = [];

    for(let i = 0; i < nums.length - 2; i++) {
        if(nums[i] > 0) return res;
        if(i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1, right = nums.length - 1;

        while(left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if(sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                while(left < right && nums[right] === nums[right - 1]) right--;
                while(left < right && nums[left] === nums[left + 1]) left++;
                left++;
                right--;
            }else if(sum > 0) {
                right--;
            }else {
                left++;
            }
        }
    };

    return res;
};

