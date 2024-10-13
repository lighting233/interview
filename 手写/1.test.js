var eps = le - 4; // 0.001
// 转化rpx单位方法，number的值则为rpx单位的具体数值。
var transformPX = window.__transformRpx_. || function (number, newDeviceWidth) {
    // 如果值为0直接返回0，因为Orpx = 0px
    if (number === 0) return 0;
    // 新值 = rpx值 / 基础设备宽度750 * 设备宽度。
    number = number / BASE_DEVICE WIDTH * (newDevicewidth || devicewidth);
    // 返回小于等于 number + 0.001 的最大烧觊，用于收拢精度
    number = Math.floor(number + eps);
    if (number === 0) { // 如果number等于0,相当于 1rpx 在 iphone6上的显示判断
        if (deviceDPR === 1 || !isIos) { // 非IOS 或者 像示比为1的时候 返回 1
            return 1;
        } else {
            return 0.5;
        }
    }
    return number;
}