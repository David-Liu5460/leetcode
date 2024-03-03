// https://code.alibaba-inc.com/assets-group/im-migrate-common/blob/master/src/index.jsx
const promiseA = () =>
  new Promise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });

const promiseB = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
      resolve(1);
    }, 3000);
  });

const promiseC = () =>
  new Promise((resolve, reject) => {
    console.log(3);
    setTimeout(() => {
      resolve(3);
    }, 1000);
  });

// function limitRunTask(tasks, n) {
//   return new Promise((resolve, reject) => {
//     let index = 0, // 结果集合中的索引 < tasks.length;
//       finish = 0, // 已经完成的promise索引 < tasks.length;
//       start = 0, // promise中的索引  < n个任务;
//       res = [];
//     function run() {
//       if (finish == tasks.length) {
//         resolve(res);
//         return;
//       }

//       while (start < n && index < tasks.length) {
//         // 每一阶段的任务数量++
//         start++;
//         let cur = index;
//         tasks[index++]().then((v) => {
//           start--; // 从任务队列中移除
//           finish++; // 完成个数+1
//           res[cur] = v;
//           run();
//         });
//       }
//     }
//     run();
//   });
//   // 大概解释一下：首先如何限制最大数量n
//   // while 循环start < n，然后就是then的回调
// }

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

limitRunTask([promiseA, promiseB, promiseC], 2).then((res) => {
  console.log(res, "lmmm");
});

//   作者：TianTianUp
//   链接：https://juejin.cn/post/6855129007852093453
//   来源：稀土掘金
//   著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
