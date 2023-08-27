function ss(str1, str2) {
  if (!str1 || !str2) {
    return false
  }

  let flag = false

  for (let i = 0; i < str2.length; i++) {
    flag = str1.toLocaleLowerCase().indexOf(str2[i].toLocaleLowerCase()) !== -1
    console.log(str2[i], flag)
    if (!flag) {
      break
    }
  }
  return flag
}

console.log(ss('javascript', 'javaScript'))
