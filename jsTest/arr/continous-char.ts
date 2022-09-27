
// 求连续次数最多的字符以及次数

interface IRes {
  char: string
  length: number
}
function continousChar(str: string): IRes {
  // 用对象记录最多的 字符和次数
  const res = {
    char: '',
    length: 0
  }
  const length = str.length;
  if (length === 0) return res;

  let tempLength = 0;
  for (let i = 0; i < length; i++) {
    tempLength = 0; 
    // j从i处开始遍历
    for (let j = i; j < length; j++) {
      if (str[i] === str[j]) {
        tempLength++;
        j++;
      } else if (str[i] !== str[j] || j >= length - 1) {
        // 不相等或到头了，就判断一下当前值是否是max
        if (tempLength > res.length) {
          res.char = str[i];
          res.length = tempLength;
        }
        if (i < length - 1) {
          i = j - 1;
        }
      }
    }
  }
  return res;
}