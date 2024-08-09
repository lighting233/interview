//24-8-9 第一次学习

/**
 * 左闭右闭
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    //1.判断空数组
    if (nums.length === 0) return -1;
    //2.确定左闭右闭区间
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        //todo 右移一位是除 2
        // const mid = (left + right) >> 2;
        //todo right - left数不会太大，再加上 left，不会造成大数溢出
        // const mid = left + (right - left) >> 1;
        const mid = left + ((right - left) >> 1);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            //3.因为定义左闭右闭，所以不会包含 mid
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        }
    }

    //4.没有结果返回
    return -1;
};

/**
* 左闭右开
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
var search = function (nums, target) {
    //1.判断空数组
    if (nums.length === 0) return -1;
    //2.确定左闭右开区间， right = nums.length，因为不包含右边界了
    let left = 0, right = nums.length;
    while (left < right) {
        //todo 右移一位是除 2
        // const mid = (left + right) >> 2;
        //todo right - left数不会太大，再加上 left，不会造成大数溢出
        // const mid = left + (right - left) >> 1;
        const mid = left + ((right - left) >> 1);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            //3.因为定义左闭右开，所以不会包含 mid
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        }
    }

    //4.没有结果返回
    return -1;
};


//24-8-9 第一次测试
/**
* 左闭右闭
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
var search = function (nums, target) {
    //1.判空
    if (nums.length === 0) return -1;
    //2.确定区间，左闭右闭
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const mid = left + ((right - left) >> 1);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            //3.因为左闭右闭，而且 mid 已经排除了，所以应该把 mid 排除在外
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        }
    }

    //4.没有结果返回
    return -1;
};

/**
* 左闭右开
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
var search = function (nums, target) {
    //1.判空
    if (nums.length === 0) return -1;
    //2.确定区间，左闭右开，所以不包含nums.length
    let left = 0, right = nums.length;

    while (left < right) {
        const mid = left + ((right - left) >> 1);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            //3.因为左闭右闭，而且 mid 已经排除了，右区间是开区间，所以已经把 mid 排除在外了，
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        }
    }

    //4.没有结果返回
    return -1;
};