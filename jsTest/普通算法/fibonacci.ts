// 斐波那契、青蛙跳台阶问题
function fibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  return fibonacci(n - 1) + fibonacci(n - 2);
}


// 优化
function fibonacci2(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let n1 = 1; //记录前第一个数
  let n2 = 0;  //记录前第二个数
  let res = 0;

  for (let i = 2; i < n; i++) {
    res = n1 + n2;
    n1 = res;
    n2 = n1;
  }

  return res;
}