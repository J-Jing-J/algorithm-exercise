const arrTest = [1, 4, 6, 2, 4, 6, 8, 5, 3, 5, 7];

// 归并排序的核心思想：分治，
// 它将一个复杂的问题分成两个或者多个相同或相似的子问题，然后把子问题分成更小的子问题，直到子问题可以简单的直接求解，最原问题的解就是子问题解的合并。

// 实现思路：
// 一开始先把数组从中间划分成两个子数组，一直递归地把子数组划分成更小的子数组，直到子数组里面只有一个元素，才开始排序。
// 排序的方法就是按照大小顺序合并两个元素，接着依次按照递归的返回顺序，不断地合并排好序的子数组，直到最后把整个数组的顺序排好。


Array.prototype.mergeSort = function () {
  const rec = (arr) => {
    if (arr.length === 1) { return arr; }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, arr.length);
    const orderLeft = rec(left);
    const orderRight = rec(right);
    const res = [];
    while (orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
      } else if (orderLeft.length) {
        res.push(orderLeft.shift())
      } else if (orderRight.length) {
        res.push(orderRight.shift())
      }
    }
    return res;
  }
  const res = rec(this);
  res.forEach((n, i) => {
    this[i] = n;
  })
  return this;
}

console.log(arrTest.mergeSort());


const merge = (left, right) => { // 合并数组

  let result = []
  // 使用shift()方法偷个懒,删除第一个元素,并且返回该值
  while (left.length && right.length) {
      if (left[0] <= right[0]) {
          result.push(left.shift())
      } else {
          result.push(right.shift())
      }
  }
  while (left.length) {
      result.push(left.shift())
  }

  while (right.length) {
      result.push(right.shift())
  }
  return result
}

let mergeSort = function (arr) {
  if (arr.length <= 1)
      return arr
  let mid = Math.floor(arr.length / 2)
  // 拆分数组
  let left = arr.slice(0, mid),
      right = arr.slice(mid);
  let mergeLeftArray = mergeSort(left),
      mergeRightArray = mergeSort(right)
  return merge(mergeLeftArray, mergeRightArray)
}

// let arr = [2, 9, 6, 7, 4, 3, 1, 7, 0, -1, -2]
// console.log(mergeSort(arr))