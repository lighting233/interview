import { readFile } from "fs";

function* run() {
    let a = yield readFile('./dara/1.txt');
    let b = yield readFile('./dara/1.txt');
    let c = yield readFile('./dara/1.txt');

    return a + b + c;
}

const it = run();

it.next().value.then((date) => {
    it.next(date).value.then((data) => {
        it.next(date).value.then((date) => {
            it.next(date);
        })
    })
})

function co(generatorFn) {
    let it = generatorFn();

    return new Promise((resolve, reject) => {
        function next(lastVal) {
            let { value, done } = it.next(lastVal);

            if (done) {
                resolve(value);
            } else {
                value.then(next, reject);
            }
        };

        next();
    })
}
function read() {
    return co(function* () {
        let a = yield readFile('./dara/1.txt');
        let b = yield readFile('./dara/1.txt');
        let c = yield readFile('./dara/1.txt');

        return a + b + c;
    })
}