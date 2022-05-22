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