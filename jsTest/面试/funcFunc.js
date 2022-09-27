// fn.call(this, arg1, arg2, ...)
Function.prototype._call = function (context) {
  if (typeof this !== 'function') return;

  const args = [...arguments].slice(1);  // 去掉第一个参数this，剩下的都是要传的参数
  context = context || window;  

  context.fn = this;  // 暂时把fn挂载到context的属性上

  let result;
  if (args) {
    result = context.fn(args);
  } else {
    result = context.fn();
  }

  delete context.fn;  // 执行完记得删除临时的fn属性
  return result;
}


Function.prototype._apply = function (context) {
  if (typeof this !== 'function') return;

  context = context || window;
  const args = [...arguments[1]];  // 和call只有解析args的区别

  context.fn = this;

  let result;

  if (args) {
    result = context.fn(args);
  } else {
    result = context.fn()
  }
  return result;
}


Function.prototype._bind = function (context) {
  if (typeof this !== 'function') return;

  context = context || window;
  const args1 = [...arguments].slice(1);
  const fn = this;

  // bind不直接执行，而是返回函数，下次执行还可以传参
  return function Fn() {
    const args2 = [...arguments];
    // 用闭包引用着bind时要执行的那个函数fn
    fn.apply(this instanceof Fn ? this : context, [...args1, args2]);
  }
}


// 函数柯里化
var curring = () => {
  // 柯里化编程思想：利用闭包把信息存起来供下级上下文调用
  var result = [];

  var add = (...args) => {
    result = result.concat(args);
    return add;
  };

  // 函数的结束返回值：function与原始值计算时会隐式调用toString/valueOf
  add.valueOf = add.toString = () => {
     return result.reduce((pre, cur) => pre + cur, 0);
  }

  // 持续调用：返回函数
  return add;
};
// 调用方式
var add = curring();
console.log(+add(1)(2)(3)(4)(5)(6));
console.log(+add(1, 2)(3, 4)(5, 6));
console.log(+add(1, 2, 3, 4, 5, 6));


function compose(...funcs) {
  const length = funcs.length;
  let index = length - 1;
  return function () {
    let res;
    if (length) {
      res = funcs[index].apply(this, ...arguments)
    } else {
      res = arguments[0];
    }
    while (--index >= 0) {
      res = funcs[index].call(this, ...arguments)
    }
    return res;
  }
}

// 组合函数
// 其实大致思想就是将 c(b(a(a(1)))) 这种写法简写为 compose(c, b, a, a)(x) 【因为c(b(a(a(1))))可读性差】
// 注意这里如果一个函数都没有传入，那就是传入的是什么就返回什么，并且函数的执行顺序是和传入的顺序相反的。这两点需要注意。
function compose(...funcs) {
  // funcs(数组)：记录的是所有的函数
  // 这里其实也是利用了柯里化的思想，函数执行，生成一个闭包，预先把一些信息存储，供下级上下文使用
  return (x) => {
    if (!funcs.length) return x;
    if (funcs.length === 1) return funcs[0](x)
    return funcs.reduceRight(func => {
      return func(x)
    }, x)
  }
}
// 使用：
var resFn = compose(c, b, a, a);
resFn(1);


// 寄生组合
function Parent() {
  this.name = ''
  this.say = function () {
    
  }
}

function Children() {
  Parent.call(this)
}

Children.prototype = Object.create(Parent.prototype)
Children.prototype.constructor = Children