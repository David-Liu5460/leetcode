// https://leetcode.cn/problems/qJnOS7/

function commonSequence(str1, str2) {
    let len1 = str1.length, len2 = str2.length;
    // dp数组定义
    // 
    let dp =  Array.from(new Array(len1 + 1), () => new Array(len2).fill(0))
    // abcd
    // dbca
    for (let i = 0; i <= len1; i++) {
        dp[i][0] = 0;
    }

    for (let j = 0; j <= len2; j++) {
        dp[0][j] = 0
    }

    for(let i = 1; i <= len1; i++) {
        for(let j = 1; j <= len2; j++) {
            if (str1[i-1] == str2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j-1], dp[i][j-1]);
            }
        }
    }

    return dp[len1][len2];
}