// function retry(func, times, timeout) {
//     return (...args) => {
//         let retryCount = 0;

//         const tryFetch = () => {
//             return func(...args).then(
//                 res => res,
//                 error => {
//                     console.log(retryCount, 'count')
//                     if(retryCount < times) {
//                         setTimeout(() => {
//                             tryFetch();
//                             retryCount++;
//                             console.log(`第${retryCount}重试`)
//                         }, timeout);
//                     } else {
//                         return Promise.reject(error);
//                     }
//                 }
//             )
//         }

//         return tryFetch();
//     };
// }

function retry(func, times, timeout) {
    return function(...args) {
        // 创建一个尝试执行的函数
        const attempt = (n) => {

            return func(...args).catch((error) => {
                console.log(`第${n}次尝试`);
                if (n === 1) throw error;
                // 等待指定的timeout 间隔时间后进行下一次尝试
                return new Promise((resolve) => setTimeout(resolve, timeout))
                    .then(() => attempt(n - 1));
            });
        };

        // 开始尝试执行
        return attempt(times);
    };
}

// 这个实现的关键点在于构建一个连续的Promise链。对于每次尝试，如果函数执行成功，Promise链就会直接被解决，不再执行后续的重试。如果函数执行失败，并且尝试次数没有耗尽，我们通过返回一个经过延迟的Promise来暂停执行，然后继续链中的下一个尝试。

// function retry(func, times, timeout) {
//     return function(...args) {
//         // 一个立即执行的 Promise，用作起始点
//         let promise = Promise.resolve();

//         // 循环构造 Promise 链
//         for (let i = 0; i < times; i++) {
//             console.log(i)
//             promise = promise.then(() => {
//                 // 尝试执行传入的函数，成功则直接返回结果
//                 return func(...args);
//             }).catch((error) => {
//                 // 如果出现错误，且还有剩余尝试次数，暂停后重试
//                 if (i < times-1) {
//                     console.log(`第${i}次重试`);
//                     // 返回经过延迟的promise来暂停执行 然后继续链中的下一次尝试 延迟执行的promise来构造promise链
//                     return new Promise((resolve) => setTimeout(resolve, timeout)); // promsise fulfilled undefined
//                 } else {
//                     // 这是最后一次尝试，抛出错误
//                     return Promise.reject(error);
//                 }
//             });
//         }

//         return promise;
//     };
// }

// function retry(func, limits, timeout) {
//   return (...args) => {
//     let count = 0;
//     return new Promise((resolve, reject) => {
//       const execute = () =>
//         func(...args)
//           .then((res) => resolve(res)) // 某一次成功之后resolve
//           .catch((error) => {
//             // 失败后继续重试执行
//             console.log(`第${count}次尝试`);
//             if (count < limits) {
//               setTimeout(execute, timeout);
//               count++;
//             } else {
//               // 指定次数重试后reject
//               reject("达到指定尝试次数" + error);
//             }
//           });

//       execute();
//     });
//   };
// }

// catch返回的promise状态为fulfillled

// 使用axios发送请求的函数
// function fetch(url) {
//   return axios.get(url);
// }
const fetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("error");
      
    }, 1000)
   
    // resolve('success');
  });
};

// 创建一个包含重试逻辑的函数
let retriedFetch = retry2(fetch, 3, 2000);

// 使用新函数发送请求
retriedFetch("https://example.com/api/data")
  .then((response) => {
    // 获取数据
    console.log("成功获取数据:", response);
  })
  .catch((error) => {
    console.error(`所有尝试失败: ${error}`);
  });

// 主线程 同步任务执行完了，早已物是人非;

function retry1(func, times, timeout) {
  return (...args) => {
    let count = 0;
    return new Promise((resolve, reject) => {
      // new Promise包了一层 把结果resolve出去
      const execute = () => {
        func(...args)
          .then(resolve)
          .catch((error) => {
            if (count < times) {
              console.log(`第${count}次尝试`)
              setTimeout(execute, timeout);
              count++;
            } else {
              reject(error);
            }
        });
      }

      execute();
    });
  };
};

function retry2(func, times, timeout) {
  return (...args) => {
    const sleep = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const attempt = async (n) => {
      return func(...args).catch(error => {
        console.log(`第${n}次尝试`);
        if (n > 1) {
          return sleep(timeout).then(() => attempt(n-1))
        } else {
          throw new Error(error);
        }
      });
    };
    return attempt(times)
  }
}


