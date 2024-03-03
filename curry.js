function curry(fn, ...args1) {
    return function (...args2) {
        let allArgs = [...args1, ...args2];
        if(args2.length === 0) {
            // 求和
            return fn(...allArgs);
        } else {
            // 科利华收集参数
            return curry(fn, ...allArgs);
        }
    }
}
function sum(...args) {
    let res = 0;
    for(let i of args) {
        res += i;
    }
    return res;
}
let add = curry(sum);
console.log(add(1, 2)(3)(4)(5, 6)(7)());
