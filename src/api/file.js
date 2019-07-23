// import {http} from './index'
import conf from '@/conf/index'

const url = conf.URL

export const file = {
  exportExcel (planId) {
    window.open(url + `/api/v1/exportXlsx/` + planId)

    // return http.get(`/api/v1/exportXlsx`)
  },

  exportRentedExcel (isrented) {
    window.open(url + `/api/v1/exportIsNoRentedSpaceExcel/${isrented}`)
  }
}
