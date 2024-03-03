// 请实现如下函数，可以批量请求数据。所有的url地址都在urls参数中，同时可以通过max控制请求的并发度，当所有请求结束后，调用callback回调函数。请求直接用fetch就可以。函数签名function sendRequest(url, max, callback)
// https://juejin.cn/post/7090388688923787294

function sendRequest(urls, max, cb) {
    // index
    const len = urls.length;
    let index = 0;
    const promiseArr = []; // 存放异步请求数组 promiseArr
    const resArr = new Array(len).fill(null);

    const execute = () => {
        // 索引在这里控制
        const urlIndex = index;
        if (index >= len) { // 4 // 递归出口 溢出
            debugger
            // 等最后两个发完
            Promise.all(promiseArr).then(() => {
                cb(resArr);
            });
        } else if (index < len && promiseArr.length < max) {
            // console.log(index)
            let req = fetch(urls[index]).then(res => {
                // console.log(res, urlIndex, 'res')
                console.log(`第${urlIndex}次请求`, res);
                debugger
                // 处理完了一个 继续往里面加
                promiseArr.splice(promiseArr.indexOf(req), 1); // 踢出队列;
                // const cur = index;
                // debugger
                resArr[urlIndex] = res;
                if(index < len && promiseArr.length < max) {
                    // 继续往里面加
                    // console.log(resArr)
                    // 整个数组还没有被遍历完 再次调用自身
                    return execute();
                };
            }).catch(() => {});
            // console.log(promiseArr, 2331)
            promiseArr.push(req); // 控制线程池的数量 并不代表索引
            index++;
            execute(); // 没满 往里面填
        };
    }

    execute();

}

// const genFetch = (urls) => {


// }

const fetch = (url) => {
    return new Promise((resolve, reject) => {
        // 加入宏任务队列 模拟请求
        setTimeout(() => {
            resolve(url);
        }, 2000);
    })
}

sendRequest(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], 2, (res) => { console.log('我成功了', res); });

// 怎么做错误处理