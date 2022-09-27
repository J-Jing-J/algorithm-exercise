const str = '{@}#%()()[]'

function match(left: string, right: string): boolean {
  if (left === '[' && right === ']') return true;
  if (left === '{' && right === '}') return true;
  if (left === '(' && right === ')') return true;
  return false;
}

function matchBracket(str: string): boolean {
  const length = str.length;
  if (length === 0) return true;

  const stack = [];

  const left = '[{(';
  const right = ']})';

  for (let i = 0; i < length; i++) {
    const s = str[i];

    // 左括号：进栈
    // 右括号：对应的左括号出栈
    if (left.includes(s)) {
      stack.push(s);
    }
    else if (right.includes(s)) {
      const top = stack[length - 1];
      if (match(top, s)) {
        stack.pop()
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

matchBracket(str);