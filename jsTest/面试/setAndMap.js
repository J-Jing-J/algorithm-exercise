// set实现
// set是有key和value的，只不过key和value是同一个值
class Set {
  constructor() {
    this.items = {}
    this.size = 0;
  }

  has(element) {
    return element in this.items
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element
      this.size++;
    }
    return this;
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element]
      size--
    }
    return this;
  }

  clear() {
    this.items = {}
    this.size = 0;
  }

  values() {
    let values = []
    for (let item in this.items) {
      if (this.items.hasOwnProperty(item)) {
        values.push(item)
      }
    }
    return values
  }
}


// Map实现
// 注意：对象与key相关的操作，都会先把key转成string
function defaultToString(key) {
  if(key === null) {
    return 'NULL';
  } else if (key === undefined) {
    return 'UNDEFINED'
  } else if (Object.prototype.toString.call(key) === '[object Object]' || Object.prototype.toString.call(key) === '[object Array]') {
    return JSON.stringify(key);
  }
  return key.toString();
}

class Map {
  constructor() {
    this.items = {};
    this.size = 0;
  }

  set(key, value) {
    if (!this.has(key)) {
      this.items[defaultToString(key)] = value
      size++;
    }
    return this;
  }

  get(key) {
    return this.items[defaultToString(key)]
  }

  has(key) {
    return this.items[defaultToString(key)] !== undefined
  }

  delete(key) {
    if (this.has(key)) {
      delete this.items[key];
      this.size--;
    }
    return this;
  }

  clear() {
    this.items = {}
    this.size = 0;
  }

  keys() {
    let keys = [];
    for(let key in this.items) {
      if(this.has(key)) {
        keys.push(key)
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for(let key in this.items) {
      if(this.has(key)) {
        values.push(this.items[key]);
      }
    }
    return values;
  }
}

