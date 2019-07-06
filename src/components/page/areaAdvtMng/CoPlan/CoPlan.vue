<template>
  <div>
    <strong class="co_name">{{coName}} 方案</strong>
    <hr style="margin:20px 0;" />
    <div class="plan_list">
      <div v-if="coAdvtList.length===0">暂无方案</div>
      <div v-for="(item, index) in coAdvtList" :key="index">
        <div class="plan_name">
          <span>{{item.plan_name}}</span>
          <span>
            <v-icon small @click="deleteCoPlan(item)" title="删除此方案">delete</v-icon>
            <!-- 发布方案 -->
            <i @click="toRelease(item)">发布方案</i>

          </span>
        </div>
        <v-data-table :headers="headers" :items="item.data" hide-actions>
          <template slot="headerCell" slot-scope="{ header }">
            <span class="subheading font-weight-light text--darken-3" v-text="header.text" />
          </template>
          <template slot="items" slot-scope="{ item }">
            <td>{{ item.section }}</td>
            <td>{{ item.area_name }}</td>
            <td>{{ item.area_location }}</td>
            <td>{{ item.advt_space_position }}</td>
            <td>{{ item.advt_space_position_des }}</td>
            <td>
              <span v-if="item.isrented===0">否</span>
              <span v-if="item.isrented===1">是</span>
            </td>
            <td class="justify-center layout px-0">
              <v-icon small @click="deleteItem(item)">delete</v-icon>
            </td>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/index'

export default {
  name: 'CoPlan',
  components: {
  },
  data () {
    return {
      coAdvtList: [],
      queryObj: {},
      pagination: {
        page: 1,
        rowsPerPage: 10,
        totalItems: 0
      },
      coName: '',
      headers: [
        { text: '区域', value: 'id', sortable: false },
        { text: '小区名称', value: 'name', sortable: false },
        { text: '小区地址', value: 'updatetime', sortable: false },
        { text: '灯箱位置', value: 'updatetime', sortable: false },
        { text: '位置描述', value: 'updatetime', sortable: false },
        { text: '是否出租', value: 'updatetime', sortable: false },
        { text: 'DO', value: 'DO', sortable: false }
      ],
      form: {},
      datepicker: false,
      timepicker: false
    }
  },

  computed: {
    selectedSpace () {
      return this.$store.getters.selectedSpace
    },
    coId () {
      return this.$route.params.co_id
    }
  },
  created () {
    // this.queryObj.co_id = [this.$route.params.co_id]
    // this.getList()
    this.getCoPlanList()
  },
  methods: {
    getCoPlanList () {
      api.co
        .coPlanList({ coId: this.coId, offset: 0, limit: 100 })
        .then(res => {
          this.coName = res.data.coName
          this.coAdvtList = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    deleteCoPlan (plan) {
      var r = confirm('确认删除？')
      if (r) {
        api.co
          .deletePlan(plan.plan_id)
          .then(res => {
            this.$message({
              type: 'success',
              message: '已删除此方案'
            })
            this.getCoPlanList()
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: err
            })
            console.error(err)
          })
      }
    },

    /**
     * 删除一项
     */
    deleteItem (item) {
      console.log(item)
      var r = confirm('确认删除？')
      if (r) {
        api.co.deletePlanOneSpace(item.id)
          .then(res => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getCoPlanList()
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: err
            })
          })
      }
    },

    toRelease (item) {
      this.$store.dispatch('passCoplan', item)
      this.$router.push({path: `/areaAdvtMng/releasecoplan`})
    }
    // //////////methods/////////
  }
}
</script>

<style scoped>
.co_name {
  font-size: 18px;
}
.plan_list {
  min-height: 70vh;
}
.plan_name {
  font-size: 16px;
  margin: 20px;
}
</style>
