// promise 串行执行
const promiseA = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(2);
        resolve(2);
    }, 2000)
});

const promiseB = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1);
        resolve(1);
    }, 1000)
})


const promiseC = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(3);
        resolve(3);
    }, 3000)
});

function seiral (promises) {
    promises.reduce((prev, cur) => {
        return prev.then(() => cur());
    }, Promise.resolve())
}

seiral([promiseA, promiseB, promiseC]);