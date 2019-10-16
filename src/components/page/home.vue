<template>
  <div class="page">
    <div style="width: 100%;height:auto;">
        <v-btn @click="exportAll()">导出所有</v-btn>
        <span class="head_text">未租用的广告位：{{norent}}</span><v-btn @click="exportNoRented()">导出</v-btn>
        <span class="head_text">已租广告位：{{isRentedNum}}</span><v-btn @click="exportIsRented()">导出</v-btn>
        <!-- <div style="width: 100%; height:800px;">
          <baidu-map/>
        </div> -->

    </div>
  </div>
</template>

<script>
import * as api from '@/api/index'
import BaiduMap from '@/components/common/Map/BaiduMap/BaiduMap.vue'

export default {
  name: 'home',
  components: {
    BaiduMap
  },

  data () {
    return {
      norent: 0,
      isRentedNum: 0
    }
  },
  created () {
    this.getNoRent()
    this.getIsRent()
  },
  mounted () {

  },
  methods: {
    getNoRent () {
      api.areaAdvt.countNoRent()
        .then(r => {
          this.norent = r.data.data.count
        })
        .catch(err => {
          console.error(err)
          this.$message({
            type: 'error',
            message: err
          })
        })
    },

    getIsRent () {
      api.areaAdvt.countIsRent()
        .then(r => {
          this.isRentedNum = r.data.data.count
        })
        .catch(err => {
          console.error(err)
          this.$message({
            type: 'error',
            message: err
          })
        })
    },

    exportNoRented () {
      api.file.exportRentedExcel(0)
    },

    exportIsRented () {
      api.file.exportRentedExcel(1)
    },

    exportAll () {
      api.file.exportRentedExcel(2)
    }
    // ////////////////////methods
  }

}
</script>

<style scoped>
.page{
  width: 100%;
  height: 100%;
}
.a_table {
  border: 1px solid;
}
.a_table tr {
  border-bottom: 1px solid;
}

.head_text{
  font-size: 18px;
}
</style>
