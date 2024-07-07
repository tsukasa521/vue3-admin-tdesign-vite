import request from '@/utils/request'

/**
 * 获取验证码
 * @returns
 */
export function getCaptchaImage () {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}

export function login (username, password, code, uuid) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      username,
      password,
      code,
      uuid
    }
  })
}

// export function getSelf () {
//   return request({
//     url: '/getInfo',
//     method: 'get'
//   })
// }

export function getSelf () {
  return request({
    url: '/company/loginInfo',
    method: 'get'
  })
}

/**
 * 获取用户个人信息
 * @returns
 */
export function getUserProfile () {
  return request({
    url: '/incentiveUser/userInfo',
    method: 'get'
  })
}

/**
 * 修改用户个人信息
 * @param {*} data
 * @returns
 */
export function updateUserProfile (formValue) {
  const data = {
    userId: formValue.userId,
    userName: formValue.userName,
    userAccount: formValue.accountName,
    phoneNumber: formValue.phonenumber,
    email: formValue.email
  }

  return request({
    url: '/incentiveUser/update',
    method: 'post',
    data
  })
}

export function changePassword (oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

/**
 * 用户头像上传
 * @param {*} data
 * @returns
 */
export function uploadAvatar (data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data
  })
}

/**
 * 获取角色列表,用于下拉列表的绑定
 * @returns
 */
export function getRoles () {
  return request({
    url: '/system/role/list',
    method: 'get'
  })
}

// 查询用户列表
export function searchAccount (query) {
  return request({
    url: '/incentiveUser/page',
    method: 'get',
    params: query
  })
}

/**
 * 新增用户
 * @param {*} formValue
 * @returns
 */
export function insertAccount (formValue) {
  const data = {
    userId: formValue.userId,
    userName: formValue.userName,
    userAccount: formValue.accountName,
    password: formValue.password,
    phoneNumber: formValue.phonenumber,
    email: formValue.email,
    roleId: formValue.roleId,
    remark: formValue.remark
  }

  return request.post('/incentiveUser/add', data)
}

/**
 * 删除用户
 * @param {String} id
 * @returns
 */
export function removeAccount (id) {
  return request.get(`/incentiveUser/delete/${id}`)
}
