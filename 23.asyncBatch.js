// /** 6.
//  * run async task in batch
//  * @param {any} tasks 任务列表
//  * @param {any} handler 异步执行操作 是一个promise
//  * @param {any} batchSize 一次批量操作的任务数量
//  * @returns {any}
//  */
// async function asyncBatch(tasks, handler, batchSize = 2) {

// };

// function scheduler1(max) {
//     let requestsQueue = []; // 存储请求队列
//     let concurrentCount = 0; // 当前并发数
//     let results = []; // 存储请求结果

//     function runRequest(request) {
//       concurrentCount++; // 并发数加1
//       return request().then((res) => {
//         console.log(res);
//         results.push(res); // 将请求结果存入结果数组
//         concurrentCount--; // 并发数减1
//         if (requestsQueue.length > 0) {
//           // 如果还有待处理的请求
//           const nextRequest = requestsQueue.shift(); // 取出下一个请求
//           return runRequest(nextRequest); // 递归执行下一个请求
//         }

//       });
//     }

//     return function addRequest(request) {
//       if (concurrentCount < max) {
//         // 如果当前并发数小于最大并发数
//         return runRequest(request);
//       } else {
//         // 如果当前并发数已达到最大并发数
//         return new Promise((resolve) => {
//           requestsQueue.push(request); // 将请求加入请求队列
//           resolve();
//         });
//       }
//     };
// }

/**2. 实现这样一个函数scheduler，函数入参为并发最大次数。
    如下最终输出顺序： 2、3、 1、 4
    一开始，1、2两个任务进入队列
    500ms时，2完成，输出2，任务3进队
    800ms时，3完成，输出3，任务4进队
    1000ms时，1完成，输出1
    1200ms时，4完成，输出4
**/

const request1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
const request2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  });
const request3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 300);
  });
const request4 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 400);
  });

// promise限流还不会
function scheduler(max) {
  let requestQueue = []; // 存储请求队列
  let concurrentCount = 0; // 当前并发数
  let results = []; // 存储请求结果

  // return (...args) => {
  //     return

  // }

  function runRequest(request) {
    concurrentCount++;

    request().then((res) => {
      results.push(res); // 将请求结果存到数组
      concurrentCount--;

      if (requestQueue.length > 0) {
        const nextRequest = requestQueue.shift();
        return runRequest(nextRequest);
      }
      return res;
    });
  }

  return function addRequest(request) {
    if (concurrentCount < max) {
      // 如果当前并发数小于最大并发数
      return runRequest(request);
    } else {
      // 如果当前并发数已达到最大并发数
      return new Promise((resolve) => {
        requestsQueue.push(request); // 将请求加入请求队列
        resolve();
      });
    }
  };

  // return request => {
  //     return new Promise((resolve) => {

  //         if(concurrentCount < max) {
  //             return runRequest(request);
  //         } else {
  //             requestQueue.push(request);
  //         }

  //     })

  // }
}

const addRequest = scheduler1(2);
addRequest(request1).then((res) => {
  console.log(res); // 输出1
});
addRequest(request2).then((res) => {
  console.log(res); // 输出2
});
addRequest(request3).then((res) => {
  console.log(res); // 输出3
});
addRequest(request4).then((res) => {
  console.log(res); // 输出4
});

function limitRunTask(tasks, n) {
  // tasks 模拟队列
  return new Promise((resolve, reject) => {
    let index = 0, // 结果集合中的索引 < tasks.length;
      // finish = 0, // 已经完成的promise索引 < tasks.length;
      // start = 0, // promise中的索引  < n个任务;
      res = [];

    // this.queue = []; tasks就是队列
    let processTasks = [];
    function run() {
      if (tasks.length == 0 && processTasks.length == 0) {
        resolve(res);
        return;
      }

      while (processTasks.length < n && tasks.length > 0) {
        // 每一阶段的任务数量++
        // start++;
        let task = tasks.shift();
        let cur = index;
        index++;
        let promise = task().then((v) => {
          // start--; // 从任务队列中移除
          // finish++; // 完成个数+1
          console.log(cur, "cur");
          processTasks.splice(processTasks.indexOf(promise), 1);
          res[cur] = v;
          console.log(res, "res");
          run();
        });
        processTasks.push(promise);
      }
    }
    run();
  });
  // 大概解释一下：首先如何限制最大数量n
  // while 循环start < n，然后就是then的回调
}

//   limitRunTask([promiseA, promiseB, promiseC], 2).then((res) => {
//     console.log(res, "lmmm");
//   });

// todo lodash.get
// 写测试用例
// function get(obj, str) {

// }

/** 6.
 * run async task in batch
 * @param {any} tasks 任务列表
 * @param {any} handler 异步执行操作 是一个promise
 * @param {any} batchSize 一次批量操作的任务数量
 * @returns {any}
 */
async function asyncBatch(tasks, handler, batchSize = 2) {}

// ast树解析
// todo: https://search.bilibili.com/all?keyword=babel%E5%A6%82%E4%BD%95%E8%A7%A3%E6%9E%90ast&from_source=webtop_search&spm_id_from=333.1007





