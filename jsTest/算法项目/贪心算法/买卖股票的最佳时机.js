/**
 * @param {number[]} prices
 * @return {number}
 */

//  新建一个变量，统计总利润
// 遍历价格数组，如果当前价格比昨天高，就在昨天买，今天卖，否则不交易
// 返回所有利润之和
// 只考虑一天，贪心算法
var maxProfit = function (prices) {
  if (prices.length === 0) return 0;
  let vally = prices[0];
  let peak = prices[0];
  let maxProfit = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    while (prices[i] >= prices[i + 1]) {
      i++;
    }
    vally = prices[i];
    while (prices[i] <= prices[i + 1]) {
      i++;
    }
    peak = prices[i];
    profit = peak - vally;
    maxProfit += profit;
  }
  return maxProfit;
};