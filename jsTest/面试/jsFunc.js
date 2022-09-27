// 防抖
function debounce(fn, await) {
  // 每次清空并重新设置定时器，所以一开始定时器是null
  let timer = null;

  // 返回函数，调用时：dom.fn(arg1, arg2, ...)
  return function () {
    const args = arguments;
    const context = this;
 
    // 频繁操作时重新计时
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, await)
  }
}

// 节流
function throttle(fn, delay) {
  // 以初始时间为基准，只要过了delay的时间，就执行
  let curTime = Date.now();

  return function () {
    const context = this;
    const args = arguments;

    let nowTime = Date.now();
    // 执行并重新计时
    if (nowTime - curTime >= delay) {
      fn.apply(context, args);
      curTime = nowTime;  // 重新计时
    }
  }
}


// 判断数据类型（支持所有类型）
function getType(value) {
  // null 单独处理
  if (value === null) return null + "";

  // 对象类型用Object.prototype.call精准判断
  if (typeof value === 'object') {
    let type = Object.prototype.call(value).split(" ")[1].pop();
    return type.join("").toLowerCase();
  }

  // 基本类型
  return typeof value;
}

// 浅克隆
function shallowClone(obj) {
  if (!obj || typeof obj !== 'object') return;

  const newObj = Array.isArray(obj) ? [] : {};

  // 如果是自己的属性，就直接赋值过去
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }

  return newObj;
}


// 深克隆
function deepClone(obj) {
  if (!obj || typeof obj !== 'object') return;

  const newObj = Array.isArray(obj) ? [] : {};

  // 如果typeof为object，就递归
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }

  return newObj
}

