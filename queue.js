// javascript 设计任务队列 控制请求最大并发数
// 场景：前端页面中需要同时发送20个请求，但是服务端有限制，需要前端控制并发数，保证最多只能发送10个请求
// 要求：
//   1. 最多同时执行的任务数为10个；
//   2. 当前任务执行完成后，释放队列空间，自动执行下一个任务；
//   3， 所有任务添加到任务队列后，自动开始执行任务；

function createTask(i) {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(i);
            },  1000); // 10 000
        })
    }
}

class TaskQueue {
    constructor(max) {
        this.max = max; // 控制任务空间的数量
        this.taskList = []; // 总的任务数
        // setTimeout(() => {
        //     this.run();
        // });
    };

    addTask(task) {
        this.taskList.push(task);
    };

    run() {
        const length = this.taskList.length;
        if (!length) {
            return;
        };

        const min = Math.min(this.max, length); // 一次只执行10个 每完成一个 继续出队执行
        console.log('min', min)
        for(let i = 0; i < min; i++) { // 在进行任务数控制
            // 开始占用空间
            this.max--;
            const task = this.taskList.shift(); // 出队 每次只出20次
            task().then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                // 释放一个任务空间
                this.max++;
                this.run();
            });
        };
    }
}

const taskQueue = new TaskQueue(3);

for (let i = 0; i < 20; i++) {
    // 入队 20个
    const task = createTask(i);
    taskQueue.addTask(task);
};

taskQueue.run()