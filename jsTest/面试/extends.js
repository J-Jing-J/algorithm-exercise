// 1. 原型链继承
Child.prototype = new Parent();
// 优点： 父类可复用
// 缺点：
// 父类的所有引用属性（info）会被所有子类共享，更改一个子类的引用属性，其他子类也会受影响
// 子类型实例不能给父类型构造函数传参


// 4. 原型式继承：对参数对象的一种浅复制
function objectCopy(obj) {  // 同Object.create
  function Fun() { };
  Fun.prototype = obj;
  return new Fun()
}
let person1 = objectCopy(person);
// 优点：
// 父类方法可复用
// 缺点：
// 父类的引用会被所有子类所共享
// 子类实例不能向父类传参


// 2. 盗用构造函数继承(构造函数继承)
function Child() {
  Parent.call(this)
}
// 优点：
// 可以在子类构造函数中向父类传参数
// 父类的引用属性不会被共享
// 缺点：
// 子类不能访问父类原型上定义的方法（即不能访问Parent.prototype上定义的方法），因此所有方法属性都写在构造函数中，每次创建实例都会初始化


// 3. 组合继承
// 综合了原型链继承和盗用构造函数继承(构造函数继承)
// 既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性
function Child(name, age) {
  // 继承父类属性
  Parent.call(this, name)
  this.age = age;
}
Child.prototype = new Parent();
// 优点：
// 父类的方法可以复用
// 可以在Child构造函数中向Parent构造函数中传参
// 父类构造函数中的引用属性不会被共享


// 4. 寄生式继承
// 使用原型式继承对一个目标对象进行浅复制，增强这个浅复制的能力
function objectCopy(obj) {
  function Fun() { };
  Fun.prototype = obj;
  return new Fun();
}

function createAnother(original) {
  let clone = objectCopy(original);
  clone.getName = function () {
    console.log(this.name);
  };
  return clone;
}

let person = {
     name: "yhd",
     friends: ["rose", "tom", "jack"]
}

let person2 = createAnother(person);


// 5. 寄生式组合继承
function objectCopy(obj) {
  function Fun() { };
  Fun.prototype = obj;
  return new Fun();
}
function inheritPrototype(child, parent) {
  let prototype = objectCopy(parent.prototype); // 创建对象
  prototype.constructor = child; // 增强对象
  Child.prototype = prototype; // 赋值对象
}
// 优点：
// 只调用一次父类构造函数
// Child可以向Parent传参
// 父类方法可以复用
// 父类的引用属性不会被共享