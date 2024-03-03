const promise1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('promise1');
        }, 2000);
    });
}

const promise2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('promise1');
        }, 1000);
    });
}

const promise3 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('promise1');
        }, 3000);
    });
};

const fetchWithLimit = (promises, limit) => {
    let res = [];
    let tasks = [];
    return new Promise((resolve, reject) => {
        for(let i = 0; i < limit; i++) {
            tasks.push(promises[i]);
        }

        Promise.all()



    });
}

fetchWithLimit([promise1, promise2, promise3], 2).then(res => {
    console.log(res);
})



