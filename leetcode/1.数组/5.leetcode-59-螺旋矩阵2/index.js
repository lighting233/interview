//24-8-10 第一次学习

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
    //1.先创建需要填充的数组
    const res = Array(n).fill(0).map(() => Array(n).fill(0));
    //2.创建每圈遍历的起点坐标
    let startX = startY = 0;
    //3.创建每个位置的计数
    let count = 1;
    //4.左闭右开区间，需要一个 offset来控制每个边最后一个点不能遍历
    let offset = 1;
    //5.需要循环的圈数
    let loop = Math.floor(n / 2);

    while (loop--) {
        //6.确定当前循环每一步的下标
        let i = startX, j = startY;
        //7.横向遍历先从 j 开始
        for (; j < n - offset; j++) {
            res[i][j] = count++;
        };
        //8.因为上个循环的终止条件是 j + 1，所以当前 j 就是这条边所需的 j
        for (; i < n - offset; i++) {
            res[i][j] = count++;
        }
        //9. > startX因为左闭右开，不处理最后一个点，向右遍历需要 offset 是因为 n 不变，每一圈，需要缩减 1，但是startX每圈走完会++，所以不需要 offset
        for (; j > startX; j--) {
            res[i][j] = count++;
        };
        for (; i > startY; i--) {
            res[i][j] = count++;
        };

        //10.每走完一圈更新startX，startY
        startX++;
        startY++;
        //todo 11.也要更新 offset
        offset++;
    };

    //12.如果n是奇数，需要额外处理中心点
    if (n % 2 === 1) {
        const mid = Math.floor(n / 2);
        res[mid][mid] = count;
    }

    return res;
};

//24-8-10 第一次测试

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
    //1.创建二维数组
    const res = Array(n).fill(0).map(() => Array(n).fill(0));
    //2.创建每圈起始坐标
    let startX = startY = 0;
    //3.圈数
    let loop = Math.floor(n / 2);
    //4.左闭右开，需要 offset 来控制每圈右区间
    let offset = 1;
    //5.每走一步的计数
    let count = 1;

    while (loop--) {
        //6.当前圈每一步的坐标
        let i = startX, j = startY;

        for (; j < n - offset; j++) {
            res[i][j] = count++;
        }
        //因为 i，j 是坐标，上个循环 j 退出时已经移动到，最右边的边了
        for (; i < n - offset; i++) {
            res[i][j] = count++;
        };

        //startX每圈更新，所以不需要 offset 控制
        for (; j > startX; j--) {
            res[i][j] = count++;
        };

        for (; i > startY; i--) {
            res[i][j] = count++;
        };

        //每圈结束更新startX，startY和offset；
        startX++;
        startY++;
        offset++;
    };

    //n 为奇数时，需要处理中心点；
    if(n % 2 === 1) {
        const mid = Math.floor(n / 2);
        res[mid][mid] = count;
    };

    return res;
};