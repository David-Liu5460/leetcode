// promise.all
// promise.race

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    promises = Array.from(promises);
    if (promises.length === 0) {
      resolve([]);
    } else {
      let count = 0;
      let res = [];
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((data) => {
            res[index] = data;
            count++;
            if (count === promises.length) {
              resolve(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  });
};

Promise.race = function (promises) {
  // 手写Promise.race
};

// Promise.race
Promise.race1 = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(
        (val) => {
          resolve(val);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};
