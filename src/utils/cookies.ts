export function getCookie(cname: string) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function deleteCookie(keyName: string) {
  document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Max-Age=0; path=/;`
  document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Max-Age=0; path=/; domain=.bitapps.pro`
  document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Max-Age=0; path=/; domain=bitapps.pro`
  document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Max-Age=0; path=/login;`
  document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Max-Age=0; path=/login; domain=bitapps.pro`
  document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Max-Age=0; path=/login; domain=.bitapps.pro`
}
