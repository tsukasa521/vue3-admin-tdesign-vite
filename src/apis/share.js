import request from '@/utils/request'

/**
 * 获取首页所有数据
 * @returns
 */
export function getDashboardData () {
  return request({
    url: '/homePage/show',
    method: 'get'
  })
}

/**
 * 首页获取期权池列表
 * @returns
 */
export function getSharePoolList () {
  const mockData = {
    code: 200,
    msg: null,
    data: [
      {
        stockPoolId: 9,
        registeredCapital: 2000000,
        totalStockCount: 2000000,
        stockType: 'VS',
        stockTypeDesc: '虚拟股',
        shareholdingPattern: '1',
        shareholdingPatternDesc: '持股平台',
        poolRegisteredCapital: 200000,
        stockPoolName: '期权期权池2',
        stockPercent: 5,
        stockCount: 200000,
        transferCount: 0,
        remark: 'aaa'
      },
      {
        stockPoolId: 8,
        registeredCapital: 2000000,
        totalStockCount: 2000000,
        stockType: 'CS',
        stockTypeDesc: '实股',
        shareholdingPattern: '2',
        shareholdingPatternDesc: '股东代持',
        poolRegisteredCapital: 200000,
        stockPoolName: '期权期权池',
        stockPercent: 5,
        stockCount: 200000,
        transferCount: 0,
        remark: 'ddd'
      }
    ],
    success: true
  }

  return request({
    url: '/equityPool/list',
    method: 'get'
  })
}

/**
 * 新建期权池
 * @param {*} formValue
 * @param {Number} refPoolRegisteredCapital
 * @param {Number} refPoolPercent
 * @returns
 */
export function createSharePool (formValue, refPoolRegisteredCapital, refPoolPercent) {
  const postData = {
    totalStockCount: formValue.refStock,
    stockPoolName: formValue.poolName,
    poolRegisteredCapital: formValue.poolMode ? refPoolRegisteredCapital : formValue.registeredCapital,
    stockPercent: !formValue.poolMode ? refPoolPercent : formValue.percentInStock,
    shareholdingPattern: formValue.shareholdingPattern,
    equityPoolShareholderList: formValue.transferPersonList,
    remark: formValue.remark
  }

  return request({
    url: '/equityPool/add',
    method: 'post',
    data: postData
  })
}

/**
 * 删除期权池
 * @param {String} id
 * @returns
 */
export function removeSharePool (id) {
  return request({
    url: `/equityPool/delete/${id}`,
    method: 'get'
  })
}

// 获取用户列表
export function getUserList () {
  return request({
    url: '/incentiveUser/list',
    method: 'get'
  })
}

export function getVestingScheduleList () {
  return request({
    url: '/settingVestingSchedule/list',
    method: 'get'
  })
}

/**
 * 新建/更新授予
 * @param {*} formValue
 * @returns
 */
export function createUpdateGranting (formValue) {
  const postData = {
    equityGrantId: formValue.equityGrantId, // 新增时没有id

    stockPoolId: formValue.stockPoolId,
    equityType: formValue.grantType,
    equityDocType: formValue.protocolTemplate,

    incentiveUserId: formValue.name,
    grantCount: formValue.grantCount,
    transferUserId: formValue.transferUser,
    grantDate: formValue.grantDate,
    exercisePrice: formValue.exercisePrice,
    vestingPeriod: formValue.exerciseEffectDate,
    vestingScheduleId: formValue.vestingScheduleId,
    vestingStartDate: formValue.vestingStartDate,
    remark: formValue.remark
  }

  if (postData.equityGrantId) {
    return request({
      url: '/equityGrant/update',
      method: 'post',
      data: postData
    })
  } else {
    return request({
      url: '/equityGrant/add',
      method: 'post',
      data: postData
    })
  }
}

export function getGrantingById (id) {
  return request({
    url: `/equityGrant/update/${id}`,
    method: 'get'
  })
}

