/**
 * 切换静态主题(主题要先预先写好成scss)
 * @param {*} className 设置在html元素中主题的类名
 */
export function toggleHtmlClass (className) {
  cleanTheme()
  document.getElementsByTagName('html')[0].className = className
}

/**
 * 清除所有主题, 将主题重置到默认的状态
 */
export function cleanTheme () {
  document.getElementsByTagName('html')[0].className = ''
  const root = document.querySelector(':root')
  root.style.removeProperty('--color-primary')
  root.style.removeProperty('--color-primary-light-3')
  root.style.removeProperty('--color-primary-light-5')
  root.style.removeProperty('--color-primary-light-7')
  root.style.removeProperty('--color-primary-light-8')
  root.style.removeProperty('--color-primary-light-9')
  root.style.removeProperty('--color-primary-dark-2')
}

/**
 * 切换动态主题(主题是从后端获取)
 * @param {*} theme 后端返回的主题色
 */
export function toggleVars (theme) {
  const root = document.querySelector(':root')
  // 如果没有值,说明要切回默认主题
  if (theme) {
    document.getElementsByTagName('html')[0].className = 'custom'
    // todo 实际这里的主题要从theme变量中获取,也就是靠后端返回,这里这是模拟一下
    root.style.setProperty('--color-primary', '#3eaf7c')
    root.style.setProperty('--color-primary-light-3', '#78c7a3')
    root.style.setProperty('--color-primary-light-5', '#9fd7be')
    root.style.setProperty('--color-primary-light-7', '#c5e7d8')
    root.style.setProperty('--color-primary-light-8', '#d8efe5')
    root.style.setProperty('--color-primary-light-9', '#ecf7f2')
    root.style.setProperty('--color-primary-dark-2', '#328c63')
  } else {
    cleanTheme()
  }
}
