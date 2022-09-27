
// data是对象数组
function jsonToTree(data) {
  if (!Array.isArray(data)) return [];
  const res = [];
  const map = new Map();
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
      // 如果没有parent（是顶层元素），就直接push到结果中
      res.push(item);
    }
  })
  return res;
}

