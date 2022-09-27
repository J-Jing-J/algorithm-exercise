/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const numsLength = nums.length;
  const memo = Array(numsLength).fill(0);
  memo[numsLength - 1] = 1;
  const jump = (position) => {
    if (memo[position] === 1) {
      return true;
    } else if (memo[position] === -1) {
      return false;
    }

    const maxJump = Math.min(nums[position] + position, numsLength - 1)
    for (let i = position + 1; i <= maxJump; i++) {
      const jumpResult = jump(i);
      if (jumpResult === true) {
        memo[i] = 1;
        return true;
      }
    }
    memo[position] = -1;
    return false;
  }

  return jump(0);
};