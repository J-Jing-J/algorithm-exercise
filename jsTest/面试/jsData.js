const { get } = require("http");

// 时间格式化，传入date对象和格式（年y，月M，日d）
function dateFormat(date, format) {
  // 从date对象中取出年月日
  const day = date.getDate();
  const month = date.getMonth() + 1;   // 月份返回 0 - 11，要加一
  const year = date.getFullYear();
  // String.replace：利用正则匹配并替换
  format = format.replace(/yyyy/, year);
  format = format.replace(/MM/, month);
  format = format.replace(/dd/, day);
}

// 数组打乱顺序
arr = [1, 2, 3, 4, 5];
const length = arr.length;
for (const i = 0; i < length; i++) {
  // 随机取出 i 到 length-1 ，的任意一个index，与i交换位置
  const randomIndex = Math.round(Math.random(length - 1 - i)) + i;
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
}


// 数组求和
function sum1(arr) {
  return arr.reduce((tatol, i) => {
    total += +i;
  }, 0)
};

function sum2(arr) {
  if (arr.length === 1) return arr[0];
  // 每次只取一个数，后面的递归
  return arr[0] + sum2(arr.slice(1));
};


// 数组扁平化
function flatten1(arr) {
  const res = [];
  const length = arr.length;
  for (const i = 0; i < length; i++) {
    if (Array.isArray(arr[i])) {
      // 递归，把没打平的数组再传进去
      res = res.concat(flatten1(arr[i]))
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

function flatten2(arr) {
  return arr.reduce((prev, next) => {
    // 递归，把没打平的数组再传进去
    return prev.concat(Array.isArray(next) ? flatten2(next) : next);
  }, [])
};

function flatten3(arr) {
  const res = [];
  // while循环，如果数组中还有数组，就展开数组并拼接
  while (arr.some((item) => Array.isArray(item))) {
    // concat接收值无效，仅接收数组时才会拼接。所以concat只接受...arr展开后的数组
    res = res.concat(...arr);
  }
  return res;
}

function flatten4(arr) {
  // 转成字符串再转回数组
  return arr.toString().split(",");
}

function flatten5(arr) {
  return arr.flat(Infinity)
}


// 拼接n个str
function repeat(str, n) {
  if (n > 0) {
    // 递归
    return str.concat(repeat(str, n--));
  } else {
    return "";
  }
}

// 数组去重
// 双重for循环 O(n方)
// 如果数组长度很大，那么将会非常耗费内存
function unique1(arr) {
  if (!Array.isArray(arr)) return
  // 1. 先定义一个包含原始数组第一个元素的数组，
  let res = [arr[0]]
  // 2. 然后遍历原始数组，将原始数组中的每个元素与新数组中的每个元素进行比对，如果不重复则添加到新数组中，
  for (let i = 1; i < arr.length; i++) {
      let flag = true
      for (let j = 0; j < res.length; j++) {
          if (arr[i] === res[j]) {
              flag = false;
              break
          }
      }
      if (flag) {
          res.push(arr[i])
      }
  }
  // 3. 最后返回新数组
  return res
}

// indexOf
function unique2 (arr) {
  if (!Array.isArray(arr)) return;
  const res = []
  for (let i = 0; i < arr.length; i++) {
    // 用indexOf判断：如果元素不在res中，则将其push进res中
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}

// 排序后，根据相邻元素去重
// 这种方法首先调用了数组的排序方法sort()，然后根据排序后的结果进行遍历及相邻元素比对，如果相等则跳过改元素，直到遍历结束
function unique3(arr) {
  if (!Array.isArray(arr)) return;
  const res = []
  arr.sort()
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      res.push(arr[i])
    }
  }
  return res
}

// 利用对象属性去重
// 创建空对象，遍历数组，将数组中的值设为对象的属性，并给该属性赋初始值1，每出现一次，对应的属性值增加1，这样，属性值对应的就是该元素出现的次数了
function unique4(arr) {
  if (!Array.isArray(arr)) return;
  const map = {}
  for (let i = 0; i < arr.length; i++) {
    if (map[arr[i]]) {
      map[arr[i]]++;
    } else {
      map[arr[i]] = 1;
    }
  }
  return Object.keys(map).filter(key => map[key] === 1)
}

// Set去重
function unique5(arr) {
  if (!Array.isArray(arr)) return
  return [...new Set(arr)]
  // return Array.from(new Set(arr))
}


// 版本号排序
// 题目描述:有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']
arr.sort((a, b) => {
  const arr1 = a.split('.')
  const arr2 = b.split('.')

  let i = 0
  while (true) {
    const s1 = arr1[i]
    const s2 = arr2[i]
    i++;

    // 如果有一个到了末尾，就取长的那个
    if (s1 === undefined || s2 === undefined) {
      return arr2.length - arr1.length
    }
    if (s1 === s2) continue;

    return s2 - s1
  }
})


// 分片思想解决大数据量渲染问题
let ul = document.getElementById("container");
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total / once;
//每条记录的索引
let index = 0;

//循环加载数据
function loop(curTotal, curIndex) {
  if (curTotal <= 0) return false;
  //每页多少条
  let pageCount = Math.min(curTotal, once);
  window.requestAnimationFrame(function () {
    for (let i = 0; i < pageCount; i++) {
      let li = document.createElement("li");
      li.innerText = 'xxx'
      ul.appendChild(li)
    }
    loop(curTotal - pageCount, curIndex + pageCount);
  })
}

loop(total, index);

// 扩展思考：对于大数据量的简单 dom 结构渲染可以用分片思想解决
// 如果是复杂的 dom 结构渲染如何处理？
// 这时候就需要使用虚拟列表了


// 大数相加
// let a = "9007199254740991";
// let b = "1234567899999999999";
// 利用字符串相加
function add(a, b) {
  let maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, 0);   //"0009007199254740991"
  b = b.padStart(maxLength, 0);   //"1234567899999999999"

  let t = 0;
  let f = 0;  // 进位
  let sum = ""
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f
    f = Math.floor(t / 10);
    sum = t % 10 + sum  // 字符串相加
  }

  // 循环完，还有进位，就直接字符串相加，加在最前面
  if (f !== 0) {
    sum = '' + f + sum;
  }
  return sum;
}



