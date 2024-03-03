// 函数科里化
// https://juejin.cn/post/7241395652092821541?searchId=20231211195358AE783F5BAEB1DB9DE2E2

// 定义一个普通的函数，它接收两个参数并返回他们的和
// function add(x, y) {
//   return x + y;
// }

// function add(...args) { 
//     return args.reduce((a, b) => a + b, 0);
// }

// // 编写一个curry函数，它可以对任何函数进行科里化
// function curry(fn) {
//   // 获取除第一个参数外的其他参数
//   var args = Array.prototype.slice.call(arguments, 1);

//   // 返回一个新函数，如果参数足够执行则调用原来的函数，否则继续科里化
//   return function () {
//     var newArgs = args.concat(Array.prototype.slice.call(arguments));
//     if (newArgs.length >= fn.length) {
//       return fn.apply(this, newArgs);
//     } else {
//       return curry.call(this, fn, ...newArgs);
//     }
//   };
// }

// // 使用curry函数对add进行科里化
// var curriedAdd = curry(add);

// // 调用curriedAdd函数，返回一个新函数
// var add1 = curriedAdd(1);

// // 继续调用新函数，返回结果2
// console.log(add1(1)); // 2

// // 另一种调用方式
// console.log(curriedAdd(2)(3)(1)(4)); // 5

// const sum = (a, b) => (a + b);
const sum = (...args) => args.reduce((a, b) => a + b, 0);
// function sum(...args) {
//     let res = 0;
//     for(let i of args) {
//         res += i;
//     }
//     return res;
// }

// 实现要点：
// 1. 采用递归 
// 2. 每次调用收集参数，一直收集到的参数个数等于传入函数的参数个数就执行传入函数

function curry(fn, ...args) {
    // args是每次执行接收到的参数
    // fn.length是fn函数的参数个数
    debugger
    return function (...args1) {
        if (!args1.length) {
            debugger
            return fn(...args);
        } else {
            // args2是下一次执行的餐素
            // (...args, ...args2)解构的方式拼接参数
            debugger
            let allArgs = [...args, ...args1];
            return curry(fn, ...allArgs);
        }
        
    }
   
}

const curryAdd = curry(sum);

console.log(curryAdd(1)(3)());
