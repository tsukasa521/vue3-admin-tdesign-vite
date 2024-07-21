/**
 * 网址是不是一个外部网址
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternalUrl(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validPercent(value: string) {
  const reg = /^([1-9]{1}[0-9]{0,1}|0)(\.\d{1,4}){0,1}$/
  return reg.test(value)
}

/**
 * 验证邮件是否合法
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email: string) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * 验证大陆手机号
 * @param {*} value
 * @param {*} required
 * @returns
 */
export function validateMobile(value: string, required: boolean) {
  if (!value && !required) { return true }
  const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
  return reg.test(value)
}
