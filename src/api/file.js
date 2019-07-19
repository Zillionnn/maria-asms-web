// import {http} from './index'
import conf from '@/conf/index'

export const file = {
  exportExcel (planId) {
    window.open(`${conf.URL}/api/v1/exportXlsx/` + planId)

    // return http.get(`/api/v1/exportXlsx`)
  }
}
