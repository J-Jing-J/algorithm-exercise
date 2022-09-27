class EventBus {
  // 定义所有事件列表,此时需要修改格式：
  // // {
  //   key: {
  //     D+id: Function,
  //     id: Function
  //   },
  //   key: Object,
  // } 
  // Array存储的是注册的回调函数
  constructor() {
    this.eventObj = {}; // 用于存储所有订阅事件
    this.callbcakId = 0; // 每个函数的ID
  }
  // 订阅事件,类似监听事件$on('key',()=>{})
  $on(name, callbcak) {
    // 判断是否存储过
    if (!this.eventObj[name]) {
      this.eventObj[name] = {};
    }
    // 定义当前回调函数id
    // 用 id 存，是为了使每次订阅有唯一 id，以便取消
    const id = this.callbcakId++;
    this.eventObj[name][id] = callbcak; // 以键值对的形式存储回调函数
    return id; // 将id返回出去，可以利用该id取消订阅
  }
  // 发布事件,类似于触发事件$emit('key')
  $emit(name, ...args) {
    // 获取存储的事件回调函数数组
    const eventList = this.eventObj[name];
    // 执行所有回调函数且传入参数
    for (const id in eventList) {
      eventList[id](...args);
      // 如果是订阅一次，则删除
      if(id.indexOf('D') !== -1) {
        delete eventList[id];
      }
    }
  }
  // 取消订阅函数，类似于$off('key1', id)
  $off(name, id) {
    console.log(this.eventObj)
    // 删除存储在事件列表中的该事件
    delete this.eventObj[name][id];
    console.info(`${id}id事件已被取消订阅`)
    // 如果这是最后一个订阅者，则删除整个对象
    if (!Object.keys(this.eventObj[name]).length) {
      delete this.eventObj[name];
    }
  }
  // 订阅事件，只会执行一次，为了方便，id上直接加上一个标识d
  $once(name, callbcak){
    // 判断是否存储过
    if (!this.eventObj[name]) {
      this.eventObj[name] = {};
    }
    // 定义当前回调函数id,添加D则代表只执行一次
    const id = "D" + this.callbcakId++;
    this.eventObj[name][id] = callbcak; // 以键值对的形式存储回调函数
    return id; // 将id返回出去，可以利用该id取消订阅
  }
}
// 初始化EventBus
let EB = new EventBus();


// 订阅事件
EB.$on('key1', (name, age) => {
  console.info("我是订阅事件A:", name, age);
})
EB.$once("key1", (name, age) => {
  console.info("我是订阅事件B:", name, age);
})
EB.$on("key2", (name) => {
  console.info("我是订阅事件C:", name);
})


// 发布事件key1
EB.$emit('key1', "小猪课堂", 26);
console.info("在触发一次key1")
EB.$emit('key1', "小猪课堂", 26);
// 发布事件
EB.$emit('key2', "小猪课堂");