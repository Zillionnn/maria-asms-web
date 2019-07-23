import {http} from './index'

export const areaAdvt = {
  list (form) {
    const limit = 10
    return http.post(`/api/v1/areaAdvt/list?offset=${form.offset}&limit=${limit}`, {
      data: form
    })
  },
  // listByAreaId (areaId, offset) {
  //   const limit = 10
  //   return http.get(`/api/v1/areaAdvt/space/list?area_id=${areaId}&offset=${offset}&limit=${limit}`)
  // },

  // eslint-disable-next-line
  addAdvt (form) { 
    return http.post(`/api/v1/areaAdvt/add`, {
      data: form
    })
  },
  addAdvtSpace (form) {
    return http.post(`/api/v1/areaAdvt/advtSpace/add`, {
      data: form
    })
  },
  // 更新广告位
  // eslint-disable-next-line
  updateArea (form) {
    return http.put(`/api/v1/areaAdvt/${form.id}`, {
      data: form
    })
  },

  deleteArea (id) {
    return http.delete(`/api/v1/areaAdvt/${id}`)
  },

  findAreaById (id) {
    return http.get(`/api/v1/areaAdvt/${id}`)
  },
  stopRent (id) {
    return http.put(`/api/v1/areaAdvt/stop-rent/${id}`)
  },
  countNoRent () {
    return http.get(`/api/v1/areaAdvt/norent/count`)
  },
  countIsRent () {
    return http.get(`/api/v1/areaAdvt/isrented/count`)
  },

  releasePlan (list) {
    return http.put(`/api/v1/coplan/areaAdvt/release-space`, {
      data: list
    })
  }
}
