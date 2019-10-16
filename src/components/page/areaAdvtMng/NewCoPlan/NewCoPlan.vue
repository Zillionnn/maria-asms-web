<template>
  <div class="page">
    <p class="title">{{selectedCO.name}}</p>

    <v-form ref="form" v-model="valid" lazy-validation style="width:300px;">
      <v-text-field v-model="form.plan_name" :counter="50" :rules="nameRules" label="方案名称" required></v-text-field>
      <!-- <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field> -->
    </v-form>
    <div>
      <p v-for="(item, index) in selectAdvtSpaces" :key="index">
          {{item.area_name}} {{item.area_location}} {{item.advt_space_position}} {{item.advt_space_position_des}}
          </p>
    </div>
    <div>
      <v-btn color="blue darken-1" flat @click="backToSpaceList()">返回</v-btn>
      <v-btn color="blue darken-1" :disabled="!valid" flat @click="validateBeforeSUB">提交</v-btn>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
export default {
  name: 'NewCoPlan',
  components: {},
  computed: {
    selectAdvtSpaces () {
      return this.$store.getters.selectedSpace
    },
    selectedCO () {
      return this.$store.getters.selectCO
    }
  },
  data () {
    return {
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      form: {}
    }
  },
  methods: {
    backToSpaceList () {
      this.$router.go(-1)
    },
    validateBeforeSUB () {
      if (this.$refs.form.validate()) {
        // this.snackbar = true
        let obj = {
          co_id: this.selectedCO.id,
          plan_name: this.form.plan_name,
          advt_space_id_list: this.selectAdvtSpaces
        }
        this.subPlan(obj)
      }
    },
    // 提交
    subPlan (data) {
      this.valid = false
      api.co.addCoPlan(data)
        .then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.$router.push({ path: `/areaAdvtMng/coplan/${this.selectedCO.id}` })
        })
        .catch(err => {
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
.page {
  min-height: 900px;
}
.title{
    font-size: 15px;
}
</style>
