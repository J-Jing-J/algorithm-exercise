// 用setTimeout实现setInterval

// 将timerId保存在全局，函数内的值更新了，外面才能感知到
const timeMap = {} // 用键找到是哪个setInterval，用值拿到setInterval返回的id
let id
const _setInterval = (cb, timer) => {
  let timeId = id;
  id++;  // 每次执行，都把全局的id加一，保证多个_setInterval返回的id唯一
  const fn = () => {
    cb();
    // 递归调用自己，不断执行
    // 利用闭包保存保存最新的timeId
    timeMap[timeId] = setTimeout(() => {
      fn()
    }, timer)
  }
  timeMap[timeMap[timeId]] = setTimeout(fn, timer)
  // 返回最新执行的那次setTimeout的的健
  return timeId
}

const _clearTimeout = (timeId) => {
  // 通过key，拿到id
  const id = timeMap[timeId]
  clearTimeout(id)
}

_setInterval(() => {
  console.log(new Date())
}, 1000)