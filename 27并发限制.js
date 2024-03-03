/**2. 实现这样一个函数scheduler，函数入参为并发最大次数。
如下最终输出顺序： 2、3、 1、 4
一开始，1、2两个任务进入队列
500ms时，2完成，输出2，任务3进队
800ms时，3完成，输出3，任务4进队
1000ms时，1完成，输出1
1200ms时，4完成，输出4
**/
// -----------------mock一些请求

const timeout = time => new Promise(resolve => setTimeout(resolve, time));
const request1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  }).then(() => {
    console.log(1);
  });

const request2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  }).then(() => {
    console.log(2);
  });

const request3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 300);
  }).then(() => {
    console.log(3);
  });
  
const request4 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 400);
  }).then(() => {
    console.log(4);
  });;

// 设计一下promis限流函数
function scheduler(max) {
    let workingNum = 0;
    let taskPool = [];



    const addTask = (promise) => {
      taskPool.push(promise);
      doNext();
    };

    const doNext = () => {
        if (taskPool.length && workingNum <  max) {
            workingNum++;
            taskPool.shift()().then(() => {
                workingNum--;
                doNext();
            })
        }
    };

    // const add = (promise) => {
    //     if (workingNum < max) {
    //         addTask(promise);
    //         this.doNext();
    //     } else {
            
    //     }
     
    //     // for(let i = 0; i < this.maxNum; i++) {
    //     //     this.doNext();
    //     // };
    // }

    return addTask;
}

let add = scheduler(2);

add(request1);
add(request2);
add(request3);
add(request4);


