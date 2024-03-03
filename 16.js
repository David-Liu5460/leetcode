// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

// 示例：

// 输入：s = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
function minimamumSizeSubarraySum(s, nums) {
  let sum = 0;
  let left = 0;
  let right = 0;
  let res = nums.length + 1;
  while (right < nums.length) {
    sum += nums[right];
    right++;
    while (sum >= s) {
      res = Math.min(res, right - left); // 1 - 0 = 1
      sum -= nums[left];
      left++;
    }
  }

  return res === nums.length + 1 ? 0 : res;
}

console.log(minimamumSizeSubarraySum(7, [2, 3, 1, 2, 4, 3]));
