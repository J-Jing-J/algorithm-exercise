const json = {
  a: {
    b: {
      c: 1
    }
  },
  d: [1, 2]
}

// 深度优先遍历所有树的节点
const dfs = (root, path) => {
  console.log(root, path);
  Object.keys(root).forEach(key => dfs(root[key], path.concat(key)))
}


dfs(json, []);