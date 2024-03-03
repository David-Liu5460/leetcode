const get = (obj, path, defaultVal) => {
  if (typeof path == "string") {
    path = path.replace(/\[(\d+)\]/g, ".$1").split(".");
    // path = path.replace(/\[(\d+)\]/g, '.$1')
    console.log(path, 1234);
  }
  let val = obj;
  for (let key of path) {
    if (val && val.hasOwnProperty(key)) {
      // console.log(val, 233);
      val = val[key];
    } else {
      val = defaultVal;
    }
  }
  return val;
};

let obj = {
  a: [
    {
      b: {
        c: 1,
      },
    },
  ],
};

// console.log(get(obj, 'a[0].b.c')); // 1
// console.log(get(obj, ['a', '0', 'b', 'c'])); // 1

const str = "asdf${test1},asdff${test2.test1}asdf${test3}";
const data = {
  test1: "test1",
  test2: { test1: "test1" },
  test3: 2,
};

const renderTemplate = (str, data) => {
  let res = str.replace(/\${(.*?)}/g, (a, b, c, d) => {
    let val = data;

    const path = b.split(".");

    console.log(a, b, c, d);
    for (key of path) {
      if (val && val.hasOwnProperty(key)) {
        val = val[key];
      } else {
        val = undefined;
      }
    }

    return val;
  });
  return res;
};

// renderTemplate(str, data);

// console.log(renderTemplate(str, data));

/** 5.
 * promisify是node的utils模块中的一个函数，
 * 作用就是为了转换最后一个参数是回调函数的函数为promise函数，且回调函数中有两个参数：error 和 data
 */
// const readFile = (fileName, callback) => {
//     setTimeout(() => {
//         console.log('fileName', fileName);
//         callback(null, 'success');
//     }, 1000)
//   }

//   const asyncReadFile = promisify(readFile);

//   async function example() {
//     try{
//         const result = await asyncReadFile('1.txt');
//         console.log('fire', result);
//     }catch(error){
//         console.log('error',error);
//     }
//   }

var promisify = (func, ctx) => {
  let context = ctx || this;
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        if (err) {
          reject(err);
        } else {
          resolve(results.length == 1 ? results[0] : results);
        }
      };
      func.apply(context, [...args, callback]);
    });
  };
};

// 使用示例保持不变
const readFile = (fileName, callback) => {
  setTimeout(() => {
    // console.log("fileName", fileName);
    callback(null, "success");
  }, 1000);
};

const asyncReadFile = promisify(readFile);

async function example() {
  try {
    const result = await asyncReadFile("1.txt");
    console.log("fire", result);
  } catch (error) {
    console.log("error", error);
  }
}

example();
