


const createObj = (sum = 0) => {
    return new Proxy({}, {
        get(target, key) {
            if (key === Symbol.toPrimitive) {
                return (hint) => {
                    switch (hint) {
                        case 'default':
                            return sum;
                    }
                };
            };
            return createObj(sum + Number(key))
        }
    })
};
const obj = createObj();

const res = obj[1][2][3] + 4;
console.log("%c Line:40 🍡 res", "color:#fca650", res);