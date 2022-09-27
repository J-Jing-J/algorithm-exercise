/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  // 这个元素前面的那个元素和前前面的那个元素
  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    // 这个元素的值（目前能偷到最大的值）
    const temp = Math.max(nums[i] + prev2, prev1);
    prev2 = prev1;
    prev1 = temp;
  }
  return prev1;
};


rob([1, 2, 3, 1])