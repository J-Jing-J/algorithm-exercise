[
  {
      id: 1,
      text: '节点1',
      parentId: 0,
      children: [
          {
              id:2,
              text: '节点1_1',
              parentId:1
          }
      ]
  }
]
// 转成
[
  {
      id: 1,
      text: '节点1',
      parentId: 0 //这里用0表示为顶级节点
  },
  {
      id: 2,
      text: '节点1_1',
      parentId: 1 //通过这个字段来确定子父级
  }
]


// 递归
function treeToList(data) {
  let res = []

  const dfs = () => {
    treeToList.forEach(item => {
      if (item.children) {
        dfs(item.children)
        delete item.children
      }
      // 利用闭包，每次都往最外层函数中push结果，就会自动打平了
      res.push(item)
    })
  }

  dfs(data)
  
  return res
}