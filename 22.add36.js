// function add36(a, b) {
//     // 建立36进制的映射
//     const charToValue = {};
//     const valueToChar = {};
//     for (let i = 0; i < 36; i++) {
//       const char = i < 10 ? String(i) : String.fromCharCode(i - 10 + 'a'.charCodeAt(0));
//       charToValue[char] = i;
//       valueToChar[i] = char;
//     }

//     console.log(charToValue, valueToChar, 211)

//     // 逐位相加
//     let result = '';
//     let carry = 0; // 进位
//     let i = a.length - 1;
//     let j = b.length - 1;

//     while (i >= 0 || j >= 0 || carry > 0) {
//       // 获取a和b当前位上的数值，若已经没有位了则为0
//       const aValue = i >= 0 ? charToValue[a[i]] : 0;
//       const bValue = j >= 0 ? charToValue[b[j]] : 0;

//       // 逐位相加，加上进位
//       const sum = aValue + bValue + carry;

//       // 计算新的进位
//       carry = Math.floor(sum / 36);

//       // 计算当前位的结果，并加到最终结果字符串的前面
//       result = valueToChar[sum % 36] + result;  // unshift

//       // 移动到下一位
//       i--;
//       j--;
//     }

//     return result;
//   }

//   // 测试
//   console.log(add36('1z', '2x')); // 应输出 51
//   console.log(add36('zz', '1')); // 应输出 100
//   console.log(add36('1a', '1'));

const str = "asdf${test1},asdff${test2.test1}asdf${test3++}";
const data = {
  test1: "test1",
  test2: { test1: "test1" },
  test3: 2,
};

// const transform = (str, data) => {
//   return str.replace(/\${(.*?)}/g, (...args) => {
//     console.log(args);
//     const [match, p1] = args;
//     debugger
//     console.log(match, p1);
//     let keys = p1.split(".");
//     let value = data;
//     console.log("keys", keys);
//     for (let key of keys) {
//       if (value.hasOwnProperty(key)) {
//         value = value[key];
//       } else {
//         value = "";
//         break;
//       }
//       console.log("value", value);
//     }

//     return value;
//   });
// };

const transform = (str, data) => {
  return str.replace(/\${(.*?)}/g, (match, expression) => {
    try {
      // 创建一个新函数，将data对象作为参数传入
      // 并返回模板字符串中表达式的执行结果
      const evaluate = new Function(
        "data",
        `with (data) { return ${expression}; }`
      );

      // 执行函数并返回结果
      return evaluate(data);
    } catch (error) {
      console.error("Error evaluating expression:", expression);
      return "";
    }
  });
};

console.log(transform(str, data));
