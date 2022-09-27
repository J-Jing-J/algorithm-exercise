const bt = require('./tree');


// 后序遍历   left-right-root
// 需要栈的支持。(广度遍历)

const postorder = (root) => {
  if (!root) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
}

const postorder1 = (root) => {
  const stack = [root];
  const outputStack = [];
  while (stack.length) {
    const n = stack.pop();
    outputStack.push(n);
    if (n.left) stack.push(n.left);
    if (n.right) stack.push(n.right);
  }
  while (outputStack.length) {
    const n = outputStack.pop();
    console.log(n.val);
  }
}

postorder(bt);
postorder1(bt);
