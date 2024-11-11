function compareVersion(str1, str2) {
    const map = {
        'rc': 3,
        'beta': 2,
        'alpha': 1
    };
    function getNumArr(str) {
        const [left, right] = str.split('-');
        const leftArr = left.split('.');
        const rightArr = right ? right.split('.').map((item) => map[item] ? map[item] : item) : Infinity;
        return leftArr.concat(rightArr);
    };
    const arr1 = getNumArr(str1);
    console.log("%c Line:14 🍓 arr1", "color:#42b983", arr1);
    const arr2 = getNumArr(str2);
    console.log("%c Line:16 🍔 arr2", "color:#ea7e5c", arr2);

    for(let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
        const val1 = arr1[i] || 0;
        const val2 = arr2[i] || 0;

        if(val1 > val2) {
            return 1
        }else if(val1 < val2) {
            return -1;
        };
    };

    return 0;
}
//1.2.3 < 1.2.4 < 1.3.0-alpha.1 < 1.3.0-alpha.2 < 1.3.0-beta.1 < 1.3.0-rc.1 < 1.3.0
console.log(compareVersion('1.3.0','1.3.0-alpha.2'))