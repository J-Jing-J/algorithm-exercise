Object.prototype._create = function(proto, properties) {
  function F() { };
  // 第一个参数 提供新创建的对象的__proto__
  F.prototype = proto;
  // propertiesObject是可选参数，指定要添加到新对象上的可枚举的属性（即其自定义的属性和方法，可用hasOwnProperty()获取的，而不是原型对象上的）的描述符及相应的属性名称
  if(properties) {
      Object.defineProperties(F, properties);
  }
  return new F();
}
// var hh = Object.create({ a: 11 }, { mm: { value: 10 } })


// 某实例（第一个参数） 是否是某构造函数（第二个参数）构造出来的
function _instanceof(obj, constructor) {
  // 取出实例和构造函数的原型，逐层比较
  // 从实例中拿原型，最好不要用obj.__proto__，用Object.getPrototypeOf(obj)
  const proto1 = Object.getPrototypeOf(obj);
  const proto2 = constructor.prototype;

  while (true) {
    if (!proto1) return false;  // 实例的原型没有匹配的
    if (proto1 === proto2) return true;  // 匹配了
    // 这层prototype不匹配，就向上找一层，直到最后的null
    proto1 = Object.getPrototypeOf(proto1);
  }
}


function _new(constructor, ...args) {
  if (typeof constructor !== 'function') return;
  // 传原型，构造新对象
  const newObj = Object.create(constructor.prototype);
  // 执行constructor（this指向新对象），为新对象添加一些属性等
  let result = constructor.apply(newObj, args);
  // 如果构造函数返回的是object或function，就返回构造函数返回的
  if (result && (typeof result === 'object' || typeof result === 'function')) {
    return result;
  }
  return newObj;
}


// Object.is
// 不会转换被比较的两个值的类型，这点和 === 更为相似，他们之间也存在一些区别。
//  1. NaN在===中是不相等的，而在Object.is中是相等的
//  2. +0和-0在===中是相等的，而在Object.is中是不相等的
Object._is = function (x, y) {
  if (x === y) {
    // 当前情况下，只有一种情况是特殊的，即 +0 -0
    // 如果 x !== 0，则返回true
    // 如果 x === 0，则需要判断+0和-0
    // 则可以直接使用 1 / +0 === Infinity 和 1 / -0 === -Infinity来进行判断
    return x !== 0 || 1 / x === 1 / y
  }
  // x !== y 的情况下，只需要判断是否为NaN，如果x!==x，则说明x是NaN，同理y也一样
  // x和y同时为NaN时，返回true
  return x !== x && y !== y
}

