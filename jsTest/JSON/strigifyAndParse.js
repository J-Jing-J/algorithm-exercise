// 实现json.stringify
// 其实就是根据需要被转化数据的数据类型来做相应的处理，因此我们需要判断他们的类型
const jsonStringify = (data) => {

  // 判断是否存在循环引用
  const isCycle = (obj) => {
    // 用set存储已经检测过的obj
    let stackSet = new Set()
    let detected = false;

    // detect是检测的意思
    const detect = (item) => {
      // 不是对象不用检测循环引用
      if (item && typeof item !== 'object') return;
      // 之前存在 --- 说明存在循环引用
      if (stackSet.has(item)) return detected = true;
      
      // 之前不存在 --- 加入set
      stackSet.add(item);

      // 递归检测
      for (let key in item) {
        if (item.hasOwnProperty(key)) {
          detect(item[key])
        }
      }
      // 平级检测完成之后，将当前对象删除，防止误判
    /*
      例如：对象的属性指向同一引用，如果不删除的话，会被认为是循环引用
      let tempObj = {
        name: '前端胖头鱼'
      }
      let obj4 = {
        obj1: tempObj,
        obj2: tempObj
      }
    */
      stackSet.delete(item)
    }

    detect(obj)
    return detected;
  }

  // 正式开始：
  // 检测循环引用：
  if (isCycle(data)) {
    throw new Error('循环引用')
  }

  // 存在BigInt类型抛错
  if (typeof data === 'bigint') {
    throw new Error('bigint')
  }

  const type = typeof data;
  const ignoreKeys = ['undefined', 'function', 'symbol']
  const nullKeys = ['NaN', 'Infinity', null]
  const getType = (s) => {
    return Object.prototype.toString.call(s).split(' ')[1].pop()
  }

  
  if (type !== 'object' || data === null) {
    // 非对象
    let res = data
    
    if (nullKeys.includes(data)) {
      // NaN 和 Infinity 格式的数值及 null 都会被当做 null。
      res = 'null'  // 注意是字符串
    } else if (ignoreKeys.includes(data)) {
      // `undefined`、`任意的函数`以及`symbol值`被`单独转换`时，会返回 undefined
      return undefined  // 注意不是字符串
    } else if (type === 'string') {
      // 字符串：正常转换两边加双引号
      res = `"${data}"`
    }
    return String(res)


    
  } else if (type === 'object') {
    // 对象类型

    if (typeof data.toJSON === 'function') {
      // 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化
      return jsonStringify(data.toJSON())
    } else if (Array.isArray(data)) {
      // `undefined`、`任意的函数`以及`symbol值`出现在`数组`中时会被转换成 `null`
      let res = data.map(item => {
        return ignoreKeys.includes(item) ? 'null' : jsonStringify(it)
      })
      // 数组用toString转换后不带中括号[]
      return `[${data}]`.replace(/'/g, '"')
    } else {
      // 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
      if (['boolean', 'number'].includes(getType(data))) {
        return String(data)
      } else if (getType(data) === 'string') {
        return `"${data}"`
      } else {

        let res = []
        // 其他类型的对象，包括: 普通对象/Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性
        Object.keys(data).forEach(key => {
          // 所有以symbol为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
          if (typeof key !== 'symbol') {
            const value = data[key]
            // `undefined`、`任意的函数`以及`symbol值`，出现在`非数组对象`的属性值中时在序列化过程中会被忽略
            if (ignoreKeys.includes(typeof value)) {
              res.push(`"${key}":${jsonStringify(value)}`)
            }
          }
        })
        return `{${res}}`.replace(/'/g,'"')

      }
    }
  }
}



// 实现JSON.parse
// 有限状态机
const State = {
  INIT: 'INIT',
  OBJECTSTART: 'OBJECTSTART',
  ARRAYSTART: 'ARRAYSTART',
  OBJVALSTART: 'OBJVALSTART',
  OBJVALEND: 'OBJVALEND',
  ARRVALSTART: 'ARRVALSTART'
}
const isEnd = (ctx, res) => {
  if (!ctx.data) {
    return false
  }
  const match = /^([}\]])[ \t\n\r]*/.exec(ctx.data)
  if (match) {
    if (
      match[1] === '}' && getType(res) !== 'Object' ||
      match[1] === ']' && getType(res) !== 'Array'
    ) {
      throw Error('解析错误')
    }
    advance(ctx, match[0].length)
    return false
  }
  return true
}
const advance = (context, num) => {
  context.data = context.data.slice(num)
}

