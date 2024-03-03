const pro1 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(1);
        }, 1000);
    })
};

const pro2 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(2);
        }, 2000);
    })
};

function all(promises) {
    if (Array.isArray(promises)) throw new Error('请传递一个数组');
    let results = [];
    return new Promise((resolve, reject) => {
        let count = 0;
        promises.forEach((promise, index) => {
            promise().then(res => {
                results[index] = res;
                count++;
                if (count == promises.length) {
                    resolve(results);
                }

            }).catch(err => {
                reject(err);
            })
            
        });
    })
};

