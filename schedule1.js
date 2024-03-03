// 头条前端笔试题 - 实现一个带并发限制的promise异步调度器

// zz_jesse

// 于 2020-07-11 23:50:50 发布

// 阅读量5.7k
//  收藏 8

// 点赞数 5
// 版权

// 这道题是之前从同事那里要过来的头条笔试题的其中一个，而且promise 并发执行问题在面试中很常见，所以今天就来简单的写下相关的代码，可能方法不止一个，算是抛砖引玉吧。

// 题目详情：

// 我们都知道promise.all方法可以执行多个promise，你给他多少个他就执行多少个，而且是一起执行，也就是并发执行。如果你给他100个，他会同时执行100个，如果这100个promise内都包含网络请求呢？

// 可能有人说，这种场景不多吧，一个页面内加起来就没几个接口，何况是并发请求了

// 但是如果让你做个文件分片上传呢？一个几百兆的文件分片后可能有几百个片段了吧。当然这也是一种极端情况，不过这确实是一个很明显的问题，还是需要解决的。

// 所以需要我们控制同时执行的promise个数，比如控制为2个，后面的所有promise都排队等待前面的执行完成。

// 进入正题，上面的代码不控制并发的情况下的执行顺序应该是

// 3
// 4
// 2
// 1

// 控制并发为2后的执行结果是

// 2
// 3
// 1
// 4

// 这个题本身也并不难，主要还是考察对题目的理解。

// 简单说下思路

// 先把要执行的promise function 存到数组内

// 既然是最多为2个，那我们必然是要启动的时候就要让两个promise函数执行

// 设置一个临时变量，表示当前执行ing几个promise

// 然后一个promise执行完成将临时变量-1

// 然后借助递归重复执行

// 代码如下：

function Scheduler() {
  this.list = [];
  this.add = function (promiseCreator) {
    this.list.push(promiseCreator);
  };

  this.maxCount = 2;

  var tempRunIndex = 0;

  this.taskStart = function () {
    for (var i = 0; i < this.maxCount; i++) {
      request.bind(this)();
    }
  };

  function request() {
    if (!this.list || !this.list.length || tempRunIndex >= this.maxCount) {
      return;
    }

    tempRunIndex++;
    this.list
      .shift()()
      .then(() => {
        tempRunIndex--;
        request.bind(this)();
      });
  }
}

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

var scheduler = new Scheduler();

function addTask(time, order) {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
}

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);

scheduler.taskStart();

// ok，上面是全部代码，下面是执行结果
// ————————————————
// 版权声明：本文为CSDN博主「zz_jesse」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/zz_jesse/article/details/107293743