// 事件委托：
// <ul id="xxx">下面的内容是子元素1
//         <li>li内容>>> <span> 这是span内容123</span></li>
//         下面的内容是子元素2
//         <li>li内容>>> <span> 这是span内容123</span></li>
//         下面的内容是子元素3
//         <li>li内容>>> <span> 这是span内容123</span></li>
// </ul>

// tip: Element的matches API 可以代替 target.nodeName.toLocaleLowerCase === 'li'
// Element.matches(selectorString)，
// selectorString 既是 CSS 那样的选择器规则，比如：target.matches('li.class-1')
function delegate(element, eventType, selector, fn) {
  // 思路是点击 span后，递归遍历 span 的祖先元素看其中有没有 ul 里面的 li。
  element.addEventListener(eventType, e => {
    let el = e.target
    while (!el.matches(selector)) {
      if (element === el) {
        el = null;
        break;
      }
    }
    el = el.parentNode;
  })
}


// 去除首尾多余空格：正则
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, '')
}

// 判断是否是数组
// 如果没有Array.isArray
if (!Array.isArray) {
  Array.isArray = function(o) {
      return typeof(o) === 'object' 
             && Object.prototype.toString.call(o) === '[object Array]';
  }
}


// // 判断NaN
// NaN 有个非常特殊的特性， NaN 与任何值都不相等，包括它自身
// NaN === NaN // false
// NaN == NaN // false
function isNaN(x) {
  return x != x;
}


// 下划线转小驼峰
function getCamelCase(str) {
  // 取_的后一个字母，转成大写
  return str.replace(/_(\w)/g, (_, c) => c ? x.toUpperCase() : '')
  // return str.replace(/_([a-z])/g, (_, c) => c ? x.toUpperCase() : '')
}

function getCamelCase1(str) { 
  const arr = str.split('_');
  return arr.map((item, index) => {
    if (index === 0) {
      return item
    } else {
      return item.charAt(0).toUpperCase() + item.slice(1);
    }
  }).join('')
}



// 驼峰转下划线
function getKebabCase(str) {
  let temp = str.replace(/[A-Z]/g, function (i) {
    return '_' + i.toLowerCase()
  })
  // 如果首字符是_，就删掉第一个字符
  if (temp.slice(0, 1) === '_') {
    temp = temp.slice(1)
  }
  return temp
}

function getKebabCase1(str) {
  let arr = str.split('');
  const res = arr.map(item => {
    if (item.toUpperCase() === item) {
      return '_' + item.toLowerCase()
    } 
    return item
  }).join('')
  return res
}


// 千分位分隔
var str = "100000000000",
    reg = /(?=(\B\d{3})+$)/g;
str.replace(reg, ",")
// 解释：
// g是表示全局匹配的修饰符，全局匹配指查找所有匹配而非在找到第一个匹配后停止。
// $是表示结尾的量词，如n$，匹配的是任何以n为结尾的字符串。
// \d是查找数字的元字符。
// n{X}是匹配包含 X 个 n 的序列的字符串的量词。
// n+是匹配任何包含至少一个 n 的字符串的量词。
// ?=n正向预查，用于匹配任何其后紧接指定字符串 n 的字符串。
// match() String对象的方法，作用是找到一个或多个正则表达式的匹配。
// replace()String对象的方法，作用是替换与正则表达式匹配的子串。
// \B是表示匹配非单词边界的元字符，与其互为补集的元字符是\b，表示匹配单词边界。



// 使用 Proxy 实现 arr 负数索引访问
const proxyArray = arr => {
  const len = arr.length;
  return new Proxy(arr, {
    get(target, key) {
      key = +key
      while (key < 0) {
        key = key + len
      }
      return target[key]
    }
  })
}