class Scheduler {
    constructor(maxNum) {
        this.maxNum = maxNum;
        this.list = [];
        this.workingNum = 0;
    }
    // list = [];
    // maxNum = 2
    // workingNum = 0;

    add (promiseCreator) {
        this.list.push(promiseCreator);
        // this.doNext();
    };

    start() {
        for(let i = 0; i < this.maxNum; i++) {
            this.doNext();
        };
    };


    doNext() {
        if (this.list.length && this.workingNum < this.maxNum) {
            console.log('开始执行任务', this.workingNum);
            this.workingNum++;
            this.list.shift()().then(() => {
                this.workingNum--;
                this.doNext();
            })
        } else {
            console.log('池子满了');
        }
    }; 
};

const timeout = time => new Promise(resolve => setTimeout(resolve, time));

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(10000,1);
addTask(8000,2);
addTask(10000,3);
addTask(400,4);

scheduler.start(); // 初始化max个并发任务