import {http} from './index'

export const co = {
  list (offset) {
    const limit = 10
    return http.get(`/api/v1/co/list?offset=${offset}&limit=${limit}`)
  },
  listL (offset) {
    const limit = 500
    return http.get(`/api/v1/co/list?offset=${offset}&limit=${limit}`)
  },
  addCo ({name}) {
    return http.post(`/api/v1/co/add`, {
      data: {
        name: name
      }
    })
  },
  updateCo ({id, name}) {
    return http.put(`/api/v1/co/${id}`, {
      data: {
        name: name
      }
    })
  },
  deleteCo (id) {
    return http.delete(`/api/v1/co/${id}`)
  },

  // 企业方案草稿表
  coPlanList  ({coId}) {
    return http.get(`/api/v1/coplan/list/${coId}`)
  },

  /**
   * 添加一个企业方案未定
   */
  // eslint-disable-next-line
  addCoPlan ({co_id, plan_name, advt_space_id_list}) {
    return http.post(`/api/v1/coplan/add`, {
      data: {
        co_id: co_id,
        plan_name: plan_name,
        advt_space_id_list: advt_space_id_list
      }
    })
  },

  /**
   * 删除一个方案
   * @param {*} planId
   */
  deletePlan (planId) {
    return http.delete(`/api/v1/coplan/${planId}`)
  },

  /**
   * 删除方案中一个广告位
   */
  deletePlanOneSpace (id) {
    return http.delete(`/api/v1/coplan/advtspace/${id}`)
  }
}
