// 写一个防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// 手写一个节流函数
function throttle (func, wait) {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(context, args);
                timer = null;
            }, wait);
        }
    }
}
