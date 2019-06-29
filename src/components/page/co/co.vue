<template>
  <div class="page">
    <h2>企业</h2>
    <div style="width: 100%;height:900px;margin-top: 23px;">
      <!-- 添加的form -->
      <dialog-form :dialog="dialog" @open="openDialog()" @cancel="cancelDialog()" @submit="addCo" @update="updateCo"></dialog-form>
      <v-data-table :headers="headers" :items="tableData" hide-actions>
        <template slot="headerCell" slot-scope="{ header }">
          <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
        </template>
        <template slot="items" slot-scope="{ item }">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td v-formatTs="item.update_time">{{item.update_time}}</td>
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
import DialogForm from './component/DialogForm'
export default {
  name: 'co',
  components: {
    DialogForm

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
        { text: 'Id', value: 'id', sortable: false, width: '300px' },
        { text: 'Name', value: 'name', sortable: false },
        { text: 'UPdatetime', value: 'updatetime', sortable: false },
        { text: 'DO', value: 'DO', sortable: false }
      ],
      tableData: []
    }
  },
  mounted () {
    this.getCoList()
  },
  methods: {
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
    doInput (a, b, c) {
      // console.log('do input', this.pagination.page)
      this.getCoList(this.pagination.page)
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
        api.co.deleteCo(item.id).then(r => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getCoList()
        })
      }
    },
    /**
    添加
     */
    addCo (form) {
      api.co.addCo(form)
        .then(r => {
          this.cancelDialog()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getCoList()
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
      api.co.updateCo(form)
        .then(r => {
          this.cancelDialog()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getCoList()
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
    }
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
