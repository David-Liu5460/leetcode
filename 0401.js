const handleFetch = url => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url + 1);
        }, 300)
    })
};

function scheduler(urls, max, callback = () => {}) {
    let workingNum = 0;

    let taskPool = [], results = [];

    for(let i = 0; i < urls.length; i++) {
        // 初始化任务池 push所有任务
        taskPool.push(() => handleFetch(urls[i]))
    };

    function doNext() {
        if (taskPool == 0 && workingNum == 0) {
            // setTimeout(() => {
            //     callback(results);
                
            // }, 1000)
            callback(results);
          
        }
        // 并发请求完成后要继续完成下一个
        if (taskPool.length && workingNum < max) {
            workingNum++
            taskPool.shift()().then(res => {
                workingNum--;
                results.push(res);
                doNext();
            });
        }
    };

    const start = () => {
        // 在这里初始化max个任务 起了max个并发线程
        for(let i = 0; i < max; i++) {
            doNext();
        };
    };

    start();
}

const urls = [1, 2,3,4];

 scheduler(urls, 2, (res) => {
    console.log(res);
 });
 