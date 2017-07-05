let ajax = function (data, url, methods, handler) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          handler(xhr.responseText)
          resolve(xhr.responseText)
        } else {
          alert('ajax通信失败 ' + xhr.status)
          reject('ajax通信失败 ' + xhr.status)
        }
      }
    }
    xhr.onerror = function () {
      console.log('error')
      reject('error')
    }
    xhr.open(methods, url, true)
    if (methods === 'post') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send(JSON.stringify(data))
    } else if (methods === 'get') {
      xhr.send()
    }
  })
}
export default ajax
