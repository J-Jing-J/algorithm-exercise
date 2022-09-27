
// 实现ES6flat方法
function _flat(arr, deep) {
  if (deep === 0) return arr;
  return arr.reduce((prev, next) => {
    prev = prev.concat(Array.isArray(next) ? _flat(next, deep - 1) : next)
  }, [])
}
// 法二：
// toString方法，连接数组并返回一个字符串 '2,2,3,2,3,4'
// split方法分割字符串，变成数组['2','2','3','2','3','4']
// map方法，将string映射成为number类型2,2,3,2,3,4
Array.prototype.flat = function() {
  this.toString().split(',').map(item=> +item )
}


// Array.push可以传多个值，会按顺序加进去
// Array.push返回的不是数组，而是length
Array.prototype._push = function () {
  // 遍历arguments，并一个个根据下标加进去
  const length = arguments.length;
  for (const i = 0; i < length; i++) {
    // arr的length是动态变化的
    this[this.length] = arguments[i];
  }
  return this.length;
}

Array.prototype._forEach = function (fn) {
  if (this === null || this === undefined) return;
  if (Object.prototype.toString.call(fn) !== "[object Function]") return;
  const arr = this;
  const context = arguments[1] || window;
  for (let i = 0; i < arr.length; i++) {
    fn.call(context, arr[i], i, arr)
  }
}

Array.prototype._filter = function (fn) {
  if (this === null || this === undefined) return;
  if (typeof fn !== 'function') return;
  const res = [];
  const arr = this;
  const context = arguments[1] || window;
  for (const i = 0; i < length; i++) {
    // 如果执行函数后返回true，则push到结果中
    fn.call(context, arr[i], i, arr) && res.push(arr[i]);
  }
  return res;
}


Array.prototype._map = function (fn) {
  if (this === null || this === undefined) return;
  if (typeof fn !== 'function') return;
  const res = [];
  const arr = this;
  const context = arguments[1] || window
  for (const i = 0; i < length; i++) {
    // 将执行fn后的结果push到结果中
    res.push(fn.call(context, arr[i], i, arr));
  }
  return res
}

Array.prototype._every = function (fn) {
  if (this === null || this === undefined) return;
  if (typeof fn !== 'function') return;
  const arr = this;
  const context = arguments[1] || window;
  for (let i = 0; i < arr.length; i++) {
    if (!fn.call(context, arr[i], i, arr)) {
      return false
    }
  }
  return true
}


Array.prototype.some = function (fn) {
  if (this === null || this === undefined) return;
  if (typeof fn !== 'function') return;
  const arr = this;
  const context = arguments[1] || window;
  for (let i = 0; i < arr.length; i++) {
    if (fn.call(context, arr[i], i, arr)) {
      return true
    }
  }
  return false
}

Array.prototype._find = function (fn) {
  if (this === null || this === undefined) return;
  if (typeof fn !== 'function') return;
  const arr = this;
  const context = arguments[1] || window;
  for (let i = 0; i < arr.length; i++) {
    if (fn.call(context, arr[i], i, arr)) {
      return arr[i]
    }
  }
  return undefined
}

Array.prototype.reduce = function (fn) {
  if (this === null || this === undefined) return;
  if (typeof fn !== 'function') return;
  const arr = this;
  const accumulator = arguments[1]  // 初始值
  let i = 0; // 定义在外面，因为如果没传初始值，要从第二个开始遍历
  if (accumulator === undefined) {
    // 没有初始值的空数组，reduce会报错
    if (arr.length === 0) {
      throw new Error('xxx')
    }
    accumulator = arr[i]
    i++;
  }
  for (; i < arr.length; i++) {
    accumulator = fn(accumulator, arr[i], i, arr)
  }
  return accumulator
}


String.prototype._reverse = function () {
  this.split("").reverse().join();
}

// 类数组转为数组
Array.prototype.slice.call(arr);
Array.prototype.splice.call(arr, 0);
Array.prototype.concat.apply([], arr);
Array.from(arr);


Array.prototype.indexOf = function(searchElement, fromIndex) {
  if (this == null) return;
  if (this.length === 0) return -1;

  // 接收到的开始参数
  const fromIndex = +fromIndex || 0;

  if (fromIndex >= this.length) return -1;

  // 指针，从开始位置向后遍历
  // 若开始索引传的是负数，则代表从后面的第n个开始
  // 开始索引不接受负数，若 fromIndex 为负数，则改为从 0 开始
  const resIndex = Math.max(fromIndex >= 0 ? fromIndex : this.length - Math.abs(fromIndex), 0);

  // 只要没遍历到最后，就一直找，找到了直接退出
  while (resIndex < this.length) {
    // indexOf使用 === 比较
    if (this[resIndex] === searchElement) { // === 匹配
      return resIndex;
    }
    resIndex++;
  }

  // 循环完没找到返回 -1
  return -1;
};


// findIndex接收函数，类似filter的写法，函数返回true就返回
Array.prototype.findIndex = function (predicate) {
  
  if (this == null) return;
  if (typeof predicate !== 'function') return;

  var thisArg = arguments[1];
  let resIndex = 0;

  while (resIndex < this.length) {
    if (predicate.call(thisArg, this[resIndex], resIndex, this)) { // 比较函数判断
      return resIndex; 
    }
    resIndex++;
  }

  return -1;
}


