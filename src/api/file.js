// import {http} from './index'
import conf from '@/conf/index'
import { http } from '.'

const url = conf.URL

export const file = {
  exportExcel (planId) {
    window.open(url + `/api/v1/exportXlsx/` + planId)

    // return http.get(`/api/v1/exportXlsx`)
  },

  exportRentedExcel (isrented) {
    http.post(url + `/api/v1/exportIsNoRentedSpaceExcel/${isrented}`, null, {responseType: 'blob'})
      .then((res) => {
        if (!res) {
          return
        }
        console.log(res)
        var a = document.createElement('a')

        let url = window.URL.createObjectURL(new Blob([res.data], {type: 'application/octet-stream'}))
        a.href = url
        let head = res.headers['content-disposition']
        let headIdx = head.indexOf('=')
        let fileName = head.substr(headIdx + 1, head.length)
        // console.log(fileName)
        a.download = decodeURI(fileName)
        // console.log(decodeURI(fileName))
        a.click()
        window.URL.revokeObjectURL(url)
      })
    // window.open(url + `/api/v1/exportIsNoRentedSpaceExcel/${isrented}`)
  }
}
