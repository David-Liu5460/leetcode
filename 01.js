/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// var addStrings = function(num1, num2) {
//     // 12 + 123 = 135;
//     let num1Arr = num1.split('').reverse(); // [2,1]
//     let num2Arr = num2.split('').reverse(); // [3,2,1]
//     let maxLen = Math.max(num1Arr.length, num2Arr.length);

//     const sums = new Array(maxLen).fill(0); // ['0', '0', '0']
    

//     for(let i = 0; i < num1Arr.length; i++) {
//         sums[i] = num1Arr[i] - '0'; // [2, 1, 0]
//     }
//     // console.log(sums)

//     for(let j = 0; j < num2Arr.length; j++) {
//         sums[j] += (num2Arr[j] - '0');  // [5, 3, 1]
//     }

//     console.log(sums); // [10]

//     for(let i = 0; i < sums.length - 1; i++) {
//         if (sums[i] > 9) {
//             sums[i+1] += Math.floor(sums[i] / 10);
//             sums[i] %= 10;
//         }
//         console.log(sums);
//     }

//     return sums.reverse().join('')
// };

// 两个字符串相加
var addStrings = function (num1, num2) {
    // 双指针
    let i = num1.length - 1, j = num2.length - 1, carry = 0, sums = [];
    while(i >= 0 || j >= 0 || carry !== 0) {
        let num1Num = i >= 0? num1[i] - '0' : 0;
        let num2Num = j >= 0? num2[j] - '0' : 0;
        let sum = num1Num + num2Num + carry;
        carry = Math.floor(sum / 10);
        sums.unshift(sum % 10);
        i--;
        j--;
    }
    return sums.join('');
}

console.log(addStrings('1', '9'));
// [6, 5, 4]
// [7, 7]
// [13, 12, 4]