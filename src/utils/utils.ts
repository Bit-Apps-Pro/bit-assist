export function serializeObj(obj, serializeKeys = ['createdAt', 'updatedAt']) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (serializeKeys.indexOf(key) > -1) {
        obj[key] = JSON.parse(JSON.stringify(obj[key]))
      }
      if (typeof obj[key] === 'object') {
        obj[key] = serializeObj(obj[key], serializeKeys)
      }
    }
  }
  return obj
}

export function debounce(func, wait, immediate) {
  let timeout
  return function() {
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}