// 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个

class Schedule {
  constructor(limit) {
    this.queue = [];
    this.maxCounts = limit;
    this.runCounts = 0;
  }
  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve()
        }, time)
      })
    }
    this.queue.push(promiseCreator)
  }

  taskStart() {
    for (let i = 0; i < this.maxCounts; i++) {
      this.request()
    }
  }

  request() {
    if (!this.queue || !this.queue.length || this.maxCounts <= this.runCounts) return;
    this.runCounts++;
    this.queue.unshift().then(() => {
      this.runCounts--;
      this.request()
    })
  }
}

// 使用
const schedule = new Schedule(2);
const addTask = (time, order) => {
  schedule.add(time, order)
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
schedule.taskStart()
