// 利用 XMLHttpRequest 手写 AJAX 实现
function ajax({
  url = null,
  method = 'GET',
  dataType = 'JSON',
  async = true
}) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url, async)
    xhr.responseType = dataType;
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.state === 200 || xhr.state === 304) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.responseText));
      }
    }
    xhr.onerror = (err) => {
      reject(err)
    }
    xhr.send()
  })
}