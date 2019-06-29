<template>
  <div class="page">
    <h2>广告位</h2>
    <div style="width: 100%;height:900px;margin-top: 23px;">
      <!-- 添加的form -->
      <dialog-form
        :dialog="dialog"
        @open="openDialog()"
        @cancel="cancelDialog()"
        @submit="addSpace"
        @update="update"
      ></dialog-form>
      <v-data-table :headers="headers" :items="tableData" hide-actions>
        <template slot="headerCell" slot-scope="{ header }">
          <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
        </template>
        <template v-slot:items="props">
          <td style="width:6.7%;">{{(pagination.page-1)*10+props.index+1}}</td>
          <td>{{props.item.area_name}}</td>
          <td>{{props.item.advt_space_position}}</td>
          <td>{{props.item.advt_space_position_des}}</td>
          <td v-formatTs="props.item.update_time"></td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small class="mr-2" @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
      <div>
        <!-- <span>总数: {{pagination.totalItems}}</span> -->
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
  name: 'advtSpace',
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
        { text: '序号', value: 'id', sortable: false, width: '300px' },
        { text: '名称', value: 'name', sortable: false },
        { text: '编号', value: 'section', sortable: false },
        { text: '位置描述', value: 'position', sortable: false },
        { text: '更新时间', value: 'updatetime', sortable: false },
        { text: 'DO', value: 'DO', sortable: false }
      ],
      tableData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList (val) {
      let areaId = this.$route.params.id

      this.pagination.page = val === undefined ? 1 : val
      let offset =
        val === undefined ? 0 : this.pagination.rowsPerPage * (val - 1)
      api.areaAdvt
        .list({ area_id: [areaId], offset })
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
        api.areaAdvt.deleteArea(item.id).then(r => {
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
    addSpace (form) {
      api.areaAdvt
        .addAdvtSpace(form)
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
    update (form) {
      console.log(form)
      api.areaAdvt
        .updateArea(form)
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
    // 查看广告位
    toAdvtSpace (id) {
      this.$router.push({ path: `/resdentialArea/${id}` })
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
