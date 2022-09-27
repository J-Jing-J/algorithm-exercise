const arrTest = [2, 4, 5, 3, 1];

// 快排
// 时间复杂度：O(n*logN):  劈成两半(递归)logN   分区操作（循环所有才能找到比它大的和比它小的）n

// 如果不考虑稳定性，快排似乎是接近完美的一种方法，但可惜它是不稳定的。

// 什么是稳定性:
// 通俗的讲有两个相同的数A和B，在排序之前A在B的前面，而经过排序之后，B跑到了A的前面，对于这种情况的发生，我们管他叫做排序的不稳定性，而快速排序在对存在相同数进行排序时就有可能发生这种情况。
// 稳定性有什么意义？
// 个人理解对于前端来说，比如我们熟知框架中的虚拟DOM的比较，我们对一个 < ul > 列表进行渲染，当数据改变后需要比较变化时，不稳定排序或操作将会使本身不需要变化的东西变化，导致重新渲染，带来性能的损耗。

// 快排是处理大数据最快的排序算法之一。
// 它是一种分而治之的算法，通过递归的方式将数据依次分解为包含较小元素和较大元素的不同子序列。该算法不断重复这个步骤直至所有数据都是有序的。

// 任意选择一个基准点，可以选第一个1
// 找出比基准点大的和比基准点小的，然后把基准点放入他们的中间，此时基准点排序完成

// 选择一个基准元素，将列表分割成两个子序列；
// 对列表重新排序，将所有小于基准值的元素放在基准值前面，所有大于基准值的元素放在基准值的后面；
// 分别对较小元素的子序列和较大元素的子序列重复步骤1和2

// 递归法：
Array.prototype.quickSort = function () {

  // 递归函数：
  const rec = (arr) => {
    if (arr.length === 1) return arr;
    // 找 左、右、基准点
    const left = [];
    const right = [];
    const mid = arr[0];

    // 比较后分别push进left栈和right栈
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) { left.push(arr[i]) };
      if (arr[i] > mid) { right.push(arr[i]) };
    }

    // 拼接 left 基准点 right 
    return [...rec(left), mid, ...rec(right)];
    // return quickSort(left).concat(mid,quickSort(right))
  }

  const res = rec(this);

  // 为原数组赋新值
  res.forEach((n, i) => {
    this[i] = n;
  })

  console.log(res);
}

arrTest.quickSort()

