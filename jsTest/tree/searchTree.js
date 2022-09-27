// 二叉查找树
function Node(data,left,right) {
  this.left = left;
  this.right = right;
  this.data = data;
  this.show = () => {return this.data}
}

// BST初始化： 只有一个根节点，且没有任何数据。 

function BST() {
  this.root = null //初始化,root为null
}

// 二叉查找树思路：
// 如果BST.root === null ，那么就将节点作为根节点
// 如果BST.root !==null ，将插入节点进行一个比较，小于根节点，拿到左边的节点，否则拿右边，再次比较、递归。
// 这里就出现了递归了，因为，总是要把较小的放在靠左的分支。换言之
// 最左的叶子节点是最小的数，最右的叶子节点是最大的数


// 这里，是使用了一个循环方法，不断的去向子树寻找正确的位置。 
// 循环和递归都有一个核心，就是找到出口，这里的出口就是当current 为null的时候，代表没有内容，可以插入。
function insert(data) {
  var node = new Node(data, null, null);
  // this是BST
  if (this.root === null) {
    // 如果BST无root，那就把现在这个传进来的node当成根节点
    this.root = node
  } else {
      var current = this.root;  // 指针，最初指向根节点，根据比较向left或right移动
      var parent;
      while(true) {
          parent = current;
          if(data < current.data) {
              current = current.left; //到左子树
              if(current === null) {  //如果左子树为空，说明可以将node插入在这里
                  parent.left = node;
                  break;  //跳出while循环
            }
            // 如果左子树不为空：进入下一个循环进行比较
            //  ---
          } else {
              current = current.right;
              if(current === null) {
                  parent.right = node;
                  break;
            }
            // 如果右子树不为空：进入下一个循环进行比较
            //  ---
          }
      }
  }
}

// 使用BST自建二叉查找树
function BST() {
  this.root = null;
  this.insert = insert;
}
var bst = new BST()
bst.insert(10);
bst.insert(8);
bst.insert(2);
bst.insert(7);
bst.insert(5);



// 在二叉树中查找值
// 最小值： 最左子树的叶子节点
// 最大值： 最右子树的叶子节点
// 特定值： target与current进行比较，如果比current大，在current.right进行查找，反之类似。

//最小值
function getMin(bst) {
  var current = bst.root;
  while(current.left !== null) {
      current = current.left;
  }
  return current.data;
}

//最大值
function getMax(bst) {
  var current = bst.root;
  while(current.right !== null) {
      current = current.right;
  }
  return current.data;
}

// 找特定值
function find(target, bst) {
  var current = bst.root;
  while(current !== null) {
      if(target === current.data) {
          return true;
      }
      else if(target > current.data) {
          current = current.right;
      } else if(target < current.data) {
          current = current.left;
      }
  }
  return -1;
}
