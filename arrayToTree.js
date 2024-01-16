function arrayToTree(arr) {
    const tree = [];
    const map = {};

    // 将数组中的每个元素转换为节点对象，并建立节点对象的映射关系
    arr.forEach(item => {
        map[item.id] = { ...item, children: [] };
    });

    // 遍历节点对象，构建树形结构
    for (const id in map) {
        if (map.hasOwnProperty(id)) {
            const node = map[id];
            const parentId = node.parentId;

            if (parentId) {
                if (map[parentId]) {
                    map[parentId].children.push(node);
                } else {
                    console.error('Invalid parent id:', parentId);
                }
            } else {
                tree.push(node);
            }
        }
    }

    return tree;
}

// 示例用法
const flatArray = [
    { id: 1, name: 'Node 1', parentId: null },
    { id: 2, name: 'Node 1.1', parentId: 1 },
    { id: 3, name: 'Node 1.2', parentId: 1 },
    { id: 4, name: 'Node 2', parentId: null },
    { id: 5, name: 'Node 2.1', parentId: 4 },
];

const tree = arrayToTree(flatArray);
console.log(tree);


//扁平化数组

const flat = (arr) => {
    return arr.reduce((prev,cur) => {
        return prev.concat(Array.isArray(cur) ? flat(cur) : cur)
    },[])
}

const flat2 = (arr) => {
    const res = [];

    const stack = [...arr];

    while(stack.length) {
        const item = stack.pop();
        if(Array.isArray(item)) {
            stack.push(...item);
        }else {
            res.unshift(item)
        }
    }

    return res;
}
