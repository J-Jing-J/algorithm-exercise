// 题目：以k为分界点，数组前后调换位置
const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// 遍历，每次pop一个unshift到前面
function rotate1(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!k || length === 0) return arr;
  const step = Math.abs(k);
  for (let i = 0; i < step; i++) {
    const last = arr.pop();
    // 数组是有序结构，unshift操作非常慢，还有shift和splice
    if (last) arr.unshift(last);
  }
  return arr;
}

// 性能好一些，写这个
function rotate2(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!k || length === 0) return arr;

  // 截出前后两端，反着concat就行了
  const part1 = arr.slice(k);
  const part2 = arr.slice(0, length - k);

  return part1.concat(part2);
}

console.log(rotate1(arr, 4));
