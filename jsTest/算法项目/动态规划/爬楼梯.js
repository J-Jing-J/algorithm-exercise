var climbStairs = function (n) {
  if (n < 2) return 1;
  // 优化，用两个变量优化空间复杂度
  let dp0 = 1;
  let dp1 = 1;
  for (let i = 2; i <= n; i++) {
    const temp = dp0;
    dp0 = dp1;
    dp1 = temp + dp1;
  }
  return dp1;
};

climbStairs(2);