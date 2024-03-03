const p1 = new Promise((resolve, reject) => {
  // setTimeout(() => {
  resolve("p1");
  // }, 1000)
});

console.log(
  p1.then((res) => {
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(res)
    //     }, 1000)
    // })
    return res;
  })
);

// then的返回值是promise
// 函数 唯一的输入对应唯一的输出 入参和出参

let promise = new Promise((resolve, reject) => {
  resolve("fulfilled");
})
  .then((resolve) => {
    console.log(resolve);
  })
  .then((resolve) => {
    console.log(resolve);
  });

// fulfilled
// undefined
// undefined
// promise fulfilled undefined

let p = new Promise((resolve) => {
  resolve();
});
let p2 = p1.then(() => {
  console.log("后盾人");
});
p2.then(() => {
  console.log("houdunren.com");
});
console.log(p1); // Promise {<resolved>}
console.log(p2); // Promise {<pending>}

//   # 再试试把上面两行放在 setTimeout里
setTimeout(() => {
  console.log(p1); // Promise {<resolved>}
  console.log(p2); // Promise {<resolved>}
});

// then 是对上个 promise 的rejected 的处理，每个 then 会是一个新的 promise，默认传递 fulfilled状态

// 如果then返回 promise 时，返回的promise 后面的then 就是处理这个promise 的

// 如果不 return 情况就不是这样了，即外层的 then 的promise 和内部的promise 是独立的两个 promise
new Promise((resolve, reject) => {
  resolve();
})
  .then((v) => {
    return new Promise((resolve, reject) => {
      resolve("第二个promise");
    }).then((value) => {
      console.log(value);
      return value;
    });
  })
  .then((value) => {
    console.log(value);
  });

// 其它类型
// Promise 解决过程是一个抽象的操作，其需输入一个 promise 和一个值，我们表示为 [[Resolve]](promise, x)，如果 x 有 then 方法且看上去像一个 Promise ，解决程序即尝试使 promise 接受 x 的状态；否则其用 x 的值来执行 promise 。
// #

function retry(func, times, timeout) {
    return (...args) => {
        let retryCount = 0;

        const tryFetch = () => {
            return func(...args).then(
                res => res,
                error => {
                    if(retryCount > times) {
                        setTimeout(() => {
                            tryFetch();
                            retryCount++;
                            console.log(`第${retryCount}重试`)
                        }, timeout);
                    } else {
                        return Promise.reject(error);
                    }
                }
            )
        }
    };
}

// 使用axios发送请求的函数
// function fetch(url) {
//   return axios.get(url);
// }
const fetch = url => {
    return new Promise((resolve, reject) => {
        reject('error');
    });
}

// 创建一个包含重试逻辑的函数
let retriedFetch = retry(fetch, 3, 1000);

// 使用新函数发送请求
retriedFetch("https://example.com/api/data")
  .then((response) => {
    // 获取数据
    console.log("成功获取数据:", response.data);
  })
  .catch((error) => {
    console.error("所有尝试失败:", error);
  });
