const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

// 限制同一时刻只能执行2个task
addTask(4000, "1");
addTask(3500, "2");
addTask(4000, "3");
addTask(3000, "4");


//Scheduler ？
//4秒后打印1
//3.5秒打印2
//3进入队列，到7.5秒打印3 
//...