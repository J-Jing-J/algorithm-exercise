const bt = require('./tree');


// 先序遍历   root-left-right
// (广度遍历)
const preorder = (root) => {
  if (!root) return;
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
}


// 用栈代替递归
const preorder1 = (root) => {
  if (!root) return;
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    console.log(n.val);
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
}


preorder(bt);
preorder1(bt);
