//24-8-14 第一次学习

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    //1.排序
    nums.sort((a,b) => a - b);
    const res = [];

    for(let i = 0; i < nums.length - 2; i++) {
        //2.排过序了，第一个就大于 0 了，直接就排除了
        //todo 直接返回结果
        if(nums[i] > 0) return res;
        //3.i去重
        if(i > 0 && nums[i] === nums[i - 1]) {
            continue;
        };
        let left = i + 1, right = nums.length - 1;
        while(left < right) {
            const sum = nums[i] + nums[left] + nums[right]
            if(sum === 0) {
                res.push([nums[i],nums[left],nums[right]]);
                //4.left, right去重
                while(nums[right] === nums[right - 1] && left < right) {
                    right--;
                };
                while(nums[left] === nums[left + 1] && left < right) {
                    left++;
                }
                //todo 5.没有重复的话，进行下一组判断
                left++;
                right--;
            }else if(sum > 0) {
                right--;
            }else {
                left++;
            }
        }
    }

    return res;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
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
    }

    return res;
};