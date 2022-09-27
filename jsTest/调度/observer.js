// 观察者模式

// 观察者：
class Observer {
  constructor(name) {
    this.name = name;
  }

  update({ taskType, taskInfo }) {
    if (taskType === 1) {
      // 可以做一些逻辑判断
      this.task1(taskInfo)
    } else if (taskType === 2) {
      this.task2(taskInfo)
    }
  }

  task1(info) {
    console.log(info)
  }

  task2(info) {
    console.log(info)
  }
}


// 目标对象
class Subject {
  constructor() {
    this.observerList = []
  }

  addObserver(observer) {
    this.observerList.push(observer)
  }

  notify(task) {
    this.observerList.forEach(observer => observer.update(task))
  }
}


// 使用：
const subject = new Subject();
const stu1 = new Observer("观察者1")
const stu2 = new Observer("观察者2")

subject.addObserver(stu1)
subject.addObserver(stu2)

const task1 = {
  taskType: 1,
  taskInfo: '任务1'
}
subject.notify(task1)