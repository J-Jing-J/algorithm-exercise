// JSON 格式的虚拟 Dom 怎么转换成真实 Dom
// {
//   tag: 'DIV',
//   attrs:{
//   id:'app'
//   },
//   children: [
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] }
//       ]
//     },
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] },
//         { tag: 'A', children: [] }
//       ]
//     }
//   ]
// }
// 把上诉虚拟Dom转化成下方真实Dom
// <div id="app">
//   <span>
//     <a></a>
//   </span>
//   <span>
//     <a></a>
//     <a></a>
//   </span>
// </div>

function _render(vnode) {
  // number类型和string类型都是文本节点 --- createTextNode
  if (typeof vnode === 'number') {
    vnode = String(vnode)
  }
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  // 按照tag创建dom标签
  const dom = document.createElement(vnode.tag);
  // 遍历attr挂载
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key]
      dom.setAttribute(key, value)
    })
  }
  // 遍历children，递归
  vnode.children.forEach(child => {
    dom.appendChild(_render(child))
  })
  return dom
}