const data = {
    name: 'lvzl',
    date: {
        year: '2023'
    }
}
const str = '我们是好朋友，是吧{{name}}, 是十几单{{date.year}}'

function parse(str, data) {
    const getVal = (props, data) => {
        const propArr = props.split('.')
        return propArr.reduce((prev, cur) => {
            return prev[cur]
        }, data)
    }
    return str.replace(/\{\{(\d|\w|\.)+\}\}/g, match => {
        // 匹配到 {{name}} 这种，需要把前后的大括号去掉
        const props = match.substring(2, match.length - 2)
        console.log("%c Line:19 🥃 props", "color:#7f2b82", props);
        return getVal(props, data)
    })
}

console.log(parse(str,data))