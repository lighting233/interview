function quickSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    let left = [], right = [];
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex,1)[0];

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < pivot) {
            left.push(arr[i])
        }else {
            right.push(arr[i])
        }
    }

    return quickSort(left).concat([pivot],quickSort(right))
}