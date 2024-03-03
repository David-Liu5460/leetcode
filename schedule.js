/**
 * JS实现一个带并发控制的异步调度器，保证同时运动的任务最多有两个，完善下面代码
 */
class Scheduler {
  add(promiseCreator) {} //...
}

const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);
