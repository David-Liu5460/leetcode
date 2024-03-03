// 1.2.3
// 0.0.1
// 比较版本号
// https://leetcode.cn/problems/compare-version-numbers/description/
// 1.0 1.0.1
var compareVersion = function (version1, version2) {
    // 版本号
    const version1Arr = version1.split('.');
    const version2Arr = version2.split('.');
    const maxLen = Math.max(version1Arr.length, version2Arr.length);
    for(let i = 0; i < maxLen; i++) {
        const num1 = Number(version1Arr[i] || 0);
        const num2 = Number(version2Arr[i] || 0);
        if(num1 > num2) {
            return 1;
        } else if (num1 < num2) {
            return -1;
        }

        if(i === maxLen - 1) {
            return 0;
        }
    };
};