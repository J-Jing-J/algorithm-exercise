/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// 查找表问题

// 求两个数组的交集
// 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。

const createMap = (nums) => {
  const map = new Map()
  for(let i = 0; i < nums.length; i++) {
      const count = map.get(nums[i])
      if(count) {
          map.set(nums[i], map.get(nums[i]) + 1)
      }else {
          map.set(nums[i], 1)
      }
  }
  return map
}
var intersect = function(nums1, nums2) {
  // 为两个数组分别建立 map，用来存储 num -> count 的键值对，统计每个数字出现的数量。
  const map1 = createMap(nums1)
  const map2 = createMap(nums2)

  const res = []

  // 然后对其中一个 map 进行遍历，查看这个数字在两个数组中分别出现的数量       
  for(num of map1.keys()) {
      const count1 = map1.get(num)
      const count2 = map2.get(num)
      // 取出现的最小的那个数量（数组 1 中出现了 1 次，数组 2 中出现了 2 次，那么交集应该取 1 次）
      if(count2) {
          const minCount = Math.min(count1, count2)
          // push 到结果数组中即可，按最小出现的次数，push到数组中。
          for(let i = 0; i < minCount; i++) {
              res.push(num)
          }
      }
  }
  return res
};