// 题目描述
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
// 转成
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


function listToTree(data) {
  const map = {}
  const res = []
  for (let i = 0; i < data.length; i++){
    map[data[i].id] = data[i]
  }

  for (let key in map) {
    if (+map[key].parentId != 0) {
      if (!map[map[key].parentId]) {
        map[map[key].parentId].children = []
      }
      map[map[key].parentId].children.push(map.key)
    } else {
      res.push(map[key])
    }
  }
}


// data是对象数组
function jsonToTree(data) {
  if (!Array.isArray(data)) return [];
  const res = [];
  const map = {};
  // 遍历，每一项存map中，key为id，value为值
  data.forEach((item) => {
    map[item.id] = item;
  })
  // 遍历，通过pid找每一项的parent
  data.forEach((item) => {
    // 之前存到map里，再从map中取出来，这样得到的就是同一个引用的parent
    const parent = map[item[pid]];
    if (parent) {
    // 如果有parent，酒吧此项push到parent的children中
      (parent.children || (parent.children = [])).push(item);
    } else {
      // 如果没有parent（是顶层元素），或者是单个元素，就直接push到结果中
      res.push(item);
    }
  })
  return res;
}