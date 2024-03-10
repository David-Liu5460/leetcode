// 1. 'abc'
// 2. 'acd'
// 求word1到word2的最长编辑距离
// 3.4 每日一题
function editDistance(word1, word2) {
    let len1 = word1.length, len2 = word2.length;
    let dp = Array.from(new Array(len1 + 1), () => new Array(len2 + 1).fill(0)); 
    // [0, i-1]、[0, j-1]之间的最长编辑距离

    for(let i = 0; i <= len1; i++) {
        dp[i][0] = i;
    }

    for(let j = 0; i <= len2; i++) {
        dp[0][j] = j;
    }

    for(let i = 1; i <= len1; i++) {
        for(let j = 1; i <= len2; j++) {
            if(word1[i-1] == word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;

            }
        }
    }

    return dp[len1][len2]
    

}