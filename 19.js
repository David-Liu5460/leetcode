/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 
 * 
 */

// 输入：candidates = [2,3,6,7], target = 7
// 输出：[[2,2,3],[7]]
// 解释：
// 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
// 7 也是一个候选， 7 = 7 。
// 仅有这两种组合。

var combinationSum = function(candidates, target) {
    // candidates.sort();
    let res = [];
    let path = [];
    
    function backtrack(candidates, target, sum, startIndex) {
        if(sum > target) return;
        if (sum == target) {
            res.push([...path]);
            return;
        }

        for(i = startIndex; i < candidates.length; i++) {
            sum += candidates[i];
            path.push(candidates[i]);
            backtrack(candidates, target, sum, i);
            sum -= candidates[i];
            path.pop();
        }
    }

    backtrack(candidates, target, 0, 0);

    return res;
    

};

console.log(combinationSum([2,3,6,7], 7));