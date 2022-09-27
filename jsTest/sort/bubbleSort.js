const arrTest = [1, 4, 6, 2, 4, 6, 8, 5, 3, 5, 7];

// 冒泡排序：
// O(n的平方)

Array.prototype.bubbleSort = function () {
  // i < this.length - 1因为只需要length-1轮
  for (let i = 0; i < this.length - 1; i++) {
    // j < this.length - 1是为了防止this.length溢出
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {   // 相邻的元素两两对比
        [this[j], this[j+1]] = [this[j+1], this[j]]   // 如果前面的比后面的大，就交换位置
      }
    }
  }
  return this;
}


// 从后往前遍历：
// 这里有两点需要注意：
// 外层循环，从最大值开始递减，因为内层是两两比较，因此最外层当>=2时即可停止；
// 内层是两两比较，从0开始，比较inner与inner+1，因此，临界条件是inner<outer -1
function bubleSort(arr) {
  var len = arr.length;
  for (let outer = len ; outer >= 2; outer--) {
      for(let inner = 0; inner <=outer - 1; inner++) {
          if(arr[inner] > arr[inner + 1]) {
              [arr[inner],arr[inner+1]] = [arr[inner+1],arr[inner]]
          }
      }
  }
  return arr;
}

console.log(arrTest.bubbleSort());

