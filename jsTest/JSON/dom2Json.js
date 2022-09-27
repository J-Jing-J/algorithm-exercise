// 题目描述：
// <div>
//   <span>
//     <a></a>
//   </span>
//   <span>
//     <a></a>
//     <a></a>
//   </span>
// </div>

// 把上诉dom结构转成下面的JSON格式

// {
//   tag: 'DIV',
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

// dom代表dom对象，而不是字符串
function dom2Json(domTree) {
  const obj = {}
  obj.tag = domTree.tagName
  obj.children = []
  domTree.childNodes.forEach((child) => {
    obj.children.push(dom2Json(child))
  })
  return obj
}


// 如果返回的不是dom对象，而是html字符串，那就要：
// 1. 利用正则 匹配 html 字符串
// 2. 遇到开始标签 结束标签和文本 解析完毕之后生成对应的 ast 并建立相应的父子关联
// 3. 不断的 advance 截取剩余的字符串 直到 html 全部解析完毕

