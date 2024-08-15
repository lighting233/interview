//24-8-14 第二次测试


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    nums.sort((a, b) => a - b);
    const res = [];

    for (let i = 0; i < nums.length - 3; i++) {
        if (nums[i] > 0 && nums[i] > target) return res;
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        for (let j = i + 1; j < nums.length - 2; j++) {
            if(nums[i] + nums[j] > 0 && nums[i] + nums[j] > target) break;
            //todo j > i + 1
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            let left = j + 1, right = nums.length - 1;

            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if (sum === target) {
                    res.push([nums[i], nums[j], nums[left], nums[right]]);
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    left++;
                    right--;
                } else if (sum > target) {
                    right--;
                } else {
                    left++;
                }
            }
        }


    };

    return res;
};

