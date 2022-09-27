const arrTest = [1, 4, 6, 2, 4, 6, 8, 5, 3, 5, 7];

// 选择排序
// O(n的平方)

// 假设第一个元素为最小值
// 遍历后面的找到最小值交换位置

// 或者说

// 选择排序是从数组的开头开始，将第一个元素和其他元素作比较，
// 检查完所有的元素后，最小的放在第一个位置，接下来再开始从第二个元素开始
// 重复以上一直到最后。

Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    let minIndex = i;
    // 外层循环的i表示第几轮，arr[i]就表示当前轮次最靠前(小)的位置；
    // 内层从i开始，依次往后数，找到比开头小的，互换位置即可
    for (let j = i; j < this.length; j++) {
      if (this[j] < this[minIndex]) minIndex = j;
    }
    // 如果得到的最小值和初始值不同，就交换
    if (this[i] !== this[minIndex]) {
      [this[i], this[minIndex]] = [this[minIndex], this[i]]
    };
  }
  return this;
}

console.log(arrTest.selectionSort());