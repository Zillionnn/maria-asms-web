<template>
  <div class="page">
    <div style="width: 100%;height:auto;">
        <span class="head_text">未租用的广告位：{{norent}}</span>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/index'
export default {
  name: 'home',
  components: {},

  data () {
    return {
      norent: 0
    }
  },
  created () {
    this.getNoRent()
  },
  mounted () {

  },
  methods: {
    getNoRent () {
      api.areaAdvt.countNoRent()
        .then(r => {
          this.norent = r.data.data[0].count
        })
        .catch(err => {
          console.error(err)
          this.$message({
            type: 'error',
            message: err
          })
        })
    }
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
