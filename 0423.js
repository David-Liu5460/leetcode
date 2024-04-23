// 业务需求中，经常有 只需要最后一次请求的结果（比如搜索）编写一个高阶函数，传递旧请求方法（执行后返回 promise），返回一个新方法。
// 连续触发时，若上一次 promise 执行未结束则直接废弃，只有最后一次 promise 会触发then/reject。

/**
* 只有最后一次promise会then与reject
* @param {function} promiseFunction
* promiseFunction 示例： () => fetch('data')
*/

// function lastPromise(promiseFunction) {
   
// }

function lastPromise(promiseFunction) {
    // 这是一个闭包变量
    let lastToken = 0;  // 初始化lastToken
    

    return function() {
        const currentToken = ++lastToken; // 对于每个新的调用，增加lastToken的值

        console.log(currentToken, lastToken, 111)

        return new Promise((resolve, reject) => {
            promiseFunction()
                .then(result => {
                    // 函数作用域内的变量保存currentToken
                    console.log(currentToken, lastToken)
                    if (currentToken === lastToken) { // 检查这是否是最后一个发起的promise
                        resolve(result); // 如果是，处理resolve
                    }
                    // 如果不是，什么也不做，即忽略了之前的promise结果
                })
                .catch(error => {
                    if (currentToken === lastToken) { // 同上，检查并处理reject
                        reject(error);
                    }
                });
        });
    };
};

  
// 示例
let count = 1;
let promiseFunction = () =>
new Promise(rs =>
    setTimeout(() => {
      rs(count++);
    })
);

let lastFn = lastPromise(promiseFunction);

lastFn().then(console.log); // 无输出
lastFn().then(console.log); // 无输出
lastFn().then(console.log); // 3

// 函数在确保在调用多次的情况下，仅在最后一次调用后的指定延时内执行一次
function debounce(func, delay) {
    let timeId;
    return function (...args) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

// 节流函数在指定的时间间隔内只允许函数执行一次，不管事件触发有多频繁
function throttle(fn, wait) {
    let timeout = null;
    
    return function () {
        let context = this;
        let args = arguments;

        if (!timeout) {
            timeout = setTimeout(() => {
                fn.apply(context, args);
                timeout = null;
            }, wait);
        };
    };
}