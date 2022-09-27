class LazyMan {
  constructor(name) {
    this.tasks = []
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    }
    this.tasks.push(task);
    // 把 this.next() 放到调用栈清空之后执行
    setTimeout(() => {
      this.next()
    }, 0)
  }

  next() {
    const task = this.tasks.shift()
    task && task()
  }

  sleep(time) {
    this._sleepWrapper(time, false);
    return this;                     // 链式调用
  }

  sleepFirst(time) {
    this._sleepWrapper(time, true);
    return this;
  }

  _sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
      }, time * 1000)
    }
    if (first) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }

  eat(name) {
    const task = () => {
      console.log(`Eat ${name}`);
      this.next();
    }
    this.tasks.push(task);
    return this;
  }


}


// 使用
function lazyMan(name) {
  return new LazyMan(name);
}