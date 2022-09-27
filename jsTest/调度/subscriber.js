// 发布订阅模式
// 使用EventEmitter2时，主要是用emit发事件，用on监听事件，还有off销毁事件监听者，
class PubSub {
  construstor() {
    this.events = {}
  }

  // 订阅方法
  subscribe(type, cb) {
    if (!this.event[type]) {
      this.events[type] = [cb]
    } else {
      this.event[type].push(cb)
    }
  }

  // 发布方法
  publish(type, ...args) {
    if (this.event[type]) {
      this.events[type].forEach(cb => cb(...args))
    }
  }

  // 删除type下对应的cb
  unsubscribe(type, cb) {
    if (this.events[type]) {
      // 根据引用找到对应type中对应的cb
      const cbIndex = this.events[type].findIndex(e => e === cb)
      if (cbIndex !== -1) {
        this.event[type].splice(cbIndex, 1)
      }
    }
  }

  // 删除type中所有的cb
  unsubscribeAll(type) {
    if (this.events[type]) {
      delete this.events[type]
    }
  }
}

// 创建中介
const pubsub = new PubSub()

pubsub.subscribe('task1', function (taskInfo) {
  console.log(taskInfo);
})
pubsub.subscribe('task2', function (taskInfo) {
  console.log(taskInfo);
})

pubsub.publish('task1', "312312312")