// 递归的其他应用：
// 爬楼梯
// co
// 二分查找
// array数组的flat方法
// 等等

// 爬楼梯：
// 要到达n级楼梯，只有两种方式，从（n-1）级 或 （n-2）级到达的。
// s[3] = s[1] + s[2]， 因为只能从第一级跨两步， 或者第二级跨一步。
function cStairs(n) {
  if(n === 1 || n === 2) {
      return 1;
  } else {
      return cStairs(n-1) + cStairs(n-2)
  }
}
