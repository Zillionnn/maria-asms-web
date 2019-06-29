<template>
 <div class="page">
     <h2>设置</h2>
    <div style="width: 100%;height:900px;margin-top: 23px;">
      <v-form ref="form" v-model="valid" lazy-validation style="width:50%;">
        <v-text-field v-model="form.email" :rules="[requireRules, emailRules]" label="接受通知邮箱" required></v-text-field>

        <v-btn color="primary" @click="validateBeforeSUB">确定</v-btn>
      </v-form>

    </div>
 </div>
</template>

<script>
import * as api from '@/api/index'
import { RULES } from '@/conf/rules.js'

export default {
  name: 'setting',
  data () {
    return {
      form: {},
      requireRules: RULES.requireRule,
      emailRules: RULES.EMAIL_RULE
    }
  },
  components: {},
  created () {
    this.list()
  },
  methods: {
    list () {
      api.setting
        .list()
        .then(r => {
          this.form = r.data.data[0]
        })
        .catch(err => {
          console.error('setting list', err)
        })
    },
    validateBeforeSUB () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        api.setting.update(this.form)
          .then(r => {
            this.$message({
              type: 'success',
              message: '更新成功'
            })
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }
}
</script>

<style scoped>
.page {
  width: 100%;
}
</style>
