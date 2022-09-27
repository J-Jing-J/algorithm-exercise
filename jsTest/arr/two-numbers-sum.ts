// 两数之和正好等于tag的两个值（找到一个即返回）
function findTwoNumbers(arr: number[], tag: number): number[] {
  const res: number[] = [];
  const length = arr.length;
  if (length === 0) return res;

  for (let i = 0; i < length; i++) {
    const n1 = arr[i];
    let flag = false;

    for (let j = i; j < length; j++) {
      const n2 = arr[i];
      // 内外两层的值相加等于目标值 --- push到结果中并返回
      if (n1 + n2 === tag) {
        res.push(n1);
        res.push(n2);
        flag = true;
        break;
      }
    }
    // 找到就退出去
    if (flag) break;
  }
  return res;
}



// 优化：双指针方法，前提是数组已排序
function findTwoNumbers2(arr: number[], tag: number): number[] {
  const res: number[] = [];
  const length = arr.length;
  if (length === 0) return res;

  let low = 0;
  let high = length - 1;

  // 前后指针根据比较结果，逐渐向中间移动
  while (low < high) {
    // for (let i = 0; i < length; i++) {
    const n1 = arr[low];
    const n2 = arr[high];
    if (n1 + n2 > tag) {
      high--;
    } else if (n1 + n2 < tag) {
      low++
    } else {
      res.push(low);
      res.push(high);
      break;
    }
    // }
  }
  return res;
}