async function handleNext(middlewares) {
    // 定义执行中间件的内部函数
    const dispatch = async (i) => {
        // 如果中间件执行完毕，则不执行任何操作
        if (i === middlewares.length) return Promise.resolve();
        // 获取当前中间件
        const currentMiddleware = middlewares[i];
        // 执行当前中间件，并传入函数以递归执行下一个中间件
        return currentMiddleware(() => dispatch(i + 1));
    };

    // 从第一个中间件开始执行
    await dispatch(0);
}

// 将middleWare定义移到上面的async function外面来
async function wrap1(next) {
    console.info('1');
    await next();
    console.info('1 end');
    return Promise.reject('end wrap');
}

async function wrap2(next) {
    console.info('2');
    await next();
    console.info('2 end');
}

async function wrap3(next) {
    console.info('3');
    await next();
    console.info('3 end');
}

// wrap4中添加对next的调用，以保证兼容性和示例的完整性
async function wrap4(next) {
    await new Promise((res) => {
        setTimeout(() => {
            console.info('inner');
            res();
        }, 1000)
    });
    await next(); // 即使是空函数，也应该调用next来保持洋葱模型的完整性
}

// 调用handleNext
handleNext([wrap1, wrap2, wrap3, wrap4]).catch(error => {
    console.error(error); // 捕获并处理Promise链中的任何错误
});
