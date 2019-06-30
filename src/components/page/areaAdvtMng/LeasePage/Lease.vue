<template>
  <div class="page">
    <h2>租赁</h2>
    <div style="width: 100%;min-height:800px;margin-top: 23px;">
      <!-- <div class="tool_bar">
        <v-select
          v-model="form.co_id"
          :items="coList"
          item-text="name"
          item-value="id"
          :rules="[requireRules]"
          label="公司"
        ></v-select>
      </div> -->
   <v-data-table :headers="headers" :items="tableData" hide-actions>
        <template slot="headerCell" slot-scope="{ header }">
          <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
        </template>
        <template slot="items" slot-scope="{ item }">
          <!-- <td>{{ item.id }}</td> -->
          <td>{{ item.name }}</td>
          <td v-formatTs="item.update_time">{{item.update_time}}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="toSelectSpace(item)" color="#03a9f4">分配</v-icon>
            <v-icon small class="mr-2" @click="toCoPlan(item)" color="#03a9f4">查看方案</v-icon>
          </td>
        </template>
      </v-data-table>
      <div>
        <v-pagination
          v-model="pagination.page"
          :length="pages"
          @input="doInput"
          style="float:right;"
        ></v-pagination>
      </div>
   </div>
 </div>
</template>

<script>
import { toLocalDate } from '@/utils/tool'
import * as api from '@/api/index'
import { RULES } from '@/conf/rules.js'

export default {
  name: 'Lease',
  computed: {
    pages () {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) {
        return 0
      }

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      )
    }
  },
  data () {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 10,
        totalItems: 0
      },
      tableData: [],
      headers: [
        // { text: 'Id', value: 'id', sortable: false, width: '300px' },
        { text: 'Name', value: 'name', sortable: true },
        { text: 'UPdatetime', value: 'updatetime', sortable: false },
        { text: '', value: 'DO', sortable: false }
      ],
      coList: [],
      requireRules: RULES.requireRule,
      form: {},
      timepicker: false,
      datepicker: false
    }
  },
  components: {},
  created () {
    this.getCoList()
  },
  methods: {
    ftoLocalDate (t) {
      return toLocalDate(t)
    },
    getCoList (val) {
      this.pagination.page = val === undefined ? 1 : val
      let offset =
        val === undefined ? 0 : this.pagination.rowsPerPage * (val - 1)
      api.co.list(offset)
        .then(r => {
          this.tableData = r.data.data
          this.pagination.totalItems = r.data.total
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error('()', err)
        })
    },
    // 翻页
    doInput (a, b, c) {
      // console.log('do input', this.pagination.page)
      this.getCoList(this.pagination.page)
    },
    toSelectSpace (co) {
      console.log('tag', co)
      this.$store.dispatch('passClearSelected')
      this.$store.dispatch('passCO', co)
      this.$router.push({ path: `/areaAdvtMng/spaces` })
    },
    /**
     * 查看公司有分配的广告位
     */
    toCoPlan (co) {
      this.$store.dispatch('passCO', co)
      this.$router.push({ path: `/areaAdvtMng/coplan/${co.id}` })
    }
  }
}
</script>

<style scoped>
.tool_bar {
  width: 600px;
}
.page{
  width:100%;
}
</style>
