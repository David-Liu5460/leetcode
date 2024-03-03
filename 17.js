// 异步加法
function asyncAdd(a, b, cb) {
  setTimeout(() => {
    cb(null, a + b);
  }, 1000);
}

async function total() {
  const res1 = await sum(1, 2, 3, 4, 5, 6, 4);
  //   const res2 = await sum(1, 2, 3, 4, 5, 6, 4);
  console.log([res1]);
  return [res1];
}

// 实现下 sum 函数。注意不能使用加法，在 sum 中借助 asyncAdd 完成加法。尽可能的优化这个方法的时间。

function calculate(a, b) {
  console.log('我在计算中')
  return new Promise((resolve, reject) => {
    asyncAdd(a, b, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // console.log(result, 'result')
        resolve(result);
      }
    });
  });
}

// 2。19 start
async function sum(...args) {
  if (args.length === 1) return args[0];
  if (args.length === 2) return calculate(args[0], args[1]);
  
  let len = args.length;
  let mid = len >> 1;
  let left = await sum(...args.slice(0, mid + 1))
  let right = await sum(...args.slice(mid + 1));
  return calculate(left, right);

}
// 2.19  end

// async function sum (...args) {
//     // return new Promise((resolve, reject) => {

//     // })
//     const nums = Array.from(args);
//     let res = 0;
//     for(let i = 0; i < nums.length; i++) {
//        res = await calculate(nums[i], res);
//     }

//     return res;
// }

// function sum (...args) {
//     let res = 0;
//     let p = Promise.resolve(res)
//     // let promiseQueue = args.map(item => calculate())

//     // 循环实现串行执行
//     for(let i = 0; i < args.length; i++) {
//         p = p.then(res => { console.log(res); return calculate(args[i], res) })
//     }
//     return p;
// }

// function sum(...args) {
//     let numsArr = Array.from(args);
//     if (numsArr % 2 !== 0) numsArr.push(0);
//     console.log(numsArr)

//     let mid = numsArr.length >> 1; // 长度减半
//     let promisesArr = []; // 每次递归长度减半 直至promise的长度减少到1;
//     for (let i = 0; i < mid; i++) {
//         promisesArr.push(new Promise(resolve => {
//             asyncAdd(numsArr[2 * i], numsArr[2 * i + 1], (err, res) => {
//                 console.log(numsArr[2 * i], numsArr[2 * i + 1], res, 'res');
//                 resolve(res);
//             })
//         }));
//     };

//     return Promise.all(promisesArr).then(res => {
//         if (res.length == 1) {
//             return res[0];
//         } else {
//             return sum(...res);
//         }
//     });
// };

// async function sum(...args) {
//   if (args.length < 2) return args[0] || 0;
//   if (args.length === 2) return await calculate(args[0], args[1]); // 递归出口

//   const len = args.length;
//   const half = len >> 1;
//   const left = await sum(...args.slice(0, half + 1)); // 计算左值
//   const right = await sum(...args.slice(half + 1)); // 计算右值
//   res = await calculate(left, right);

//   // let res = args[0];
//   // for (let i = 1; i < args.length; i++) {
//   //   res = await asyncAdd(sum, args[i]);
//   // }
//   return res;
// }

//   作者：Red_Ferrari
//   链接：https://www.nowcoder.com/discuss/353158904311914496?sourceSSR=search
//   来源：牛客网

// let a = total();

// console.log(total());

total();

// function sum
