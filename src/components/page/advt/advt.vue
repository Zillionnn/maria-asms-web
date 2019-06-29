<template>
  <div class="page">
    <h2>广告</h2>
    <div style="width: 100%;height:900px;margin-top: 23px;">
      <!-- 添加的form -->
      <advt-dialog-form :dialog="dialog" @open="openDialog()" @cancel="cancelDialog()" @submit="addAdvt" @update="updateCo"></advt-dialog-form>
      <v-data-table :headers="headers" :items="tableData" hide-actions>
        <template slot="headerCell" slot-scope="{ header }">
          <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
        </template>
        <template slot="items" slot-scope="{ item }">
          <!-- name, co_id, location, lease_time, lease_time_unit, size -->
          <td>{{ item.name }}</td>
          <td>{{item.co_name}}</td>
          <td>{{item.location}}</td>
          <td>{{item.lease_time}} {{formatUnit(item.lease_time_unit)}}</td>
          <td>{{item.size}}</td>
          <td v-formatTs="item.update_time"></td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
            <v-icon small @click="deleteItem(item)">delete</v-icon>
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
import * as api from '@/api/index'
import AdvtDialogForm from './component/AdvtDialogForm'
export default {
  name: 'advt',
  components: {
    AdvtDialogForm
  },
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
      alert: {
        visible: false,
        type: ''
      },
      dialog: {
        mode: 'add',
        visible: false,
        info: null
      },
      pagination: {
        page: 1,
        rowsPerPage: 10,
        totalItems: 0
      },
      fake: null,
      headers: [
        // { text: 'Id', value: 'id', sortable: false, width: '300px' },
        // name, co_id, location, lease_time, lease_time_unit, size
        { text: '名称', value: 'name', sortable: false },
        { text: '公司', value: 'co_id', sortable: false },
        { text: '地址', value: 'location', sortable: false },
        { text: '有效时间剩余', value: 'lease_time', sortable: false },
        { text: '尺寸', value: 'size', sortable: false },
        { text: '更新时间', value: 'updatetime', sortable: false },
        { text: 'DO', value: 'DO', sortable: false }
      ],
      tableData: [],
      coList: []
    }
  },
  created () {
    this.getCoList()
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList (val) {
      this.pagination.page = val === undefined ? 1 : val
      let offset =
        val === undefined ? 0 : this.pagination.rowsPerPage * (val - 1)
      api.advt.list(offset)
        .then(r => {
          console.log('tag', r.data.data)
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
    doInput (a, b, c) {
      // console.log('do input', this.pagination.page)
      this.getList(this.pagination.page)
    },
    editItem (item) {
      this.dialog = {
        mode: 'edit',
        info: item,
        visible: true
      }
    },
    deleteItem (item) {
      var r = confirm('确认删除？')
      if (r === true) {
        api.advt.deleteArea(item.id).then(r => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getList()
        })
      }
    },
    /**
    添加
     */
    addAdvt (form) {
      api.advt.addAdvt(form)
        .then(r => {
          this.cancelDialog()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getList()
        })
        .catch(err => {
          console.error('add co', err)
          this.$message({
            type: 'error',
            message: err
          })
        })
    },

    /**
     * 更新co
     */
    updateCo (form) {
      console.log(form)
      api.advt.update(form)
        .then(r => {
          this.cancelDialog()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getList()
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error(err)
        })
    },

    openDialog () {
      this.dialog = {
        mode: 'add',
        visible: true
      }
    },
    cancelDialog () {
      this.dialog.visible = false
    },
    formatUnit (p) {
      switch (p) {
        case 0:
          return '小时'
        case 1:
          return '天'
        case 2:
          return '周'
        case 3:
          return '月'
        case 4:
          return '年'
      }
    },
    getCoList (val) {
      let offset = val === undefined ? 0 : val
      api.co.listL(offset)
        .then(r => {
          let list = r.data.data
          let total = r.data.total

          this.coList = [...this.coList, ...list]
          let nextOffset = offset + 500

          if (nextOffset < total) {
            this.getCoList(nextOffset)
          } else {
            this.$store.dispatch('passCoList', this.coList)
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error('()', err)
        })
    }
    // methods
  }
}
</script>

<style scoped>
.page {
  width: 100%;
}
.a_table {
  border: 1px solid;
}
.a_table tr {
  border-bottom: 1px solid;
}
</style>
