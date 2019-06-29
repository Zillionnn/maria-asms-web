<template>
  <div>
    <strong class="co_name">{{coName}}</strong>
    <hr style="margin:20px 0;" />
    <div class="plan_list">
      <div v-for="(item, index) in coAdvtList" :key="index">
        <div class="plan_name">{{item.plan_name}}</div>
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
        { text: 'DO', value: 'DO', sortable: false }
      ]
    }
  },
  components: {},
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
    }
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
