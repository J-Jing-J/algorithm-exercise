/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const numsLength = nums.length;
  const memo = Array(numsLength).fill(0);
  memo[numsLength - 1] = 1;

  // 从倒数第二个点往前循环
  for (let i = numsLength - 2; i >= 0; i--) {
    // 防止越界
    const maxJump = Math.min(i + nums[i], numsLength - 1);
    // 循环每个点
    for (let j = i + 1; j <= maxJump; j++) {
      // 只要它能走到的任何一个点能走通，那就把这个点也标为1
      if (memo[j] === 1) {
        memo[i] = 1;
        break;
      }
    }
  }
  if (memo[0] === 1) {
    return true
  } else {
    return false;
  }

};