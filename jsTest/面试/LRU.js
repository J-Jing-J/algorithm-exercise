// LRU算法 最近最少使用 缓存机制
class LRUCache {
  constructor(maxSize) {
    this.cacheMap = new Map()
    this.maxSize = maxSize
  }

  get(key) {
    if (this.cacheMap.has(key)) {
      let tempVal = this.cacheMap.get(key)
      this.cacheMap.delete(key)
      this.cacheMap.set(key, tempVal)
      return tempVal
    } else {
      return -1
    }
  }

  put(key, value) {
    if (this.cacheMap.has(key)) {
      // key存在 -- 修改值
      this.cacheMap.delete(key)
      this.cacheMap.set(key, value)
    } else if (this.cacheMap.size < this.maxSize) {
      // key不存在，cache未满
      this.cacheMap.set(key, value)
    } else {
      // 添加新key，删除旧key
      this.cacheMap.set(key, value);
      // 删除map的第一个元素，即为最长未使用的
      this.cacheMap.delete(this.cacheMap.keys().next().value)
    }
  }
}


// 使用
let cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log("cache.get(1)", cache.get(1))// 返回  1
cache.put(3, 3);// 该操作会使得密钥 2 作废
console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
cache.put(4, 4);// 该操作会使得密钥 1 作废
console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
console.log("cache.get(3)", cache.get(3))// 返回  3
console.log("cache.get(4)", cache.get(4))// 返回  4
