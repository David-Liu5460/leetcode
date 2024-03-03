/* 普通两数相加函数,只不过这个函数需要一个回调，这个回调充当它的第三个参数 */
// 同步和异步实现
function normalAdd(a, b, callback) {
  /* 延迟500ms相加 */
  /* 回调函数当中第一个参数代表是否是错误处理，第二个参数代表两数之间进行的操作 */
  /* 第一个参数为null的话，则可以进行fullfiled状态，第二个参数a+b代表相加操作 */
  // b站投稿不允许用定时器，需要的把注释去掉

  setTimeout(() => {
    callback(null, a + b);
  }, 500);
}
/* 1.普通相加函数内嵌到返回promise的函数当中,进阶为promise链式函数 */
/* 它需要传递的是需要处理的关联两数  */
const promiseAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    /* 内嵌普通相加函数,并把外界参数传递给它，不过回调函数采用匿名箭头函数作为回调函数接收 */
    normalAdd(a, b, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
/* 2.串行 */
/* 还需最后一个接收参数列表的异步函数（因为async的返回值是一个Promise）,并把最终的结果作为返回值 */
/* 他需要把参数列表和reduce进行结合，形成通道，并将每次的返回值都最为下一次的带有上一次结果的前置Promise */
/* 初始带有上一次结果的前置Promise就是Promise.resolve(0) */
async function pipeAdd(...args) {
  const sum = args.reduce((pre, cur) => {
    /* reduce里面的返回值是下一次的pre值 */
    let nxt_pre = pre.then((res) => {
      /* 此时的res是上一次Promise.resolve过来的值 */
      /* 需要调用上面的promise链式函数 */
      return promiseAdd(res, cur);
    });
    return nxt_pre;
  }, Promise.resolve(0));
  return sum;
}
// 3. 并行处理
async function parallelSum(...args) {
  /* 终止条件 */
  if (args.length === 1) return args[0]; // 递归出口: 如果只有一个参数，直接返回
  /* 每一阶段的收集者 */
  const tasks = [];
  /* 并发数（梯度）-默认为2 */
  for (let i = 0; i < args.length; i += 2) {
    /* 收集者负责把同一区间内的终态promise收集 */
    tasks.push(promiseAdd(args[i], args[i + 1] || 0));
  }
//   console.log(tasks);
  /* 终态promises的结果通过promise.all管理 */
  let res = await Promise.all(tasks);
  console.log(res);
  return parallelSum(...res);
}
// 测试
(async () => {
  console.log("Running...");
  const res1 = await pipeAdd(1, 2, 3, 4, 5, 8, 9, 10, 11, 12);
  console.log(res1);
  const res2 = await parallelSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12);
  console.log(res2);
  console.log("Done");
})();

//  作者：忘魂儿 https://www.bilibili.com/read/cv16500280/ 出处：bilibili
