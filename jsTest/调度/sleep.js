// sleep

// promise法
const sleep = (time) => {
  return new Promise((resolve, reject) => {
    // n秒后执行resolve
    setTimeout(resolve, time)
  })
}

// 使用：
sleep(1000).then(() => {
  console.log(2123);
})


// ES5法, 
// 用callback回调，要传入callback
const sleep2 = (cb, time) => {
  if (typeof cb !== 'function') return;
  setTimeout(cb, time)
}

// 使用
sleep2(() => {console.log(12312);}, 1000)