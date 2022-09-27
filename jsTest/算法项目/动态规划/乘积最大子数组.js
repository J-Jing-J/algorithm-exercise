/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  // 要保留一下最小的乘积（Product），因为最小的负数乘以一个负数时，有可能变成最大的数
  const maxProductMemo = [];
  const minProductMemo = [];
  maxProductMemo[0] = nums[0];
  minProductMemo[0] = nums[0];

  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxProductMemo[i] = Math.max(
      nums[i],
      maxProductMemo[i - 1] * nums[i],
      minProductMemo[i - 1] * nums[i]
    )
    minProductMemo[i] = Math.min(
      nums[i],
      maxProductMemo[i - 1] * nums[i],
      minProductMemo[i - 1] * nums[i]
    )
    max = Math.max(maxProductMemo[i], max)

  }
  return max;
};