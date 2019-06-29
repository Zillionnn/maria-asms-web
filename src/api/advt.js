import {http} from './index'

export const advt = {
  list (offset) {
    const limit = 10
    return http.get(`/api/v1/advt/list?offset=${offset}&limit=${limit}`)
  },
  listL (offset) {
    const limit = 500
    return http.get(`/api/v1/advt/list?offset=${offset}&limit=${limit}`)
  },
  // eslint-disable-next-line
  addAdvt ({name, co_id,co_name, location, lease_time, lease_time_unit, width,height }) { 

    return http.post(`/api/v1/advt/add`, {
      data: {
        name: name,
        co_id: co_id,
        co_name: co_name,
        location: location,
        lease_time: lease_time,
        lease_time_unit: lease_time_unit,
        size: [width, height]
      }
    })
  },
  // eslint-disable-next-line
  update ({id, name, co_id,co_name, location, lease_time, lease_time_unit, width,height}) {
    return http.put(`/api/v1/advt/${id}`, {
      data: {
        name: name,
        co_id: co_id,
        co_name: co_name,
        location: location,
        lease_time: lease_time,
        lease_time_unit: lease_time_unit,
        size: [width, height]
      }
    })
  },
  deleteArea (id) {
    return http.delete(`/api/v1/advt/${id}`)
  }
}
