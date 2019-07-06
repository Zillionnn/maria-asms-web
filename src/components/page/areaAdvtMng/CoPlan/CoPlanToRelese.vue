<template>
  <div class="page">
    <v-text-field v-model="form.expireDate" label="过期日期" required @click="datepicker=true"></v-text-field>
    <v-text-field v-model="form.expireHour" label="过期时间" required @click="timepicker=true"></v-text-field>
    <div>
      <v-btn color="blue darken-1" flat @click="back">取消</v-btn>
      <v-btn color="blue darken-1" :disabled="!valid" flat @click="releasePlan">提交</v-btn>
    </div>
    <v-dialog v-model="datepicker" max-width="290px">
      <v-date-picker v-model="form.expireDate" @change="datepicker = false" locale="zh"></v-date-picker>
    </v-dialog>
    <v-dialog v-model="timepicker" max-width="290px">
      <v-time-picker v-model="form.expireHour" @change="datepicker = false" format="24hr"></v-time-picker>
    </v-dialog>
  </div>
</template>

<script>
import * as api from '@/api/index'

export default {
  name: 'CoPlanToRelese',
  components: {},
  computed: {
    coplan () {
      return this.$store.getters.coplan
    }
  },
  data () {
    return {
      valid: true,
      form: {},
      datepicker: false,
      timepicker: false
    }
  },
  methods: {
    back () {

    },
    validateBeforeSUB () {

    },
    /**
    * 方案转为正式方案
    */
    releasePlan () {
      this.coplan.expire_time = this.form.expire_time
      api.areaAdvt.releasePlan(this.coplan)
        .then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.$router.go(-1)
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
</style>
