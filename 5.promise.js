const fs = requier('fs');

function promisify(fn) {
    return function(..args) {
        return new Promise((resolve,reject) => {
            fn(...args,(err,data) => {
                if(err) return reject(err);
                resolve(data)
            })
        })
    }
}

const readFile = promisify(fs.readFile);
readFile('./a.js','utf8').then((data) => {
    
})