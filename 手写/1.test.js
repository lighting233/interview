function* run() {
    yield 'run1';
    yield 'run2';
    yield 'run3';

    return 'over';
};
const iterator = run();
console.log(iterator);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());