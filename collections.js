// Object.create的实现
// 1. 实现一个简单的Object.create方法
function ObjectCreate(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

// 手写new
function myNew(fn, ...args) {
  // 定义一个空对象
  const obj = {};
  // 隐式原型指向显示远行
  obj.__proto__ = fn.prototype;
  // 调用构造函数 this指向空对象
  const res = fn.call(obj, ...args);
  // 返回对象
  return typeof res === "object" ? res : obj;
}

// 实现一个简单的Object.assign方法
function ObjectAssign(target, ...sources) {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    for (let key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
// 实现一个简单的Object.keys方法
function ObjectKeys(obj) {
  const keys = [];
  for (let key in obj) {
    keys.push(key);
  }
  return keys;
}
// 实现一个简单的Object.values方法
function ObjectValues(obj) {
  const values = [];
  for (let key in obj) {
    values.push(obj[key]);
  }
  return values;
}
// 实现一个简单的Object.entries方法
function ObjectEntries(obj) {
  const entries = [];
  for (let key in obj) {
    entries.push([key, obj[key]]);
  }
  return entries;
}

// 请实现如下函数，可以批量请求数据。所有的url地址都在urls参数中，同时可以通过max控制请求的并发度，当所有请求结束后，调用callback回调函数。请求直接用fetch就可以。函数签名function sendRequest(url, max, callback)
// https://juejin.cn/post/7090388688923787294
function sendRequest(url, max, callback) {

}


// function sendRequest(url, max, callback) {
//     let queue = [];
//     let count = 0;
//     for (let i = 0; i < url.length; i++) {
//         queue.push(fetch(url[i]));
//     }
//     while (queue.length > 0) {
//         if (count >= max) {
//             break;
//         }
//         let promise = queue.shift();
//         promise.then(res => {
//             count++;
//             callback(res);
//         });
//     }
// }

function sendRequest1(tasks, max, callback) {
  let index = 0;
  let together = new Array(max).fill(null);
  const results = [];

  together = together.map(() => {
    return new Promise((resolve, reject) => {
      const run = () => {
        if (index >= tasks.length) {
          resolve();
          return;
        }
        const task = tasks[index++];
        task()
          .then((res) => {
            results[cur] = res;
            run();
          })
          .catch((err) => {
            result[cur] = err;
            run();
            // reject(err);
          });
      };
      run();
    });
  });

  Promise.all(together).then((res) => {
    callback(res);
  });
}

// 并发请求函数
const concurrencyRequest = (urls, maxNum) => {
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }
    const results = [];
    let index = 0; // 下一个请求的下标
    let count = 0; // 当前请求完成的数量

    // 发送请求
    async function request() {
      if (index === urls.length) return;
      const i = index; // 保存序号，使result和urls相对应
      const url = urls[index];
      index++; // 通过闭包返回下一个函数的下标;
      console.log(url);
      try {
        const resp = await fetch(url);
        // resp 加入到results
        results[i] = resp;
      } catch (err) {
        // err 加入到results
        results[i] = err;
      } finally {
        count++;
        // 判断是否所有的请求都已完成
        if (count === urls.length) {
          console.log("完成了");
          resolve(results);
        }
        // 递归
        request();
      }
    }

    // maxNum和urls.length取最小进行调用
    const times = Math.min(maxNum, urls.length); // 20url 并发数 3
    for (let i = 0; i < times; i++) {
      request();
    }
  });
};

// 手写instance of
function instanceOf(father, child) {
  const fp = father.prototype;
  const cp = child.__proto__;
  while (cp) {
    if (cp == fp) {
      return true;
    }

    cp = cp.__proto__;
  }

  return false;
}

// 实现一个扁平化数组
const flatten = (arr) => {
  return arr.reduce((prev, cur, index, arr) => {
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
};

function _flat(arr, depth) {
  if (!Array.isArray(arr) || depth <= 0) {
    return arr;
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur, depth - 1));
    } else {
      return prev.concat(cur);
    }
  }, []);
}

// js是否存在循环引用
function isCyclic(obj) {
  // Use a Set to keep track of objects we have seen
  let seenObjects = new Set();

  function detect(obj) {
    // If the object is not an object or is null, return false
    if (obj && typeof obj === "object") {
      // If we have seen this object before, we have a cycle
      if (seenObjects.has(obj)) {
        return true;
      }
      // Add the object to the set of seen objects
      seenObjects.add(obj);
      // Recursively check each property of the object
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}
let obj1 = {};
let obj2 = { a: obj1 };
obj1.b = obj2;

console.log(isCyclic(obj1)); // should return true

// tiktok常考手写题
