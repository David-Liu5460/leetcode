// 大数相乘
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 *. 123
*.  456
 * 000000
 */
var multiply = function(num1, num2) {
    let len1 = num1.length, len2 = num2.length, mul = new Array(len1 + len2).fill(0);
    for (let i = len1 - 1; i >= 0; i--) {
        let numi = num1[i] - '0';
        for (let j = len2 - 1; j >= 0; j--) {
            let numj =  num2[j] - '0';
            let currentVal = mul[i+j+1] + numi * numj; // 18
            console.log(currentVal, 211)
            mul[i + j + 1] = (currentVal % 10); // 当前位
            mul[i + j] = Math.floor(currentVal / 10); // 进位
        }
    }
    console.log(mul, 123);
    while(mul[0] == 0) {
        mul.shift();
    }
    return mul.join('');
};

console.log(multiply('123', '456'));


