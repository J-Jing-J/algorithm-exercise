/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const memo = [];
  memo[0] = nums[0];
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    memo[i] = Math.max(memo[i - 1] + nums[i], nums[i]);
    if (memo[i] > max) {
      max = memo[i];
    }
  }
  return max;
};