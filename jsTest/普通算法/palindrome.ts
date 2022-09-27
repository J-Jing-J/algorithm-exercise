// 输出0-max中的所有回文数字

// 数组翻转方式
function palindrome(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return res;

  for (let i = 1; i <= max; i++) {
    const num: string = i.toString();
    // const reverseNum = num.split('').reverse().toString();
    const reverseNum = num.split('').reverse().join();
    if (num === reverseNum) res.push(i);
  }
  return res;
}

// 字符串头尾比较方式
function palindrome2(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return;

  for (let i = 1; i <= max; i++) {
    const num: string = i.toString();
    const length = num.length;

    let start: number = 0;
    let end: number = length - 1;
    let flag = true;
    while (start < end) {
      if (start !== end) {
        flag = false;
        break;
      } else {
        start++;
        end--;
      }
    }
    if (flag) res.push(i);
  }


  return res;
}
