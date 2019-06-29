import {http} from './index'

export const setting = {
  list () {
    return http.get(`/api/v1/setting`)
  },

  update (form) {
    return http.put(`/api/v1/setting/${form.id}`, {
      data: form
    })
  }

}
