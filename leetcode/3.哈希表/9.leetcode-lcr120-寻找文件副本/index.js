//24-9-17 第一次学习

/**
 * @param {number[]} documents
 * @return {number}
 */
var findRepeatDocument = function (documents) {
    //要把这个条件利用上0 ≤ documents[i] ≤ n-1
    for(let i = 0; i < documents.length; i++) {
         // 当前值要放在其正确的位置上
         while (documents[i] !== i) {
            let curVal = documents[i];
            
            // 如果目标位置已经有了正确的值，说明有重复
            if (documents[curVal] === curVal) {
                return curVal;
            }

            // 否则交换当前值到它该去的位置
            [documents[curVal], documents[i]] = [documents[i], documents[curVal]];
        }
    }
};

/**
 * @param {number[]} documents
 * @return {number}
 */
var findRepeatDocument = function (documents) {

};