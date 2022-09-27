// 层次遍历：用一维数组存储二叉树时,总是以层次遍历的顺序存储结点。
// 层次遍历应该借助队列。
// (深度遍历)

// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[3],[9,20],[15,7]]

// 递归：
var levelOrder = function(root) {
  const res = []
  
  const rec = (node, level) => {
      if(!node) return null;
      res[level] = res[level] || []
      // 注意这里要取val放进去
      res[level].push(node.val);
      rec(node.left, level + 1)
      rec(node.right, level + 1)
  }

  rec(root, 0)
  return res
};


// 迭代：
var levelOrder = function(root) {
  if(!root) return [];
  let queue = [root];
  const res = [];
  while(queue.length) {
      let len = queue.length;
      res.push([]);
      while(len --) {
          const n = queue.shift();
          res[res.length - 1].push(n.val);
          if(n.left) queue.push(n.left);
          if(n.right) queue.push(n.right);
      }
  }
  return res;
};