//todo 第一周
const arr1 = [704, 27, 977, 209, 59, 203, 707, 206, 24, 19, 160, 142, 242, 349, 202, 1, 454, 383, 15, 18, 344, 541, 151, 28, 459, 20, 1047, 150, 239]

// const result1 = arr1.sort(() => Math.random() - 0.5);

const res1 = [150, 1, 707, 242, 27, 18, 239, 349, 454, 344, 15, 24, 142, 1047, 28, 541, 977, 704, 59, 160, 151, 202, 203, 19, 209, 206, 459, 20, 383]

//todo 第二周
const arr2 = [347, 144, 145, 94, 102, 266, 101, 104, 111, 222, 110, 257, 404,]
const res2 = [101, 404, 257, 266, 144, 94, 145, 102, 347, 104, 110, 222, 111]


//todo 
const arr3 = [513, 112, 106, 700, 98, 530, 236, 129, 230, 77, 216, 17, 39, 40, 131, 93, 78, 90, 491, 46, 47]










const result = shuffleArray(arr2)
console.log(result)

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交换元素
    }
    return array;
}

