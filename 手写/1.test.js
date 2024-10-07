const str ='adasaasdxcxcaadfffgggfs';

function times(str) {
    return str.split('').reduce((prev,cur) => {
        
        return (prev[cur]++ || (prev[cur] = 1),prev)
    }, {})
};

console.log(times(str));