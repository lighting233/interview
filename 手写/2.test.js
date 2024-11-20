import { conut, add } from './1.test'
console.log(conut);
add();
console.log(conut)
setTimeout(() => {
    add();
    console.log(conut)
},1000)