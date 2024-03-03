class HD {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    this.status = HD.PENDING;
    this.value = null;
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      // 如果执行器抛出错误，则立即拒绝
      this.reject(error);
    }
    this.callbacks = [];
    // executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.status === HD.PENDING) {
      this.status = HD.FULFILLED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.forEach((item) => {
          item.onFulfilled(value);
        });
      });
      // this.callbacks.forEach(item => {
      //     item.onFulfilled(value);
      // })
    }
  }

  reject(reason) {
    if (this.status === HD.PENDING) {
      this.status = HD.REJECTED;
      this.value = reason;
      setTimeout(() => {
        this.callbacks.forEach((item) => {
          item.onRejected(reason);
        });
      });
      // this.callbacks.forEach(item => {
      //     item.onRejected(reason);
      // })
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => this.value;
    }
    if (typeof onRejected !== "function") {
      onRejected = () => this.value;
    }
    return new HD((resolve, reject) => {
      // this.then(onFulfilled, onRejected);
      if (this.status === HD.PENDING) {
        // return new HD((resolve, reject) => {
        //     this.then(onFulfilled, onRejected);
        // })
        this.callbacks.push({
          onFulfilled: (value) => {
            try {
              let result = onFulfilled(value);
              if (result instanceof HD) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            //   resolve(result);
            } catch (error) {
              let result = onRejected(error);
              if (result instanceof HD) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            //   reject(result);
            }
            // onFulfilled(value);
          },
          onRejected: (reason) => {
            try {
              onRejected(reason);
            } catch (error) {
              reject(error);
            }
            // onRejected(reason);
          },
        });
      }
      if (this.status === HD.FULFILLED) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value);
            

            // 判断promise类型
            if (result instanceof HD) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        });

        // onFulfilled(this.value);
      } else if (this.status === HD.REJECTED) {
        setTimeout(() => {
          try {
           let result = onRejected(this.value);
           if(result instanceof HD) {
             result.then(resolve, reject);
           } else {
            resolve(result);
           }
        //    resolve(result);
          } catch (error) {
            reject(error);
          }
        });
        // try {
        //     onRejected(this.value);˝
        // } catch (error) {
        //     onRejected(error);
        // }
        // onRejected(this.value);
      }
    });
  }
}

new HD((resolve, reject) => { setTimeout(() => { resolve('success')}, 3000);}).then(res => {console.log(res)});
