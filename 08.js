// promise串行执行
const promise1 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log('promise1');
            res()
        }, 2000);
        // resolve()
    })
};

const promise2 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log('promise2');
            res()
        }, 1000);
        // resolve()
    })
};

const promise3 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log('promise3');
            res()
        }, 1000);
        // resolve()
    })
};

// const promise2 = () => {
//     return new Promise(() => {
//         setTimeout(() => {
//             console.log('promise2');
//         }, 1000);
//     }
//     // resolve()
// });

// const promise3 = new Promise(() => {
//     setTimeout(() => {
//         console.log('promise3');
//     }, 3000);
//     // resolve()
// });

// promise顺序执行
const promiseOrder = (arr) => {
    arr.reduce((prev, cur, index, arr) => {
        return prev.then(() => cur());
    }, Promise.resolve());
}

// 顺序打印2 1 3
promiseOrder([promise1, promise2, promise3]);
