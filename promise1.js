const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});
const promise2 = promise1.then(() => {
  throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
setTimeout(() => {
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);

// pending pending
//

Promise.resolve()
  .then(() => {
    return new Error("error!!!");
  })
  .then((res) => {
    console.log("then: ", res);
  })
  .catch((err) => {
    console.log("catch: ", err);
  });
// then: error
// 返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))，因此它会被then捕获而不是catch。

Promise.reject("err!!!")
  .then(
    (res) => {
      console.log("success", res);
    },
    (err) => {
      console.log("error", err);
    }
  )
  .catch((err) => {
    console.log("catch", err);
  });

// 13. 代码输出结果
// .finally()一般用的很少，只要记住以下几点就可以了：

// .finally()方法不管Promise对象最后的状态如何都会执行
// .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是无法知道Promise最终的状态是resolved还是rejected的
// 它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象。
// finally本质上是then方法的特例

Promise.resolve("1")
  .then((res) => {
    console.log(res);
  })
  .finally(() => {
    console.log("finally");
  });

Promise.resolve("2")
  .finally(() => {
    console.log("finally2");
    return "我是finally2返回的值";
  })
  .then((res) => {
    console.log("finally2后面的then函数", res);
  });

// 15
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

console.log("1");

setTimeout(function () {
  console.log("2");
  process.nextTick(function () {
    console.log("3");
  });
  new Promise(function (resolve) {
    console.log("4");
    resolve();
  }).then(function () {
    console.log("5");
  });
});
process.nextTick(function () {
  console.log("6");
});
new Promise(function (resolve) {
  console.log("7");
  resolve();
}).then(function () {
  console.log("8");
});

setTimeout(function () {
  console.log("9");
  process.nextTick(function () {
    console.log("10");
  });
  new Promise(function (resolve) {
    console.log("11");
    resolve();
  }).then(function () {
    console.log("12");
  });
});

// 17. 注意：all和race传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then((res) => console.log("result: ", res))
  .catch((err) => console.log(err));

// 27
// 1 宏任务 7 6 8 2 4 3 5 9 11 10 12
console.log("1");

setTimeout(function () {
  console.log("2");
  process.nextTick(function () {
    console.log("3");
  });
  new Promise(function (resolve) {
    console.log("4");
    resolve();
  }).then(function () {
    console.log("5");
  });
});

process.nextTick(function () {
  console.log("6");
});

new Promise(function (resolve) {
  console.log("7");
  resolve();
}).then(function () {
  console.log("8");
});

setTimeout(function () {
  console.log("9");
  process.nextTick(function () {
    console.log("10");
  });
  new Promise(function (resolve) {
    console.log("11");
    resolve();
  }).then(function () {
    console.log("12");
  });
});

// srcipt start sync1 start promise1 srcipt end async1 success async1 end
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
  });
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => console.log(res));
console.log("srcipt end");

// 22. script start  async1 start async2 promise1 script end  async1 end  promise2 setTimeout
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");

// 24. 3 7 4 1 2 5 p : resloved 1
const first = () =>
  new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
      console.log(7);
      setTimeout(() => {
        console.log(5);
        resolve(6);
        console.log(p);
      }, 0);
      resolve(1);
    }); // 1
    resolve(2);
    p.then((arg) => {
      console.log(arg);
    });
  });
first().then((arg) => {
  console.log(arg);
});
console.log(4);

// 25. script start / async1 / promise1 / script end / 1 / timer2 / timer1
const async1 = async () => {
  console.log("async1");
  setTimeout(() => {
    console.log("timer1");
  }, 2000);
  await new Promise((resolve) => {
    console.log("promise1");
  });
  console.log("async1 end");
  return "async1 success";
};
console.log("script start");
async1().then((res) => console.log(res));
console.log("script end");
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then((res) => console.log(res));
setTimeout(() => {
  console.log("timer2");
}, 1000);

// 28. 1 / 3 / 8 / 4 / 2 / 5 / 6/ 7
console.log(1);

setTimeout(() => {
  console.log(2);
});

new Promise((resolve) => {
  console.log(3);
  resolve(4);
}).then((d) => console.log(d));

setTimeout(() => {
  console.log(5);
  new Promise((resolve) => {
    resolve(6);
  }).then((d) => console.log(d));
});

setTimeout(() => {
  console.log(7);
});

console.log(8);

// 29 1 4 7 5 2 3 6
// 30 2 3 7 8 4 5 6 1
