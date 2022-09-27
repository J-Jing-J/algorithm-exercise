const jsonp = ({ url, params, callbackName }) => {
  // 在url上拼query参数
  const generateUrl = () => {
    const dataSrc = ''
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        dataSrc += `${key}=${params[key]}&`
      }
    }
    dataSrc += `callback=${callbackName}`
    return `${url}?${dataSrc}`
  }
  return new Promise((resolve, reject) => {
    // 创建script标签挂到body里，让它去请求拼接的url
    const scriptEle = document.createElement('script')
    scriptEle.src = generateUrl()
    document.body.appendChild(scriptEle)
    // 方法名挂载到window上，执行这个方法就可以在then里拿到传进方法的值了
    window[callbackName] = data => {
      resolve(data)
      document.removeChild(scriptEle)
    }
  })
}