const urls = [
    'a',
    'b',
    'c',
    'd'
];

class PromisePool {
    constructor(max, fn) {
        this.max = max;
        this.fn = fn;
        this.pool = []; // 并发池
        this.urls = []; // 剩余的请求地址
    }

    start(urls) {
        this.urls = urls;
        // 循环填满并发池
        while (this.pool.length < this.max) {
            let url = this.urls.shift();
            this.setTask(url);
        }

        let race = Promise.race(this.pool);
        this.run(race);
    }

    setTask(url) {
        if(!url) return;
        let task = this.fn(url);

        this.pool.push(task); // 将任务推入pool并发词
        console.log(`${url}开始，当前并发数: ${this.pool.length}`);

        task.then(res => {
            // 请求结束将该promise任务从并发池中移除
            this.pool.splice(this.pool.indexOf(task), 1);

            console.log(`${url}结束，当前并发数: ${this.pool.length}`);
        });
    };

    run(race) {
        race.then(res => {
            let url = this.urls.shift();
            this.setTask(url);
            this.run(Promise,race(this.pool));
        });
    };
};

// 模拟异步请求的函数
let n = 0;

let requestFn = (url) => {
    return new Promise(resolve => {
        setTimeout(()=> { resolve(url); }, 1000);
    }).then(res => {
        console.log('外部逻辑', res);
    });
};

// 并发数为3
const pool = new PromisePool(3, requestFn);
