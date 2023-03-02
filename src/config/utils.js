// 存储localstorage
export const setStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

// 获取localStorage
export const getStorage = (name) => {
  if (!name) return
  window.localStorage.getItem(name)
}
