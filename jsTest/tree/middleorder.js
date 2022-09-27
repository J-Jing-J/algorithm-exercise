const bt = require('./tree');

// 中序遍历  left-root-right
// 必须要有中序遍历才能得到一棵二叉树的正确顺序(广度遍历)

// const middleorder = (root) => {
//   if (!root) return;
//   middleorder(root.left);
//   console.log(root.val);
//   middleorder(root.right)
// }

// 非递归实现：
// 取根节点为目标节点，开始遍历
// 1.左孩子入栈 -> 直至左孩子为空的节点
// 2.节点出栈 -> 访问该节点
// 3.以右孩子为目标节点，再依次执行1、2、3
const middleorder = (root) => {
  if (!root) return;
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left
    }
    const n = stack.pop();
    console.log(n.val);
    p = n.right;
  }
}


middleorder(bt);