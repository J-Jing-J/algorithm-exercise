/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  const sortFunc = (a, b) => {
    // 升序排列
    return a - b;
  }
  g.sort(sortFunc);
  s.sort(sortFunc);
  let i = 0;
  s.forEach((n) => {
    // 尽量让最小的饼干满足最小的孩子
    if (n >= g[i]) {
      i++;
    }
  })
  return i;
};