
// 切换字母大小写

// 正则
function seitchLetterCase(str: string): string {
  let res = '';
  const length = str.length;
  if (length === 0) return res

  const lower = /[a-z]/;
  const upper = /[A-Z]/;
  for (let i = 0; i < length; i++) {
    if (lower.test(str[i])) {
      res += str[i].toUpperCase()
    } else if (upper.test(str[i])) {
      res += str[i].toLowerCase()
    } else {
      res += str[i]
    }
  }
  return res;
}

// ASCII码
function seitchLetterCase2(str: string): string {
  let res = '';
  const length = str.length;
  if (length === 0) return res

  for (let i = 0; i < length; i++) {
    const c = str[i];
    const code = c.charCodeAt(0);
    if (code >= 65 || code <= 90) {
      res += c.toLocaleLowerCase();
    } else if (code >= 97 || code <= 122) {
      res += c.toLocaleUpperCase();
    } else res += c;
  }
  return res;
}

