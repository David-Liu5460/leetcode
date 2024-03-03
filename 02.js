// 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
// 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

// 示例 1：

// 输入：text1 = "abcde", text2 = "ace" 
// 输出：3  
// 解释：最长公共子序列是 "ace" ，它的长度为 3 。
// 示例 2：

// 输入：text1 = "abc", text2 = "abc"
// 输出：3
// 解释：最长公共子序列是 "abc" ，它的长度为 3 。
// 示例 3：

// 输入：text1 = "abc", text2 = "def"
// 输出：0
// 解释：两个字符串没有公共子序列，返回 0 。
// 最长公共子序列 abcd
// 0 1 2 3
// 1
// 2 
// 3     
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */

// 假设字符串 text1\textit{text}_1text 
// 1
// ​
//   和 text2\textit{text}_2text 
// 2
// ​
//   的长度分别为 mmm 和 nnn，创建 m+1m+1m+1 行 n+1n+1n+1 列的二维数组 dp\textit{dp}dp，其中 dp[i][j]\textit{dp}[i][j]dp[i][j] 表示 text1[0:i]\textit{text}_1[0:i]text 
// 1
// ​
//  [0:i] 和 text2[0:j]\textit{text}_2[0:j]text 
// 2
// ​
//  [0:j] 的最长公共子序列的长度。

// 上述表示中，text1[0:i]\textit{text}_1[0:i]text 
// 1
// ​
//  [0:i] 表示 text1\textit{text}_1text 
// 1
// ​
//   的长度为 iii 的前缀，text2[0:j]\textit{text}_2[0:j]text 
// 2
// ​
//  [0:j] 表示 text2\textit{text}_2text 
// 2
// ​
//   的长度为 jjj 的前缀。

var longestCommonSubsequence = function(text1, text2) {
    let len1 = text1.length, len2 = text2.length;
    const dp = new Array(len1 + 1).fill(0).map(item => new Array(len2 + 1).fill(0));

    for(let i = 1; i < len1 + 1; i++) {
        for (let j = 1; j < len2 + 1; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
            }
        }
    }

    return dp[len1][len2];
};

console.log(longestCommonSubsequence('abc', 'abd'));