export function searchGranting (query) {
  const mockData = {
    code: 200,
    msg: null,
    rows: [
      {
        equityGrantId: 4,
        serialNumber: 'ES-1',
        grantCount: 1000,
        equityType: '1',
        grantDate: '2024-03-11',
        stockPoolId: 8,
        stockPoolName: '期权期权池',
        incentiveUserId: 216,
        incentiveUserName: '郑风培',
        shareholdingPattern: '2',
        shareholdingPatternDesc: '股东代持',
        platformId: null,
        platformName: null,
        vestingScheduleId: 1,
        vestingScheduleName: '4年成熟，每年成熟1/4',
        vestingStartDate: '2024-03-11',
        vestingCount: 0,
        exerciseCount: 0,
        statusDesc: '草稿'
      }
    ],
    total: 1
  }

  return request({
    url: '/equityGrant/page',
    method: 'post',
    data: query
  })
}

/**
 * 删除授予
 * @param {*} id
 * @returns
 */
export function removeGranting (id) {
  return request({
    url: `/equityGrant/delete/${id}`,
    method: 'get'
  })
}

/**
 * 获取授予详情
 * @param {*} id
 * @returns
 */
export function getGrantingDetail (id) {
  const mockData = {
    code: 200,
    msg: null,
    data: {
      equityGrantId: 4,
      incentiveUserId: 216,
      incentiveUserName: '郑风培',
      incentiveUserMail: 'fengpei@sina.com',
      grantCount: 2000,
      cancelCount: 0,
      exercisableCount: 0,
      holdingCount: 2000,
      vestingCount: 0,
      exerciseCount: 0,
      exercisePriceModel: 'UNIT',
      exercisePrice: 2,
      vestingPeriod: 6,
      companyName: '苏州浩行华夏咨询有限公司',
      shareholdingPattern: '2',
      shareholdingPatternName: '股东代持',
      stockPoolId: 8,
      stockPoolName: '期权期权池',
      serialNumber: 'ES-1',
      equityType: '1',
      equityTypeName: '期权',
      status: '0',
      statusDesc: '草稿',
      capitalType: 'CNY',
      capitalTypeName: '人民币',
      grantDate: '2024-03-11',
      vestingStartDate: '2024-03-31',
      vestingScheduleId: 3,
      vestingScheduleName: '非匀速计划',
      vestingTotalPeriod: 9,
      scheduleType: 'UNEVEN',
      scheduleTypeName: '非匀速计划',
      vestingScheduleStartDate: '2024-03-31',
      vestingScheduleEndDate: '2024-12-30',
      equityVestingScheduleDetailList: [
        {
          vestingScheduleDetailId: 37,
          equityGrantId: 4,
          grantCount: 400,
          vestingDate: '2024-03-31',
          vestingCount: 0,
          status: '0',
          statusDesc: null,
          exerciseCount: 0,
          cancelCount: 0,
          exerciseExpirationDate: '2024-09-30',
          performanceCondition: null,
          achievementDeadlineDate: null,
          unvestedCount: 400,
          unexercisedCount: 0
        },
        {
          vestingScheduleDetailId: 38,
          equityGrantId: 4,
          grantCount: 200,
          vestingDate: '2024-05-30',
          vestingCount: 0,
          status: '0',
          statusDesc: null,
          exerciseCount: 0,
          cancelCount: 0,
          exerciseExpirationDate: '2024-11-30',
          performanceCondition: null,
          achievementDeadlineDate: null,
          unvestedCount: 200,
          unexercisedCount: 0
        },
        {
          vestingScheduleDetailId: 39,
          equityGrantId: 4,
          grantCount: 400,
          vestingDate: '2024-08-30',
          vestingCount: 0,
          status: '0',
          statusDesc: null,
          exerciseCount: 0,
          cancelCount: 0,
          exerciseExpirationDate: '2025-02-28',
          performanceCondition: null,
          achievementDeadlineDate: null,
          unvestedCount: 400,
          unexercisedCount: 0
        },
        {
          vestingScheduleDetailId: 40,
          equityGrantId: 4,
          grantCount: 1000,
          vestingDate: '2024-12-30',
          vestingCount: 0,
          status: '0',
          statusDesc: null,
          exerciseCount: 0,
          cancelCount: 0,
          exerciseExpirationDate: '2025-06-30',
          performanceCondition: null,
          achievementDeadlineDate: null,
          unvestedCount: 1000,
          unexercisedCount: 0
        }
      ]
    },
    success: true
  }

  return request({
    url: `/equityGrant/detail/${id}`,
    method: 'get'
  })
}
