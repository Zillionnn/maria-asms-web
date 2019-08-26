import { http } from './index'

export const rdtlarea = {
  list (offset) {
    const limit = 10
    return http.get(`/api/v1/rdtlarea/list?offset=${offset}&limit=${limit}`)
  },
  listL (offset) {
    const limit = 500
    return http.get(`/api/v1/rdtlarea/list?offset=${offset}&limit=${limit}`)
  },
  // eslint-disable-next-line
  addArea({ section, serial, name, position, lng, lat, category, live_size, parking_num, location, avg_daily_traffic, image, is_exclusive }) {
    let lnglat = null
    if (lng && lat) {
      lnglat = `(${lng},${lat})`
    }
    return http.post(`/api/v1/rdtlarea/add`, {
      data: {
        name: name,
        section: section,
        serial: serial,
        position: position,
        lnglat: lnglat,
        category: category,
        live_size: live_size,
        parking_num: parking_num,
        location: location,
        avg_daily_traffic: avg_daily_traffic,
        is_exclusive: is_exclusive
      }
    })
  },
  // eslint-disable-next-line
  updateArea({ id, section, serial, name, position, lng, lat, category, live_size, parking_num, location, avg_daily_traffic, is_exclusive }) {
    let lnglat = null
    if (lng && lat) {
      lnglat = `(${lng},${lat})`
    }

    return http.put(`/api/v1/rdtlarea/${id}`, {
      data: {
        name: name,
        section: section,
        serial: serial,
        position: position,
        lnglat: lnglat,
        category: category,
        live_size: live_size,
        parking_num: parking_num,
        location: location,
        avg_daily_traffic: avg_daily_traffic,
        is_exclusive: is_exclusive
      }
    })
  },
  deleteArea (id) {
    return http.delete(`/api/v1/rdtlarea/${id}`)
  }
}
