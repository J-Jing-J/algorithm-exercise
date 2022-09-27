// 二分搜索

// 时间复杂度：劈成两半：O(logN)

Array.prototype.binarySearch = function (item) {
  this.sort();
  let low = 0;
  let high = this.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    ele = this[mid];
    if (ele < item) {
      low = mid + 1;
    } else if (ele > item) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;

}

const res = [1, 2, 3, 4, 5].binarySearch(5);
console.log(res);

// 递归：
function binaryFind(arr,target,low = 0,high = arr.length - 1) {
  const n = Math.floor((low+high) /2);
  const cur = arr[n];
  if(cur === target) {
      return `找到了${target},在第${n+1}个`;
  } else if(cur > target) {
      return binaryFind(arr,target,low, n-1);
  } else if (cur < target) {
      return binaryFind(arr,target,n+1,high);
  }
  return -1;
}
