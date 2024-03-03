// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

// 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

 

// 示例 1:

// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
//  示例 2:

// 输入: s = "abab", p = "ab"
// 输出: [0,1,2]
// 解释:
// 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
// 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
// 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。

let s = "cbaebabacd", p = "abc";


/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    let res = [], left = right = 0;
    for(let i = 0; i < s.length; i++) {
        if (s.length < p.length) {
            return res;
        }
    }
    let counts = new Array(26).fill(0);
    for(let i = 0; i < p.length; i++) {
        counts[p.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    };

    // for(let i = 0; i < s.length; i++) {
        
    // }
    while(right < s.length) {
        counts[s.charCodeAt(right) - ('a').charCodeAt()]--;
        // right++;
        while((counts[s.charCodeAt(right) - ('a').charCodeAt()]) < 0) {
            counts[s.charCodeAt(left) - ('a').charCodeAt()]++;
            left++;
        };
        // if (left >= s.length)
        if ((right - left + 1) == p.length) {
            res.push(left);
        };
        right++
       
    }
    return res;
};

console.log(findAnagrams(s, p));