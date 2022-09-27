/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // 到达某一个格子的路径总数，为：它上面格子的路径+它左面格子的路径
  const memo = [];
  for (let i = 0; i < m; i++) {
    memo.push([]);
  }
  // 最左边和最上边的都是1，因为只能向左走或者向下走
  for (let row = 0; row < m; row++) {
    memo[row][0] = 1;
  }
  for (let col = 0; col < n; col++) {
    memo[0][col] = 1;
  }
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      memo[row][col] = memo[row - 1][col] + memo[row][col - 1];
    }
  }
  return memo[m - 1][n - 1];
};