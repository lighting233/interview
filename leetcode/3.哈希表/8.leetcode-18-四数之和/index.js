//24-8-14 第一次学习

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 3; i++) {
        //todo 不能直接剪枝，因为可以有负数，例如排序后-4，-1,0,0 求 target = -5
        // if(nums[i] > target) return res;
        if (nums[i] > 0 && nums[i] > target) return res;
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        for (let j = i + 1; j < nums.length - 2; j++) {
            //todo 不能剪枝 [-5,-4,-3,-2,-1,0,0,1,2,3,4,5]， target = 0时，-2 + 5 > 0, 但是[-1,0,0,1]符合题意
            // if(nums[i] + nums[j] > 0 && nums[i] + nums[j]> target) return res;
            if (nums[i] + nums[j] > 0 && nums[i] + nums[j] > target) break;
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            let left = j + 1, right = nums.length - 1;

            while (left < right) {
                //todo sum在 while 内计算
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if (sum === target) {
                    res.push([nums[i], nums[j], nums[left], nums[right]]);

                    while (left < right && nums[right] === nums[right - 1]) {
                        right--
                    };

                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    };
                    left++;
                    right--
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


    }

    return res;
};