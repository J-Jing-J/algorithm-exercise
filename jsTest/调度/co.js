// co接收一个genetor，co就是一个generator的发动机，或者自动执行器

run(function *() {
  const url = 'http://jasonplacerholder.typecoder.com/posts/1';
  const response = yield fetch(url);
  const post = yield response.json();
  const title = post.title;
  console.log('Title: ',title);
})

// 模拟co的具体执行
function run(generator) {
  const iterator = generator(); //genetor执行会返回一个iterator，然后调用next()才会执行到下一个yield
  const iteration = iterator.next(); //这里打印出来的结果看一下是{value: Promise {<pending>},done:false}
  const promise = iteration.value;
  promise.then(x => {
      const anotherIterator = iterator.next(x);//注意,iterator.next()的含义，一方面会将运算结果返回，另一方面，genetor会继续将下一个yield的任务抛出，仍然是一个iterator
      const anotherPromise = anotherIterator.value;
      anotherPromise.then(post => iterator.next(post))
      //到此，因为iterator再也没有yield，所以不会再次返回iterator了，也不用调用next()
  }) 
}

// 至此，模拟的co方法已经实现了。
// 流程如下:

// run传入一个genetor并运行，获得一个iterator(generator())
// 调用next()方法，获取到iteration,iteration的value是yield fetch(url)的结果，也即一个Promise。
// yield返回出的任务，由外部执行和处理，结束后在返回,于是使用then方法。
// 处理后的结果为x，调用iterator.next(x)把x返回的同时，拿到了下一个yield的抛出的任务。
// 处理任务，得到post，并通过next(post)返回给genetor。
// 嗯，我拿到你们处理的结果了，下一次我遇到yield还给你们，反正我不会，我也不会学，这任务都是你们的。


// 通用的co：递归
function run(genetor) {
  // 拿到生成器
  const iterator = genetor();

  // 递归
  function autoRun(iteration) {
    // 如果后面没有值了
    if (iteration.done) { return iteration.value; }
    
    // 如果后面还有值：递归调用next
    const anotherPromise = iteration.value;
    anotherPromise.then(x => { 
        return autoRun(iterator.next(x));
    })
  }

  // 传入next执行后返回的值
  return autoRun(iterator.next());
}
