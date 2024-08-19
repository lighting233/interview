const arr1 = [704, 27, 977, 209, 59, 203, 707, 206, 24, 19, 160, 142, 242, 349, 202, 1, 454, 383, 15, 18, 344, 541, 151, 28, 459, 20, 1047, 150, 239]

// const result1 = arr1.sort(() => Math.random() - 0.5);
const result1 = shuffleArray(arr1)
console.log(result1)
//[704,  19, 349, 151, 977,  18,383, 209, 344, 202, 541,  27,15, 454, 242, 142,  59, 150,1047,   1, 459,  24, 203,  28,20, 707, 160, 206, 239]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交换元素
    }
    return array;
}
//[150,    1, 707, 242,  27,  18,239,  349, 454, 344,  15,  24,142, 1047,  28, 541, 977, 704,59,  160, 151, 202, 203,  19,209,  206, 459,  20, 383]