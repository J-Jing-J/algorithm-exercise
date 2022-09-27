// 把数组中的0移动要末尾，不创建新数组
function findZero(arr: number[]): void {
  let length = arr.length;
  if (length === 0) return;
  let zeroLength = 0;
  // 遍历
  for (let i = 0; i < length; i++) {
    if (arr[i] === 0) {
      // 如果某一位是0，，就push一个0，并从遍历到的节点删除0的那一位
      arr.push(0);
      arr.splice(i, 1);
      i--;
      zeroLength++;
    }
  }
}

// // 优化，双指针，指针交换
// function findZero2(arr: number[]): void {
//   const length = arr.length;

//   let left = 0;  //指向第一个零
//   let right = -1;  //指向第一个非零

//   for (let i = 0; i < )
// }
