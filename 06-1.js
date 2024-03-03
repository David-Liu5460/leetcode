/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let arr = [-1,0,1,2,-1,-4];
var threeSum = function(nums) {
    if (nums.length < 3) return [];
    debugger
    nums.sort((a, b) => (a-b));
    const res = [];
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) return res;
        if(i > 0 && nums[i] == nums[i-1]) continue;
        let left = i+1;
        let right = nums.length - 1;
        while(left < right) {
             const sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                res.push([nums[i], nums[left], nums[right]]);
                // while (left < right && nums[left] == num[left+1]) left++;
                // while (left < right && nums[right] == nums[right-1]) right--;
                // left++;
                // right--;
                 while(left < right && nums[left] == nums[left + 1]) left++;
               while(left < right && nums[right] == nums[right - 1]) right--;
               left++;
               right--;
            } else if (sum > 0) {
                right--;
            } else {
                left++;
            }
        }
    }
    return res;
};

console.log(threeSum(arr));