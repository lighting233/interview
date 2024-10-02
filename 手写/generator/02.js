const fs = require('fs');

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};
readFile('./lodash.js').then((data) => {
    str+=data;
    return readFile('./promise.js');
}).then((data) => {
    str+=data;
    return readFile('./compose.js');
}).then((data) => {
    str+=data
    console.log(str);
});

module.exports = {
    readFile
}