const parseValue = (context, match) => {
  advance(context, match[0].length)
  const valMatch = /^"(.*?)"$/.exec(match[1])
  if (valMatch) {
    return valMatch[1]
  }
  if (match[1] === 'null') {
    return null
  }
  if (match[1] === 'true') {
    return true
  }
  if (match[1] === 'false') {
    return false
  }
  if (isNaN(+match[1])) {
    throw Error('解析错误')
  }
  return Number(match[1])
}
const parseObjValue = (context) => {
  const match = /^[ \n\t\r]*((".*?")|([0-9A-Za-z]*))[ \t\n\r]*/.exec(context.data)
  if (match) {
    return parseValue(context, match)
  }
  new Error('解析错误')
}

const parseArrValue = (context) => {
  const refMatch = /^({|\[[ \n\t\r]*)/.exec(context.data)
  if (refMatch) {
    return parseData(context)
  }
  const match = /^((".*?")|([0-9a-zA-Z]*))[ \n\t\r]*[,]?[ \n\t\r]*/.exec(context.data)
  if (match) {
    return parseValue(context, match)
  }
  throw Error('解析错误')
}

const parseData = (ctx) => {
  let res = ''
  let currentState = State.INIT
  while (isEnd(ctx, res)) {
    switch (currentState) {
      case State.INIT:
        {
          const match = /^[ \t\n\r]*/.exec(ctx.data)
          if (match?.[0].length) {
            advance(ctx, match[0].length)
          }
          if (ctx.data[0] === '{') {
            res = {}
            currentState = State.OBJECTSTART
          } else if (ctx.data[0] === '[') {
            res = []
            currentState = State.ARRAYSTART
          } else {
            res = parseObjValue(ctx)
          }
        }
        break
      case State.OBJECTSTART:
        {
          const match = /^{[ \t\n\r]*/.exec(ctx.data)
          if (match) {
            advance(ctx, match[0].length)
            currentState = State.OBJVALSTART
          }
        }
        break
      case State.OBJVALSTART:
        {
          const match = /^"(.*?)"[ \n\t\r]*:[ \n\t\r]*/.exec(ctx.data)
          if (match) {
            advance(ctx, match[0].length)
            if (ctx.data[0] === '{' || ctx.data[0] === '[') {
              res[match[1]] = parseData(ctx)
            } else {
              res[match[1]] = parseObjValue(ctx)
            }
            currentState = State.OBJVALEND
          }
        }
        break
      case State.OBJVALEND:
        {
          const match = /^[ \t\n\r]*(,)[ \t\n\r]*/.exec(ctx.data)
          if (match) {
            if (match[1] === ',') {
              currentState = State.OBJVALSTART
            }
            advance(ctx, match[0].length)
          }
        }
        break
      case State.ARRAYSTART:
        {
          const match = /^\[[ \t\n\r]*/.exec(ctx.data)
          if (match) {
            advance(ctx, match[0].length)
            currentState = State.ARRVALSTART
          }
        }
        break
      case State.ARRVALSTART:
        {
          res.push(parseArrValue(ctx))
          const match = /^[ \t\n\r]*(,)[ \t\n\r]*/.exec(ctx.data)
          if (match) {
            advance(ctx, match[0].length)
          }
        }
        break
      // no default
    }
  }
  return res
}

export const parse = (data) => {
  if (typeof data === 'number' || data === null || typeof data === 'boolean') {
    return data
  }
  const context = { data }
  return parseData(context)
}