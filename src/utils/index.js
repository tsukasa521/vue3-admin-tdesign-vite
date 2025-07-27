import dayjs from "dayjs"

export function cloneDeep(item) {
  if (!item) {
    return item
  } // null, undefined values check

  const types = [Number, String, Boolean]
  let result

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function (type) {
    if (item instanceof type) {
      result = type(item)
    }
  })

  if (typeof result === "undefined") {
    if (Object.prototype.toString.call(item) === "[object Array]") {
      result = []
      item.forEach(function (child, index) {
        result[index] = cloneDeep(child)
      })
    } else if (typeof item === "object") {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode === "function") {
        result = item.cloneNode(true)
      } else if (!item.prototype) {
        // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item)
        } else {
          // it is an object literal
          result = {}
          for (const i in item) {
            result[i] = cloneDeep(item[i])
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        // eslint-disable-next-line no-constant-condition
        result = item
        // if (false && item.constructor) {
        // } else {
        //   result = item
        // }
      }
    } else {
      result = item
    }
  }

  return result
}

export function toThousands(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","))
}

/**
 * 判断是否是函数
 * @param {Function} func
 * @returns
 */
export function isFunction(func) {
  return func && typeof func === "function"
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function later() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function fn(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 根据时间戳生成文件名
 * @returns
 */
export function generateRandomName() {
  return dayjs().format("YYYYMMDDhhmmss")
}
