import request from '@/utils/request'

/**
 * 公共获取code table列表,常用于绑定dropdown
 * @param {String} type code table类型
 * @returns
 */
export function getCodeTableList (type) {
  return request({
    url: `/system/dict/data/dictType/${type}`,
    method: 'get'
  })
}

export function getFileUrl (id) {
  return request.get(`/system/download/${id}`, {
    responseType: 'blob'
  })
}
