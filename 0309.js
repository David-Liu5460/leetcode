// 手写一个promise.all

let genetatePromises = (time) => {
  return new Promise((reslove) =>
    setTimeout(() => {
      reslove(time);
      console.log(`${time}被执行`);
    }, time)
  );
};

// let promises = [genetatePromises(2000), genetatePromises(1000), genetatePromises(3000)];
let promises = [
  () => genetatePromises(2000),
  () => genetatePromises(1000),
  () => genetatePromises(3000),
];

function myAll(promises) {
  let results = [];
  let count = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          results[index] = res;
          count++;
          if (count == promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

// myAll(promises).then(res => {
//     console.log(res, 2333);
// });

// 如何实现promise串行执行
// [5,2,3,1]
async function serial(promises) {
  return new Promise((resolve) => {
    let results = [];
    promises.reduce((prev, promise, index, arr) => {
      return prev.then(promise).then((res) => {
        results[index] = res;
        if (promises.length == index + 1) {
          resolve(results);
        }
      });
    }, Promise.resolve());
  });
}

// serial(promises).then(res => {
//     console.log(res, 5555)
// });

/**2. 实现这样一个函数scheduler，函数入参为并发最大次数。
如下最终输出顺序： 2、3、 1、 4
一开始，1、2两个任务进入队列
500ms时，2完成，输出2，任务3进队
800ms时，3完成，输出3，任务4进队
1000ms时，1完成，输出1
1200ms时，4完成，输出4
**/

// 生产promises数组
function scheduler(max) {
  let taskPools = [];
  let workingNum = 0;

  const addTask = (promise) => {
    taskPools.push(promise);
    doNext();
  };

  const doNext = () => {
    if (taskPools.length && workingNum < max) {
      workingNum++;
      console.log("干活了");
      taskPools
        .shift()()
        .then(() => {
          workingNum--;
          doNext();
        });
    }
  };

  return addTask;
}

// const addRequest = scheduler(2);

// for(let i = 1; i <= 4; i++) {
//     addRequest(() => genetatePromises(i * 1000));
// };

// addRequest(request1).then((res) => {
//   console.log(res); // 输出1
// });
// addRequest(request2).then((res) => {
//   console.log(res); // 输出2
// });
// addRequest(request3).then((res) => {
//   console.log(res); // 输出3
// });
// addRequest(request4).then((res) => {
//   console.log(res); // 输出4
// });

// 模板字符串

// get方法
function get(obj, str, defaultValue) {
  debugger;
  if (typeof str == "string") {
    console.log(str.replace(/\[(\d+)\]/, ".$1"));
    // debugger
    str = str.replace(/\[(\d+)\]/, ".$1").split(".");
  }
  // debugger

  let entry = obj;

  try {
    for (let key of str) {
      // console.log(entry)
      if (entry && entry.hasOwnProperty(key)) {
        entry = entry[key];
      }
    }
  } catch (err) {
    console.log(err);
    return defaultValue;
  }

  return entry !== undefined ? entry : defaultValue;
}

let obj = {
  a: [
    {
      b: {
        c: 3,
      },
    },
  ],
  // b: {
  //     a: 4
  // },
  c: 5,
};

// console.log(get(obj, "a[0].b.c", undefined));
// console.log(get(obj, ["a", "0", "b", "c"]));


// es6 模板字符串
const obj1 = {
    a: {
        b: 2
    }
}

const str = "asdf${test1},asdff${test2.test1}asdf${test3}";
const data = {
  test1: 'test1',
  test2: { test1: 'test1' },
  test3: 2
};

const getTemplate = (data, str) => {
    return str.replace(/\$\{(.*?)\}/g, (a, b, c, d) => {
        console.log(a, b, '\nlmmmmm')
        let path = b.split('.');

        let entry = data;
        for(let key of path) {
            if (entry && entry.hasOwnProperty(key)) {
                entry = entry[key];
            } else {
                entry = ''
            }
        }
        return entry;
    });
};

console.log(getTemplate(data, str));


// function promisify(func, context) {
//     const ctx = context || this;
//     return function(...args) {
//         return new Promise((resolve, reject) => {
//             const callback = (err, ...results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     results.length > 1 ? resolve(results) : resolve(results[0]);
//                 }
//             }

//             func.apply(ctx, [...args, callback]);
//         });
//     };
// };

// const func = (filename, callback) => {
//     setTimeout(() => {
//         console.log('readFile', filename, 2333);
//         debugger
//         callback(null, 'success');
//     }, 2000)
// }

// let asyncRead = promisify(func);

// asyncRead('aaa').then(res => {
//     console.log(res);
// })

/**
 * @param {number[]} nums
 * @return {number[]}
 * @alias 0309 手写归并排序
 */
// var sortArray = function(nums) {
//     let len = nums.length;
//     let low = 0, high = len - 1;
//     let temp = new Array(nums.length);

//     mergeSort(nums, low, high, temp);
//     return nums;

//     function mergeSort(arr, low, high, temp) {
//         if (low < high) {
//             let mid = Math.floor((low + high) / 2);
//             mergeSort(arr, low, mid, temp);
//             mergeSort(arr, mid + 1, high, temp);
//             merge(arr, low, mid, high, temp);
//             // console.log(arr);
//         }
//     }

//     function merge(arr, low, mid, high, temp) {
//         if (low >= high) return;
//         // 0 1 3
//         console.log(low, mid, high, arr, 1231) // 0 1 3
//         let i = low, j = mid + 1, k = 0; // 0 - 1   2 - 3
//         while(i <= mid && j <= high) {
//             if (arr[i] <= arr[j]) {
//                 temp[k++] = arr[i++];
//             } else {
//                 temp[k++] = arr[j++];
//             }
//         }
//         while(i <= mid) {
//             temp[k++] = arr[i++];
//         }
//         while(j <= high) {
//             temp[k++] = arr[j++];
//         };
//         console.log(temp, 'temp')
//         k = 0;
//         let tempLeft = low;;
//         while(tempLeft <= high){
//             arr[tempLeft++] = temp[k++];
//         }
//         console.log(arr);
//     };
// };

// console.log(sortArray([5,2,3,1]))
