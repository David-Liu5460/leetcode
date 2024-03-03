/** 6.
 * run async task in batch
 * @param {any} tasks 任务列表
 * @param {any} handler 异步执行操作 是一个promise
 * @param {any} batchSize 一次批量操作的任务数量
 * @returns {any}
 */
async function asyncBatch(tasks, handler, batchSize = 2) {
  let workingNum = 0;
  let taskPool = [];
  let res = [];

  let resIndex = 0;

  for (let i = 0; i < tasks.length; i++) {
    taskPool.push(() => handler(tasks[i]));
  }

  return new Promise((resolve, reject) => {
    const doNext = () => {
      if (taskPool.length == 0 && workingNum == 0) {
        resolve(res);
      }
      if (taskPool.length && workingNum < batchSize) {
        workingNum++;
        taskPool
          .shift()()
          .then((r) => {
            workingNum--;
            res[resIndex] = r;
            resIndex++;

            doNext();
            // console.log(res);
          })
          .catch((e) => reject(e));
      }
    };

    const start = () => {
      for (let i = 0; i < batchSize; i++) {
        doNext();
      }
    };

    start();
  });
}

const tasks = [1, 2, 3, 4, 5];

const handler = async (task) => {
  // 模拟异步操作，这里使用setTimeout模拟异步任务
  return new Promise((resolve) => {
    console.log("Task", task);
    setTimeout(() => {
      resolve(task * 2); // 返回任务处理结果
    }, task * 1000);
  });
};

async function example2() {
  try {
    const results = await asyncBatch(tasks, handler, 2);
    console.log("results", results);
  } catch (e) {
    console.log(e);
  }
}

example2();
