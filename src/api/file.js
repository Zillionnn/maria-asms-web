// import {http} from './ind/ex'
import conf from '@/conf/index'

const url = conf.URL

export const file = {
  exportExcel (planId) {
    window.open(`http://${url}/api/v1/exportXlsx/` + planId)

    // return http.get(`/api/v1/exportXlsx`)
  }
}
