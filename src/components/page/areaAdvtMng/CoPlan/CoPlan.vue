<template>
  <div>
    <strong class="co_name">{{coName}} 方案</strong>
    <hr style="margin:20px 0;" />
    <div class="plan_list">
      <div v-if="coPlanList.length===0">暂无方案</div>
      <div v-for="(item, index) in coPlanList" :key="index">
        <div class="plan_name">
          <span v-if="!item.edit">{{item.plan_name}}</span>
          <v-text-field
            v-else
            v-model="item.plan_name"
            :id="item.plan_id"
            required
            @change="showChange(item)"
          ></v-text-field>
          <span>
            <v-icon small @click="setEdit(item)" id="editBtn" title="修改方案名称">edit</v-icon>
            <v-icon small @click="deleteCoPlan(item)" title="删除此方案">delete</v-icon>
            <!-- 发布方案 -->
            <i @click="toRelease(item)" class="pointer">发布方案</i>

            <v-btn @click="exportPlan(item)">导出</v-btn>
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
              <v-icon small @click="addSpaceDialog=true">add</v-icon>
              <v-icon small @click="deleteItem(item)">delete</v-icon>
            </td>
          </template>
        </v-data-table>
      </div>
    </div>

    <v-dialog v-model="dialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>确认修改方案名称</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancelPlanChange()">取消</v-btn>
          <v-btn color="green darken-1" text @click="subUpdatePlanName()">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addSpaceDialog" max-width="95%">
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>
          <advertise-space :isPage="false" @doAddSpace="addPlan"></advertise-space>
        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancelPlanChange()">取消</v-btn>
          <v-btn color="green darken-1" text @click="subUpdatePlanName()">确认</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as api from '@/api/index'
import AdvertiseSpace from '../Spaces/AdvertiseSpace.vue'

export default {
  name: 'CoPlan',
  components: {
    AdvertiseSpace
  },
  data () {
    return {
      dialog: false,
      addSpaceDialog: false,
      coPlanList: [],
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
      timepicker: false,
      selectPlan: '',
      changedPlan: null
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
    document.addEventListener('click', this.listenClick)
    // this.queryObj.co_id = [this.$route.params.co_id]
    // this.getList()
    this.getCoPlanList()
  },
  methods: {
    listenClick (event) {
      if (
        event.target.id !== this.selectPlan.plan_id &&
        event.target.id !== 'editBtn' &&
        this.dialog === false
      ) {
        this.coPlanList.forEach(e => {
          e.edit = false
        })
      }
    },
    /**
     * 设置编辑
     */
    setEdit (item) {
      this.selectPlan = { ...item }
      item.edit = true
    },
    showChange (changedPlan) {
      console.log(changedPlan)
      this.changedPlan = changedPlan
      this.dialog = true
    },
    /**
     * 公司计划列表
     */
    getCoPlanList () {
      api.co
        .coPlanList({ coId: this.coId, offset: 0, limit: 100 })
        .then(res => {
          this.coName = res.data.coName
          this.coPlanList = res.data.data.map(e => {
            return {
              ...e,
              edit: false
            }
          })
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
        api.co
          .deletePlanOneSpace(item.id)
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
      this.$router.push({ path: `/areaAdvtMng/releasecoplan` })
    },
    exportPlan (item) {
      console.log(item)
      api.file.exportExcel(item.plan_id)
    },

    /**
     * 提交修改方案名称
     */
    subUpdatePlanName () {
      this.dialog = false
      console.log(this.selectPlan)

      api.co
        .updatePlanName({
          plan_id: this.changedPlan.plan_id,
          plan_name: this.changedPlan.plan_name
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      this.changedPlan.edit = false
    },

    /**
     * 取消修改
     */
    cancelPlanChange () {
      this.getCoPlanList()
      this.dialog = false
      this.changedPlan.edit = false
    },

    addPlan (planList) {
      console.log(planList)
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
